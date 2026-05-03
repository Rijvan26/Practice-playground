import React, { useEffect , useState} from 'react'

const useFetchUser = (url) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [retry, setRetry] = useState(1)
    const [errors, seterrors] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
       
        const fetchUser = async () => {
            setLoading(true)
            seterrors(null)
               try{
                  const res = await fetch(url,
                    {signal:controller.signal}
                  )

                  if(!res.ok){
                    throw new Error ("Api Fetch failed")
                  }

                  const data = await res.json()
                  setUsers(data)
               } catch (err){
                if(!err.message === "Aborterror"){
                    seterrors(err.message)
                }
               } finally {
                setLoading(false)
               }
        }

        fetchUser()

       return () => controller.abort()
       
    },[url])
  return {users, errors, retry, loading}
}

export default useFetchUser