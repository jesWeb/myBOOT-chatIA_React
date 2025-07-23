
import { Route, Routes } from 'react-router-dom'
import './index.css'
import MainVentanaChat from './components/MainVentanaChat'

function App() {


  return (
    <>
      <div className='min-h-screen bg-zinc-900 text-white' >
        <Routes>
          <Route path='/' element={<MainVentanaChat />} />
        </Routes>
      </div>
    </>
  )
}

export default App
