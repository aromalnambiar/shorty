import { useState } from 'react'
import './App.css'
import getShortUrl from './api/getShortUrl'

function App() {

  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")


  const getUrl = (url) => {
    setShortUrl(url)
  }


  const shortLink = async () => {
    getShortUrl(longUrl, getUrl)
  }

  
  

  return (
    <>
      
    </>
  )
}

export default App
