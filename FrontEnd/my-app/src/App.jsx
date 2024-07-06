import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from './component/NavBar.jsx';
import Home from './component/pages/Home.jsx';
import Footer from './component/Footer.jsx';
import SignUpRole from './component/pages/SignUpRole.jsx';
import SignUpForm from './component/pages/SignUpForm.jsx'
import Programming from './component/pages/Programming.jsx';
import Graphics from './component/pages/Graphics.jsx'
import DigitalMarketting from './component/pages/DigitalMarketting.jsx';
import Login from './component/pages/Login.jsx';
import CreateTalent from './component/pages/CreateTalent.jsx';
import axios from 'axios'
import AllTalent from './component/pages/AllTalent.jsx';

import { jwtDecode } from "jwt-decode";

function App() {
  const [SignUprole,setSignUpRole]=useState('')
  const [talents, setTalents] = useState([])
  const [refetsch, setRefetsch] = useState(false)
  const [user,setUser]=useState({})
  const [oneTalent, setOneTalent] = useState({})

  const getTalents = () => {
    axios.get('http://127.0.0.1:5000/api/talents/getAll').then((response) => {
      console.log(response.data)
      setTalents(response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  }

  const postTalent = (body) => {
    axios.post('http://127.0.0.1:5000/api/talents/add', body).then((response) => {
      console.log('Talent added successfully', response.data)
      setRefetsch(!refetsch)
    })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTalent = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/talents/${id}`).then((response) => {
      console.log('Talent deleted successfully', response.data)
      setRefetsch(!refetsch)
    }).catch((error) => { console.log(error) })
  }

 

  
  useEffect(() => {
    getTalents()
  }, [refetsch])

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (token && isAuthenticated) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken)
    }
  }, []);



  const onChange = (talent) => {
    setOneTalent(talent)
  }

  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up-role" element={<SignUpRole setSignUpRole={setSignUpRole} role={SignUprole} />} />
        <Route path="/sign-up-form" element={<SignUpForm role={SignUprole} />} />
        <Route path="/sign-up-role" element={<SignUpRole setSignUpRole={setSignUpRole} role={SignUprole} />} />
        <Route path="/sign-up-form" element={<SignUpForm role={SignUprole} />} />
        <Route path="/login" element={<Login user={setUser} />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/graphics" element={<Graphics />} />
        <Route path="/digital-marketting" element={<DigitalMarketting />} />
        <Route path="/addtalent" element={<CreateTalent add={postTalent} user={user} />}></Route>
        <Route path="/alltalent" element={<AllTalent talents={talents} change={onChange} delete={deleteTalent} />}></Route>
       
      </Routes>
      <Footer />
    </Router>
  )
}

export default App