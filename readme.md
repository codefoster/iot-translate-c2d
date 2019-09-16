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
    done > devices.json
    ```
 1. Format the document to be valid jason like below

    ``` json
    [
        { "name": "device1", "key": "..."},
        { "name": "device2", "key": "..."},
        { "name": "device3", "key": "..."}
        ...
    ]
    ```
    For this, I make extensive use of VS Code's multiline select using `CTRL+SHIFT+ALT+Down Arrow`.

(service.ts)

(gateway.ts)

(device.ts file is not being used for anything)


