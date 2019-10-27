// This Azure Function is triggered each time a message is revieved in the IoTHub.
// The message payload is persisted in an Azure Storage Table

'use strict';

module.exports = function (context, iotHubMessage) {
  context.log('Message received: ' + JSON.stringify(iotHubMessage));
  var date = Date.now();
  var partitionKey = Math.floor(date / (24 * 60 * 60 * 1000)) + '';
  var rowKey = date + '';
  context.bindings.outputTable = {
    "partitionKey": partitionKey,
    "rowKey": rowKey,
    "message": JSON.stringify(iotHubMessage)
  };
  context.done();
};
