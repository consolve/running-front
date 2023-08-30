import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from  "react-router-dom";
import LoginMain from "./component/User/Login_Main"
import Login from "./component/User/Login/User_Login"
import RegisterTel from "./component/User/Register/Register_Tel"
import RegisterNickname from "./component/User/Register/Register_Nickname"
import RegisterCrew from "./component/User/Register/Register_Crew"
import Schedule from "./component/Competition/Competition_Schedule/Competition_Schedule"
import Main from "./component/Main/Main";
import styled from "styled-components"
import Navbar from "./component/Navbar/Navbar"
import Competition_Detail from './component/Competition/Competition_Detail/Competition_Detail'
import ScheduleSearch from './component/Competition/Competition_Search/Competition_Search'
import Shoes from "./component/Shoes/Shoes_Main/Shoes_Main";
import { Outlet } from 'react-router-dom';
import ShoesSearch from "./component/Shoes/Shoes_Search/Shoes_Search"
import Shoes_Detail from "./component/Shoes/Shoes_Detail/Shoes_Detail"
import { motion, AnimatePresence } from 'framer-motion';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

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
    <RecoilRoot>
      <WebMain>
        <APP>
          <BrowserRouter>
            <Routes>
              <Route element={<WithNav/>}>
                <Route path ="/main" element={<Main/>}/>
                <Route path='/schedule' element = {<Schedule/>}/>
                <Route path='/schedule/search' element ={<ScheduleSearch/>}/>
                <Route path='/shoes' element ={<Shoes/>}/>
                <Route path='/shoes/search' element ={<ShoesSearch/>}/>
              </Route>

              <Route element={<WithoutNav/>}>
                <Route path="/" element={<LoginMain/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register/tel" element={<RegisterTel/>}/>
                <Route path="/register/nickname" element={<RegisterNickname/>} />
                <Route path="/register/crew" element={<RegisterCrew/>} />
                <Route path='/competition/detail/:id' element ={<Competition_Detail/>}/>  
                <Route path="/shoes/detail/:id" element={<Shoes_Detail/>}/> 
              </Route>

            </Routes>
          </BrowserRouter>
        </APP>
      </WebMain>
    </RecoilRoot>
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
  min-height:100vh;
  background-color:#ffffff;
`

export default App;
