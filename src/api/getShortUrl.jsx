import axios from 'axios'

export default async function getShortUrl(longLink, SetUrl) {

  const apiKey = import.meta.env.VITE_APIKEY
  const BASE_URL = import.meta.env.VITE_BASE_URL
  console.log("hello")
  try {

    const res = await axios.post(
      BASE_URL,
      {
        long_url: longLink
      },
      {
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      }
    }
    )


    // SetUrl(res.data)

    const response = res.data
    return response;

  } catch (error) {
    
  }
}
