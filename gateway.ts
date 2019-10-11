import device from 'azure-iot-device';
import deviceAmqp from 'azure-iot-device-amqp';
import { generateSasToken } from './utility';

const config = require('./config.json');
console.log(`Listening on behalf of ${config.devices.length} devices...`);

config.devices
    .forEach(d => {
        //create a new client instance for each device
        let client = device.Client.fromSharedAccessSignature(generateSasToken(`sunrise-hub.azure-devices.net/devices/${d.name}`, d.key, null, 60), deviceAmqp.Amqp);
        client.open(err => {
            if (err) console.log(err)
            else {
                client.on('message', msg => {
                    client.complete(msg, () => console.log(`latency ${Date.now() - JSON.parse(Buffer.from(msg.data).toString()).createTimestamp}`))
                    client.complete(msg, () => console.log(`<-- cloud message received on behalf of ${d.name}`));

                    //this is where you would invoke custom logic to communicate downstream to the device

                })

                process.stdin.resume(); //keep the process alive
            }
        });
    });

