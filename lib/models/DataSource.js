'use strict';

const mongoose = require('mongoose');

var dataSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index:true,
    unique: true,
    trim: true
  },
  adapter: {
    type: String,
    required: true,
    trim: true
  },
  adapterProperties:{
    type: Object
  }
}, {timestamps: {}});

var DataSource = mongoose.model('DataSource',dataSourceSchema);

module.exports = DataSource;