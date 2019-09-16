import deviceAmqp from 'azure-iot-device-amqp';
import device from 'azure-iot-device';
import commandLineArgs from 'command-line-args';
const config = require('./config.json');
import { generateSasToken } from './utility';

require('dotenv').config();

const args = commandLineArgs([
    { name: 'device-name', alias: 'd' }
]);

const selectedDevice = config.devices.filter(d => d.name == args['device-name'])[0];

main();

async function main() {

    let client = device.Client.fromSharedAccessSignature(generateSasToken(`${config.hubName}.azure-devices.net/devices/${selectedDevice.name}`, selectedDevice.key, null, 60), deviceAmqp.Amqp);

    client.open(err => {
        console.log(`acting as ${selectedDevice.name}`);

        //handle C2D messages
        client.on('message', msg => {
            client.complete(msg, () => console.log('<-- cloud message received'));
        });

        // send a D2C message repeatedly
        setInterval(function () {
            let message = new device.Message(JSON.stringify({
                deviceId: selectedDevice.name,
                value: Math.random()
            }));
            console.log('sending message to cloud -->');
            client.sendEvent(message, (err, res) => {
                if (err) console.log(err);
            });
        }, 5000);
    });
}