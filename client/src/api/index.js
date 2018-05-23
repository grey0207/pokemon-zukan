import axios from 'axios';
import { ZUKAN_TOP, API } from './url';

const getPokemonCard = axios.create({
    url: API,
    method: 'post'
})

const getZukanTop = axios.create({
    url: ZUKAN_TOP,
    method: 'get'
})

 export { getPokemonCard, getZukanTop }