import React, { useEffect,useState } from 'react'

const useDebounce = (value,duration) => {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        }, duration);

        return () =>  clearTimeout(timer)
    },[value , duration])
  return debounce
  
}

export default useDebounce