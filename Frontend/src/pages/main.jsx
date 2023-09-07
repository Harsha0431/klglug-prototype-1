import React from 'react'
import './main.css'
import Navbar from '../components/Navbar/navbar'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import CreditList from './CreditList';
import Admin from './admin';
import Login from '../components/Login/Login';
import Home from './Home';
import LoginMUI from '../components/Login/LoginMUI';
import SignUp from '../components/Login/SignUp'


function Main() {
    return (
        <>
            <Router>
                <Navbar />
                <main style={{backgroundColor:'inherit'}}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/creditList' element={<CreditList />} /> 
                        <Route path='/login' element={<Login open={true}/>}></Route>
                        <Route path='/admin' element={<Admin />}></Route>
                        <Route path='/loginMUI' element={<LoginMUI />}></Route>
                        <Route path='/signUp' element={<SignUp />}></Route>
                    </Routes>
                </main>
            </Router>
        </>
    )
}

export default Main