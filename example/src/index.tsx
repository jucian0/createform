import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import Controlled from './Controlled'
import './index.css'

const App = () => {
   const [date, setDate] = useState()
   return (
      <div className="container">
         <Controlled />
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))
