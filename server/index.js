const express = require('express')
const rp = require('request-promise-native')
const fs = require("fs")
const cheerio = require('cheerio')

const app = new express()

app.get('/', (req, res) => {
  rp.get('http://www.pokemon.jp/zukan/scripts/data/top_zukan.json')
    .then(body => {
      res.send(JSON.parse(body))
    })
})

app.listen(3001);
console.log('app started at port 3001...');
