import axios from 'axios';
import { ZUKAN_TOP, API, DETAIL } from '../config';

const getPokemonCard = axios.create({
    url: API,
    method: 'post'
})

const getZukanTop = axios.create({
    url: ZUKAN_TOP,
    method: 'get'
})

const getDetailData = page => axios.create({
    url: DETAIL + '/' + page,
    method: 'get'
})

export { getPokemonCard, getZukanTop, getDetailData }