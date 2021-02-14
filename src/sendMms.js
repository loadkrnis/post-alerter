const { config, Group } = require('../')
config.init({
  apiKey: 'NCSMQ16BEMIBHLCG',
  apiSecret: 'QQEUWNUOMWSLFNEJQ05D2ABQE5NDFXPE'
})
send({
  type: 'SMS',
  text: 'Hello, this is SMS',
  to: '01042614444',
  from: '01042614444'
})
async function send (message, agent = {}) {
  console.log(await Group.sendSimpleMessage(message, agent))
}