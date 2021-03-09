import axios from 'axios'

const url = 'https://s3.amazonaws.com/dolartoday/data.json'

const url2 = 'https://api.yadio.io/rates'

export const traerTasa = async () => {
  const res = await axios.get(url)
  return res.data.USD.dolartoday
}

export const traerTasa2 = async () => {
  const res = await axios.get(url2)
  return res.data.usd
}
