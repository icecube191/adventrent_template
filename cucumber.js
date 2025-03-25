module.exports = {
  default: {
    paths: ['tests/e2e/features/**/*.feature'],
    require: ['tests/e2e/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
  }
};