const mqtt = require('mqtt')
require('dotenv').config();

const host = process.env.HOST
const port = process.env.PORT
const clientId = process.env.CLIENT_ID

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    // clean: true,
    // connectTimeout: 4000,
    // username: '',
    // password: '',
    // reconnectPeriod: 1000,
})
const data = {
    // temp
    Channel0: '',
    // vibration
    Channel1: '',
    // ultrasound
    Channel2: '',
    // mag_flux
    Channel3: '',
}
const topic = process.env.TOPIC
client.on('connect', () => {
    console.log('Connected')
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
