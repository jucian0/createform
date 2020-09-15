import React, { useEffect } from 'react'
import './styles.css'

import { useForm } from '@use-form/use-form'

const App: React.FC = () => {

  console.log(useForm)
  useEffect(() => { }, [])

  return (
    <section>
      <form>
        <div>
          <input type="text" placeholder="name" />
        </div>
        <div>
          <input type="text" placeholder="email" />
        </div>
        <div>
          <input type="text" placeholder="password" />
        </div>
        <div>
          <button>reset</button>
          <button>submit</button>
        </div>
      </form>
    </section>
  )
}

export default App
