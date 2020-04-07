const redis = require('redis')

const redisHost = 'redis'
const redisPort = '6379'
let client = redis.createClient(redisPort, redisHost)

client.on('connect', () => {
  console.log(`Redis connected to ${redisHost}:${redisPort}`)
})

client.on('error', (err) => {
  console.log(`Redis could not connect to ${redisHost}:${redisPort}: ${err}`)
})

module.exports = client