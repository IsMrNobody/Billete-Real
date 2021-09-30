import axios from 'axios'

const url = 'https://s3.amazonaws.com/dolartoday/data.json'

const url2 = 'https://api.yadio.io/rates'

const url3 = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'

const url4 = 'https://api.coingecko.com/api/v3/coins/elements-2'


export const traerTasa = async () => {
  const res = await axios.get(url)
  return res.data.USD.dolartoday
}

export const traerTasa2 = async () => {
  const res = await axios.get(url2)
  return res.data.usd
}

export const traerTasa3 = async () => {
  const res = await axios.get(url3)
  return res.data
}

export const traerTasa4 = async () => {
  const res = await axios.get(url4)
  return res.data
}
