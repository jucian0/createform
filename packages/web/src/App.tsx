import React, { useEffect } from 'react'
import './styles.css'

import { } from '@useForms/useForms'

const App: React.FC = () => {
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
