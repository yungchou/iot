//---------------
// CUSTOMIZATION
//---------------
const iotHubConnectionString = 'HostName=thisiothub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=9kU8Fnxup/XZUtWOg4C8l2rfgvrHPxq+B0S0EZ8ZHbw=';
const deviceArr = ['das1','das2','das3'];

//----------------------------------------------------------------------
// STANDARDIZED ROUTINE TO CREATE/REGISTER A DEVICE TO AN AZURE IOT HUB
//----------------------------------------------------------------------
// [Pre-requisites]
// npm init
// npm install azure-iothub --save

// Standarized routine to create device identities at IoT Hub
'use strict';
var registry = require('azure-iothub').Registry.fromConnectionString(iotHubConnectionString);

for (var i=0; i<deviceArr.length; i++) {
  var device = { deviceId: deviceArr[i] }
  registry.create(device, function(err, deviceInfo, res) {
    if (err) { registry.get(device.deviceId, printDeviceInfo); }
    if (deviceInfo) { printDeviceInfo(err, deviceInfo, res) }
  });
}

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device ID:  ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
  }
}

