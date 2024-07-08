const express = require('express');
const router = express.Router();
const axios = require('axios');
// const Recommendation = require('../models/Recommendation'); // Import the Recommendation model
const Recommendation = require('../../models/recommendation');
const authenticateToken = require('../../middleware/auth'); // Assuming you have this middleware
const fecthData = require('../../models/fecthData')
const mongoose = require('mongoose');
// Import the utility functions from utils.js

function computeDeltaY(temperature) {
    const deltaYTable = [
      { temp: 0, deltaY: 1.456 },
      { temp: 5, deltaY: 1.067 },
      { temp: 10, deltaY: 0.7934 },
      { temp: 15, deltaY: 0.5967 },
      { temp: 20, deltaY: 0.4549 },
      { temp: 25, deltaY: 0.3505 },
      { temp: 30, deltaY: 0.2731 },
      { temp: 35, deltaY: 0.2149 },
      { temp: 40, deltaY: 0.1707 }
    ];
  
    const closest = deltaYTable.reduce((prev, curr) => {
      return Math.abs(curr.temp - temperature) < Math.abs(prev.temp - temperature) ? curr : prev;
    });
  
    return closest.deltaY;
  }
  
  function getKc() {
    const kcTable = {
      January: 0.62,
      February: 0.61,
      March: 0.63,
      April: 1.2,
      May: 1.25,
      June: 1.3,
      July: 1.3,
      August: 0.35,
      September: 0.35,
      October: 0.67,
      November: 0.65,
      December: 0.65
    };
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return kcTable[currentMonth];
  }
  function computeE0(temperature) {
    const T = temperature;
    const e0 = 6.2 * Math.exp((17.26 * T) / (T - 35.8 + 273.16));
    return e0;
  }
  
  function computesmallea(relativeHumidity, e0) {
    const ea = (relativeHumidity / 100) * e0;
    return ea;
  }
  
  function computeBigEa(e0, ea, WS) {
    const C = 1 / (3);
    const Ea = 0.35 * (e0 - ea) * (0.5 + 0.54 * WS) * C;
    return Ea;
  }
  
  function computeE(deltaY, Grad, WSmax, Ea) {
    const L = 2.45 * Math.pow(10, 9);
    const E = ((deltaY * (Grad - WSmax) + Ea * L) / (deltaY + 1)) / L;
    return E;
  }
  
  function computeI(E, Kc, totalArea) {
    // const I = E * Kc * totalArea;
    const I = E * Kc * totalArea /1000;//from liters to cups
    return I;
  }
  



module.exports = {
    computeDeltaY,
    getKc,
    computeE0,
    computesmallea,
    computeBigEa,
    computeE,
    computeI
  };