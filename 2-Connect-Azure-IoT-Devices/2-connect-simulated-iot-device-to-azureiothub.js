//---------------
// CUSTOMIZATION
//---------------
///*
const deviceConnectionString = 'HostName=thisiothub.azure-devices.net;DeviceId=thisiotdevice;SharedAccessKey=5/mPo+iHAbZc2gy0L9mMoaPnEZ7Py8I8sflTC/di3xY=';
const thisDeviceID = 'thisiotdevice';
//*/
/* Or
const deviceConnectionString = 'HostName=thisiothub.azure-devices.net;DeviceId=thissensedevice;SharedAccessKey=4vUGeSfcZqqlR65ww9/2emcEK9NGNr+8ZKUm/7+Jhkg=';
const thisDeviceID = 'thissensedevice';
*/
const msgFrequence = 2000; // milisecond

const baseTemperature  = 20;
const alertTemperature = 26;
const baseHumidity     = 60;
const factor = 10;

//----------------------------------------------------------
// STANDARIZED ROUTINE FOR SENDING DEVICE_TO_CLOUD MESSAGES
//----------------------------------------------------------
// [Pre-requisites for creating the json package]
// npm init
// npm install azure-iot-device azure-iot-device-mqtt --save

'use strict';
// here use mqtt and set to difference protocol as preferred
//var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
//var client = clientFromConnectionString(deviceConnectionString);
var client = require('azure-iot-device-mqtt').clientFromConnectionString(deviceConnectionString);
var Message = require('azure-iot-device').Message;

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
  if (err) {
    console.log('Device (' + thisDeviceID + ') not connected: ' + err);
  } else {
    console.log('Device (' + thisDeviceID + ') connected');

    // Create a message and send it to the IoT Hub based on set frequency
    setInterval( function(){
      var temperature = baseTemperature  + (Math.random() * factor); // Simulated temperature reading
      var humidity    = baseHumidity     + (Math.random() * factor); // Simulated humidity reading   
      var data = JSON.stringify({ deviceId: thisDeviceID, temperature: temperature, humidity: humidity });
      var message = new Message(data);
      message.properties.add('temperatureAlert', (temperature > alertTemperature) ? 'true' : 'false');
      console.log("Sending message: " + message.getData());
      client.sendEvent(message, printResultFor('send'));
    }, msgFrequence );
  }
};

client.open(connectCallback);
