import axios from 'axios'
import { useEffect, useState } from 'react'

interface DataI {
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

const useGetApod = () => {
  const [data, setData] = useState<DataI | null>(null)
  const [error, setError] = useState<string | unknown>('')
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`
    setLoading(true)
    try {
      const response = await axios.get(url)
      if (response.data) {
        setTimeout(() => {
          setData(response.data)
          setLoading(false)
        }, 600)
      }
    } catch (error) {
      setError(error)
    }
  }

  //when ever hook is mounted we call fetchData
  useEffect(() => {
    fetchData()
  }, [])

  //return of the custom hook
  return { data, loading, error }
}

export default useGetApod
