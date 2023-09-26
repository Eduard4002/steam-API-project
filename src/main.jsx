import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from './assets/components/header.jsx'
import Footer from './assets/components/footer.jsx'
import './index.css'
import Default from './assets/components/Default.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Default/>
    <App />
    <Footer />
  </React.StrictMode>,
)
