import Login from "./Login"
import Signup from "./Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './dashboard'
import Home from "./home"
import Complete from "./complete"
import Test from "./test"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/complete" element={<Complete />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
