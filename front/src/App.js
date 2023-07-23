import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from  "react-router-dom";
import Login from "./component/Login/Login_Main"
import User_Login from "./component/Login/User_Login"
import Register_Tel from "./component/Register/Register_Tel"
import Register_Nickname from "./component/Register/Register_Nickname"
import Register_Crew from "./component/Register/Register_Crew"
import Schedule from "./component/Competition/Competition_Schedule/Competition_Schedule"
import Main from "./component/Main/Main";
import styled from "styled-components"
import Navbar from "./component/Navbar/Navbar"
import Competition_Detail from './component/Competition/Competition_Detail/Competition_Detail'
import { Outlet } from 'react-router-dom';

const WithNav = () =>{
  return(
    <>
      <Outlet/>
      <Navbar/>
    </>
  )
}

const WithoutNav =()=>{
  return(
    <Outlet/>
  )
}

function App() {
  return (
    <WebMain>
      <APP>
        <BrowserRouter>
          <Routes>
            <Route element={<WithNav/>}>
              <Route path ="/main" element={<Main/>}/>
              <Route path='/schedule' element = {<Schedule/>}/>
              <Route path='/comp_detail' element ={<Competition_Detail/>}/>
            </Route>

            <Route element={<WithoutNav/>}>
              <Route path="/" element={<Login/>}/>
              <Route path ="/user_login" element={<User_Login/>}/>
              <Route path ="/register_tel" element={<Register_Tel/>}/>
              <Route path ="/register_name" element={<Register_Nickname/>}/>
              <Route path ="/register_crew" element={<Register_Crew/>}/>        
            </Route>

          </Routes>
        </BrowserRouter>
      </APP>
    </WebMain>
  );
}

//배경
const WebMain = styled.div`
  background-color:#141414;
  display:flex;
  justify-content:center;
  align-items:center;
`

//앱 크기
const APP = styled.div`
  width:100%;
  min-width:360px;
  max-width:420px;
`

export default App;
