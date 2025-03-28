const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../config/db');
const auth = require('../middleware/auth');

// Image validation middleware
const validateImages = (req, res, next) => {
  const images = req.body.images || [];
  const MAX_IMAGES = 5;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  if (images.length > MAX_IMAGES) {
    return res.status(400).json({ error: `Maximum ${MAX_IMAGES} images allowed` });
  }

  for (const image of images) {
    // Check if it's a valid base64 string
    if (!/^data:image\/(jpeg|png|jpg);base64,/.test(image)) {
      return res.status(400).json({ error: 'Invalid image format. Only JPEG, PNG allowed' });
    }

    // Check file size
    const sizeInBytes = Buffer.from(image.split(',')[1], 'base64').length;
    if (sizeInBytes > MAX_SIZE) {
      return res.status(400).json({ error: 'Image size must be less than 5MB' });
    }
  }

  next();
};

// @route   POST api/vehicles
// @desc    Create a new vehicle listing
router.post('/', [
  auth,
  check('title', 'Title is required').notEmpty(),
  check('type', 'Type is required').notEmpty(),
  check('price', 'Price must be a positive number').isFloat({ min: 0 }),
  validateImages,
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, type, price, description, features, images } = req.body;

  try {
    await db.query('BEGIN');

    // Create vehicle
    const vehicleResult = await db.query(
      'INSERT INTO vehicles (owner_id, title, type, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [req.user.id, title, type, price, description]
    );

    const vehicleId = vehicleResult.rows[0].id;

    // Add features
    if (features && features.length > 0) {
      const featuresValues = features.map(feature => 
        `(${vehicleId}, '${feature}')`
      ).join(',');
      
      await db.query(
        `INSERT INTO vehicle_features (vehicle_id, feature) VALUES ${featuresValues}`
      );
    }

    // Add images
    if (images && images.length > 0) {
      const imageValues = images.map((image, index) => 
        `(${vehicleId}, $${index + 1}, ${index === 0})`
      ).join(',');
      
      await db.query(
        `INSERT INTO vehicle_images (vehicle_id, image_data, is_primary) VALUES ${imageValues}`,
        images
      );
    }

    await db.query('COMMIT');

    // Fetch complete vehicle data
    const vehicle = await db.query(
      `SELECT 
        v.*,
        array_agg(DISTINCT vf.feature) as features,
        array_agg(DISTINCT vi.image_data) as images,
        (SELECT image_data FROM vehicle_images WHERE vehicle_id = v.id AND is_primary = true LIMIT 1) as primary_image
      FROM vehicles v
      LEFT JOIN vehicle_features vf ON v.id = vf.vehicle_id
      LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id
      WHERE v.id = $1
      GROUP BY v.id`,
      [vehicleId]
    );

    res.json(vehicle.rows[0]);
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT api/vehicles/:id/images
// @desc    Update vehicle images
router.put('/:id/images', [auth, validateImages], async (req, res) => {
  const { id } = req.params;
  const { images, primaryIndex = 0 } = req.body;

  try {
    // Verify ownership
    const vehicle = await db.query(
      'SELECT owner_id FROM vehicles WHERE id = $1',
      [id]
    );

    if (vehicle.rows.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (vehicle.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await db.query('BEGIN');

    // Delete existing images
    await db.query('DELETE FROM vehicle_images WHERE vehicle_id = $1', [id]);

    // Add new images
    if (images && images.length > 0) {
      const imageValues = images.map((image, index) => 
        `(${id}, $${index + 1}, ${index === primaryIndex})`
      ).join(',');
      
      await db.query(
        `INSERT INTO vehicle_images (vehicle_id, image_data, is_primary) VALUES ${imageValues}`,
        images
      );
    }

    await db.query('COMMIT');

    res.json({ message: 'Images updated successfully' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;