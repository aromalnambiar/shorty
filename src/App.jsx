import { useState } from 'react'
import './App.css'
import getShortUrl from './api/getShortUrl'

// assets

import Loader from './assets/loader.svg'
import Tick from './assets/tick.svg'
import Copy from './assets/copy.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'react-qr-code'

function App() {
  // state
  const [disable, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  // handle input
  const handleLink = (e) => {
    validURL(e.target.value)
    setLongUrl(e.target.value)
  }

  // validate url for disable the button
  const validURL = (string) => {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm
    );
    let isValidURL = !!pattern.test(string);
    if (isValidURL !== true) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };


  // form submission
  const handleForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    shortLink();
  }



  // funtion to convert long url to short one (api call)
  const shortLink = async () => {
    setIsLoading(false);
    const get = getShortUrl(longUrl, "").then((result) => {
      console.log(result.link)
      setShortUrl(result.link);
    }).catch((err) => {
      toast.error(err.message)
    });
  }

  
  

  return (
    <>
      <div>
      <div>
        {isCopied && (
          <div className="px-5 py-3 flex bg-green-100 items-center text-green-600 absolute w-full top-0 left-0 right-0 z-10">
            <img src={Tick} className="h-5 w-5 mr-2" alt="tick icon" />
            Awesome! Your link has been copied.
          </div>
        ) }
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-width-for-main w-full space-y-8">
          <div>
            <h3 className="mt-6 text-left text-3xl font-extrabold text-gray-900">
              Shorty: URL Generator with QR Code
            </h3>
            <p className="mt-2 text-left text-1xl text-gray-400">
            Shorten your URLs effortlessly and enhance click impressions with the Shorty URL Generator. Scan the QR code for quick access to your concise links.
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => handleForm(e)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="link-text" className="sr-only">
                  link text
                </label>
                <input
                  id="link-text"
                  name="text"
                  type="text"
                  autoComplete="text"
                  required
                  value={longUrl}
                  onChange={handleLink}
                  className="appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-base"
                  placeholder="Paste your long link here"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={
                  disable
                    ? 'cursor-not-allowed group disabled w-full flex justify-center py-4 px-5 border border-transparent text-lg font-medium rounded-md text-white bg-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                    : 'group w-full flex justify-center py-4 px-5 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }
              >
                {isLoading ? (
                  <img
                    src={Loader}
                    className="animate-spin h-6 w-6 mx-auto"
                    alt="loading ..."
                  />
                ) : (
                  <>Create a Link</>
                )}
              </button>
            </div>
          </form>
          <div>
            {shortUrl !== '' ? (
              <div className='py-3 sm:px-6 border border-gray-200 rounded-sm  space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200 hover:bg-green-50 hover:border-green-300'>
                <button
                  type="button"
                  className="w-full bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 flex items-center justify-center mb-2"
                  onClick={() => {
                    if (shortUrl !== undefined) {
                      navigator.clipboard.writeText(shortUrl);
                      toast.error("Successfully copied !")
                    }
                    setIsCopied(true);
                    
                    setInterval(() => {
                      setIsCopied(false);
                    }, 5000);
                  }}
                >
                  <span className="text-gray-900">
                    <span
                      className="hidden sm:inline text-gray-500"
                      aria-hidden="true"
                    ></span>
                    {shortUrl}
                  </span>
                  <span className="sr-only">(click to copy to clipboard)</span>
                  <img src={Copy} className="h-5 w-5" alt="copy link" />
                  
                </button>
                
                <span className="text-gray-900">
                    <span
                      className="hidden sm:inline  text-gray-500 "
                      aria-hidden="true"
                    ></span>
                    OR
                  </span>

                <div className='qrcontainer' >
                  <QRCode value={longUrl} />
                  <span className="text-gray-900 ">
                    <span
                      className="hidden sm:inline  text-gray-500 "
                      aria-hidden="true"
                    ></span>
                    <p className='text-xs' >Scan the QR code to access the link.</p>
                  </span>
                </div>
                
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
