'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-mvvm.production.js');
} else {
  module.exports = require('./dist/react-mvvm.development.js');
}
