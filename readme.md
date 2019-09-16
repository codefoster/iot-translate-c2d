## Introduction

## Create a List of Devices
Use the `az` cli to build a list of devices and fetch their keys.

 1. Create a bunch of devices in your IoT Hub
    ``` bash
    for n in {1..100}
    do
        az iot hub device-identity create -n <hub name> -d device$n
    done
    ```
 1. Fetch the primary keys of each device
    ``` bash
    for n in {1..2}
    do
        az iot hub device-identity show -d device1$n -n <hub name> -o tsv --query '{"name":deviceId, "key":authentication.symmetricKey.primaryKey}';
    done > config.json
    ```
 1. Format the newly created config.json to look like this...

    ``` json
    {
        "hubName": "<hub name>",
        "servicePolicyKey": "<service policy key>",
        "devices": [
            { "name": "device1", "key": "..."},
            { "name": "device2", "key": "..."},
            { "name": "device3", "key": "..."}
        ]
    }
    ```
    Be sure to enter the name of your hub and get the primary key for the service policy in there too.
    
    This configuration will drive the rest of the project.

    Tip: for this, I make extensive use of VS Code's multiline select using `CTRL+SHIFT+ALT+Down Arrow`.

(service.ts)

(gateway.ts)

(device.ts file is not being used for anything)


