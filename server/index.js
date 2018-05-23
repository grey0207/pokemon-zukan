const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const rp = require('request-promise-native')
const fs = require("fs")
const cheerio = require('cheerio')

const app = new express()
app.use(cors(), bodyParser.json())

app.get('/', (req, res) => {
  rp.get('http://www.pokemon.jp/zukan/scripts/data/top_zukan.json')
    .then(body => {
      res.send(JSON.parse(body))
    })
})

app.post('/api', (req, res) => {
  console.log(req.body);
  rp.post('http://www.pokemon.jp/api.php',{
    form: req.body
  })
    .then(body => {
      res.send(body)
    })
})

app.listen(3001);
console.log('app started at port 3001...');
