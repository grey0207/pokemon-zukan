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
    .catch(error => console.log(error))
})

app.post('/api', (req, res) => {
  rp.post('http://www.pokemon.jp/api.php',{
    form: req.body
  })
    .then(body => {
      res.send(body)
    })
    .catch(error => console.log(error.message))
})

app.get('/detail/:link', (req, res) => {
  let link = req.params.link
  rp.get(`http://www.pokemon.jp/zukan/detail/${link}`, { transform: body => cheerio.load(body) })
    .then($ => {
      return {
        num: $('.title .num').text(),
        name: $('.title .name').text(),
        profilePhoto: $('.profile-phto img').attr('src'),
        type: $('.type .pokemon-type li a span').map((i, el) => $(el).text().replace(' ','')).get().join(','),
        weaknesses: $('.weaknesses .pokemon-type li a').map((i, el) => $(el).text().replace(/\s/gi,'')).get().join(','),
        details: [
          $('.pokemon-details').find('.details').eq(0).find('li').eq(0).find('p').eq(1).text(),
          $('.pokemon-details').find('.details').eq(0).find('li').eq(1).find('.txts').eq(0).find('p').text(),
          $('.pokemon-details').find('.details').eq(1).find('li').eq(0).find('p').eq(1).text(),
          $('.pokemon-details').find('.details').eq(1).find('li').eq(1).find('p').eq(1).text(),
          $('.pokemon-details').find('.details').eq(1).find('li').eq(2).find('.sex span').map((i, el) => $(el).attr('class')).get().join(','),
        ],
        pokemonForm: $('.pokemon-form .list').children('li').map((i, el) => {
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text(),
            type: $(el).find('.pokemon-type>li').find('p').map((i, el) => $(el).text().replace(' ','')).get().join(','),
          }
        }).get(),
        evolution: $('.evolution>.list').children('li').map((i, el) => {
          if ($(el).attr('class')==="row") return
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text(),
            type: $(el).find('.pokemon-type>li').find('p').map((i, el) => $(el).text().replace(' ','')).get().join(','),
          }
        }).get(),
        evolution_branch:$('.evolution>.list>.row>.list').children('li').map((i, el) => {
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text(),
            type: $(el).find('.pokemon-type>li').find('p').map((i, el) => $(el).text().replace(' ','')).get().join(','),
          }
        }).get(),
        prev: $('.pokemon-page>div').hasClass('prev')?$('.pokemon-page>.prev>a').attr('href').replace('/zukan/detail/', ''):null,
        next: $('.pokemon-page>div').hasClass('next')?$('.pokemon-page>.next>a').attr('href').replace('/zukan/detail/', ''):null
      }
    })
    .then(data => res.send(data))
    .catch(error => console.log(error))
})

app.listen(3001);
console.log('app started at port 3001...');
