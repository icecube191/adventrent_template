/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./handler.mjs":
/*!*********************!*\
  !*** ./handler.mjs ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serverless-http */ \"serverless-http\");\n/* harmony import */ var _server_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server/index.mjs */ \"./server/index.mjs\");\n\n\nconst handler = serverless_http__WEBPACK_IMPORTED_MODULE_0__(_server_index_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack://advenrent/./handler.mjs?");

/***/ }),

/***/ "./server/config/index.mjs":
/*!*********************************!*\
  !*** ./server/config/index.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ \"url\");\n\n\n\nconst __filename = (0,url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(\"file:///D:/T/adventrent_template_bolt/server/config/index.mjs\");\nconst __dirname = path__WEBPACK_IMPORTED_MODULE_1__.dirname(__filename);\n\n// Load environment variables based on NODE_ENV\nconst envFile =  false ? 0 :  false ? 0 :  false ? 0 : '.env.dev';\n\n// Load environment variables\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config({\n  path: envFile\n});\n\n// API Configuration\nconst apiConfig = {\n  cors: {\n    origin: process.env.CORS_ORIGIN || 'http://localhost:8081'\n  }\n};\n\n// Database Configuration\nconst dbConfig = {\n  host: process.env.DB_HOST,\n  port: process.env.DB_PORT,\n  name: process.env.DB_NAME,\n  user: process.env.DB_USER,\n  password: process.env.DB_PASSWORD\n};\n\n// JWT Configuration\nconst jwtConfig = {\n  secret: process.env.JWT_SECRET\n};\n\n// Stripe Configuration\nconst stripeConfig = {\n  secretKey: process.env.STRIPE_SECRET_KEY,\n  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  api: apiConfig,\n  db: dbConfig,\n  jwt: jwtConfig,\n  stripe: stripeConfig\n});\n\n//# sourceURL=webpack://advenrent/./server/config/index.mjs?");

/***/ }),

/***/ "./server/index.mjs":
/*!**************************!*\
  !*** ./server/index.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var _config_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/index.mjs */ \"./server/config/index.mjs\");\n/* harmony import */ var _routes_auth_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/auth.mjs */ \"./server/routes/auth.mjs\");\n/* harmony import */ var _routes_users_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/users.mjs */ \"./server/routes/users.mjs\");\n/* harmony import */ var _routes_payments_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/payments.mjs */ \"./server/routes/payments.mjs\");\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\n\n// CORS middleware\napp.use(cors__WEBPACK_IMPORTED_MODULE_1__({\n  origin: _config_index_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].api.cors.origin,\n  credentials: true\n}));\n\n// Logging middleware\napp.use(morgan__WEBPACK_IMPORTED_MODULE_2__('dev'));\n\n// Body parser middleware\napp.use(express__WEBPACK_IMPORTED_MODULE_0__.json());\napp.use(express__WEBPACK_IMPORTED_MODULE_0__.urlencoded({\n  extended: true\n}));\n\n// Routes\napp.use('/api/auth', _routes_auth_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\napp.use('/api/users', _routes_users_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\napp.use('/api/payments', _routes_payments_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n// Health check endpoint\napp.get('/health', (req, res) => {\n  console.log('Health check endpoint hit');\n  res.status(200).json({\n    status: 'ok',\n    timestamp: new Date().toISOString(),\n    environment: \"development\" || 0\n  });\n});\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({\n    error: 'Something went wrong!'\n  });\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://advenrent/./server/index.mjs?");

/***/ }),

/***/ "./server/routes/auth.mjs":
/*!********************************!*\
  !*** ./server/routes/auth.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var _config_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/index.mjs */ \"./server/config/index.mjs\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\n\n// Login route\nrouter.post('/login', async (req, res) => {\n  try {\n    const {\n      email,\n      password\n    } = req.body;\n    // TODO: Implement user authentication\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__.sign({\n      userId: 'user_id'\n    }, _config_index_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwt.secret);\n    res.json({\n      token\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: 'Login failed'\n    });\n  }\n});\n\n// Register route\nrouter.post('/register', async (req, res) => {\n  try {\n    const {\n      email,\n      password\n    } = req.body;\n    // TODO: Implement user registration\n    res.status(201).json({\n      message: 'User registered successfully'\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: 'Registration failed'\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://advenrent/./server/routes/auth.mjs?");

/***/ }),

/***/ "./server/routes/payments.mjs":
/*!************************************!*\
  !*** ./server/routes/payments.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"stripe\");\n/* harmony import */ var _config_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/index.mjs */ \"./server/config/index.mjs\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__(_config_index_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].stripe.secretKey);\n\n// Create payment intent\nrouter.post('/create-payment-intent', async (req, res) => {\n  try {\n    const {\n      amount,\n      currency = 'usd'\n    } = req.body;\n    const paymentIntent = await stripe.paymentIntents.create({\n      amount,\n      currency\n    });\n    res.json({\n      clientSecret: paymentIntent.client_secret\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: 'Failed to create payment intent'\n    });\n  }\n});\n\n// Webhook handler\nrouter.post('/webhook', express__WEBPACK_IMPORTED_MODULE_0__.raw({\n  type: 'application/json'\n}), async (req, res) => {\n  const sig = req.headers['stripe-signature'];\n  try {\n    const event = stripe.webhooks.constructEvent(req.body, sig, _config_index_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].stripe.webhookSecret);\n    // Handle the event\n    switch (event.type) {\n      case 'payment_intent.succeeded':\n        // TODO: Handle successful payment\n        break;\n      default:\n        console.log(`Unhandled event type ${event.type}`);\n    }\n    res.json({\n      received: true\n    });\n  } catch (error) {\n    res.status(400).json({\n      error: 'Webhook error'\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://advenrent/./server/routes/payments.mjs?");

/***/ }),

/***/ "./server/routes/users.mjs":
/*!*********************************!*\
  !*** ./server/routes/users.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var _config_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/index.mjs */ \"./server/config/index.mjs\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\n\n// Middleware to verify JWT token\nconst verifyToken = (req, res, next) => {\n  var _req$headers$authoriz;\n  const token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];\n  if (!token) {\n    return res.status(401).json({\n      error: 'No token provided'\n    });\n  }\n  try {\n    const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__.verify(token, _config_index_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].jwt.secret);\n    req.user = decoded;\n    next();\n  } catch (error) {\n    res.status(401).json({\n      error: 'Invalid token'\n    });\n  }\n};\n\n// Get all users (admin only)\nrouter.get('/', verifyToken, async (req, res) => {\n  try {\n    // TODO: Implement user listing\n    res.json({\n      users: []\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: 'Failed to fetch users'\n    });\n  }\n});\n\n// Get user profile\nrouter.get('/profile', verifyToken, async (req, res) => {\n  try {\n    // TODO: Implement profile fetching\n    res.json({\n      user: {\n        id: req.user.userId\n      }\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: 'Failed to fetch profile'\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://advenrent/./server/routes/users.mjs?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("serverless-http");

/***/ }),

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./handler.mjs");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;