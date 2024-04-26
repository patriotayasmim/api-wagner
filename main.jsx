import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './Form.jsx'
import '../css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='telaInteira'>
      <Form />
    </div>
  </React.StrictMode>,
)
