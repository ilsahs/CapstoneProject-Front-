import Login from "./Login"
import Signup from "./Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './dashboard'
import Home from "./home"
import Complete from "./complete"
import Test from "./test"
import Logout from "./Logout"
import Comments from "./Comments"
import Forum from "./forum"
import Replies from "./replies"
import fComments from "./fcomments"

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
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/Comment/:eventid" element={<Comments />}></Route>
        <Route path="/forum" element={<Forum />}></Route>
        <Route path="/:id/replies" element={<Replies />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
