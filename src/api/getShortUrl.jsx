import axios from 'axios'
import React from 'react'

export default async function getShortUrl(longLink, SetUrl) {
  try {
    const options = {
        method: "GET",
        url: 'https://ismaelc-bitly.p.rapidapi.com/v3/shorten',
        params: {
            longUrl: `${longLink}`,
            apikey: '<REQUIRED>',
            login: '<REQUIRED>'
        },
        headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'ismaelc-bitly.p.rapidapi.com'
        }
    }

    const res = await axios.request(options)
    SetUrl(res.data)

  } catch (error) {
    
  }
}
