import React, { useEffect , useState} from 'react'

const useFetchUser = (url) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [retry, setRetry] = useState(1)
    const [errors, setErrors] = useState(null)

           function retryFetch() {
               setRetry((prev) => prev + 1)
           }
    useEffect(() => {
        const controller = new AbortController()
       
        const fetchUser = async () => {
            setLoading(true)
            setErrors(null)
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
                if(err.name !== "AbortError"){
                    setErrors(err.message)
                }
               } finally {
                setLoading(false)
               }
        }

        fetchUser()

       return () => controller.abort()
       
    },[retry,url])

     
  return {users, errors, retryFetch, loading}
}

export default useFetchUser