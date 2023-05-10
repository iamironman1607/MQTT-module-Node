const mqtt = require('mqtt')
require('dotenv').config();

const host = process.env.HOST
const port = process.env.PORT
const clientId = process.env.CLIENT_ID

const connectUrl = `mqtt://${host}:${port}` // BROKER URI
const client = mqtt.connect(connectUrl, {
    clientId,
    // clean: true,
    // connectTimeout: 4000,
    // username: '',
    // password: '',
    // reconnectPeriod: 1000,
})
const data = {
    // Temperature
    Channel0: '',
    // Vibration
    Channel1: '',
    // Ultrasound
    Channel2: '',
    // Magnetic Flux
    Channel3: '',
}
const topic = process.env.TOPIC
client.on('connect', (connack) => {
    console.log('Connected', connack)
    client.subscribe([topic], () => {

        console.log(`Subscribe to topic '${topic}'`)
    })
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})
client.on('message', (topic, payload) => {
    console.log(payload.toString()[0]);
    // data={...data, data.Channel0:}
    console.log('Received Message:', topic, payload.toString())
})


client.on("error", function (err) {
    console.log("Error: " + err)
    if (err.code == "ENOTFOUND") {
        console.log("Network error, make sure you have an active internet connection")
    }
})

client.on('offline', function () {
    console.log("Client is currently offline!");
})
