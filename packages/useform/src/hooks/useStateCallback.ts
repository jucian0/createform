import React, { useEffect } from 'react'

type UseStateCallback<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export function useStateCallback<T>(initialState: T, callback: (state: T) => void): UseStateCallback<T> {

   const [state, setState] = React.useState(initialState)

   useEffect(() => {
      callback(state)
   }, [state])

   return [state, setState]
}