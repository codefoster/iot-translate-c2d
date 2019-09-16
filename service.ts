import iothub from 'azure-iothub';
import common from 'azure-iot-common';
const config = require('./config.json');

const client = iothub.Client.fromConnectionString(`HostName=${config.hubName}.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=${config.servicePolicyKey}`);
const RATE = 50;

client.open(err => {
    // send C2D messages
    setInterval(() => {
        let device = `device${Math.floor(Math.random() * config.devices.length) + 1}`;
        let message = new common.Message(JSON.stringify({ createTimestamp: Date.now() }));
        console.log(`sending message to ${device} -->`);
        client.send(device, message);
    }, RATE);
});