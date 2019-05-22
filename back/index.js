const express = require('express');
const logger = require('@tekken-tournament/logger');
require('./db')

const PORT = process.env.PORT || 3020;
const app = express();

const modules = [
  './middleware',
  './routes',
  './error-handler',
  './server'
]

modules.forEach((mod) => {
  require(mod)(app);
});