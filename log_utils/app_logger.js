const bunyan = require('bunyan');
const config = require('config');

/**
 * Loging debug or info logs based on the env, difeerentiate different log levels
 */
const {loglevel } = config;
const log = bunyan.createLogger({
  name,
  level: (loglevel || 'info')
});



module.exports = {
  log
}


