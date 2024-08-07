import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from  "react-router-dom";
import React from "react"
import LoginMain from "./pages/User/Login_Main"
import Login from "./pages/User/Login/User_Login"
import RegisterTel from "./pages/User/Register/Register_Tel"
import RegisterNickname from "./pages/User/Register/Register_Nickname"
import RegisterCrew from "./pages/User/Register/Register_Crew"
import Schedule from "./pages/Competition/Competition_Schedule/Competition_Schedule"
import Main from "./pages/Main/Main";
import styled from "styled-components"
import Navbar from "./component/Navbar/Navbar"
import Competition_Detail from './pages/Competition/Competition_Detail/Competition_Detail'
import ScheduleSearch from './pages/Competition/Competition_Search/Competition_Search'
import CompetitionAdd from "./pages/Competition/Competition_Add/Competition_Add"
import Shoes from "./pages/Shoes/Shoes_Main/Shoes_Main";
import { Outlet } from 'react-router-dom';
import ShoesSearch from "./pages/Shoes/Shoes_Search/Shoes_Search"
import Shoes_Detail from "./pages/Shoes/Shoes_Detail/Shoes_Detail"
import ShoesAdd from "./pages/Shoes/Shoes_Add/Shoes_Add"

import Crew from "./pages/Crew/Crew_Main/Crew_Main"
import CrewLocation from "./pages/Crew/Crew_Location/Crew_Location"
import CrewDetail from './pages/Crew/Crew_Detail/Crew_Detail';
import CrewSearch from "./pages/Crew/Crew_Search/Crew_Search"
import CrewAdd from "./pages/Crew/Crew_Add/Crew_Add"

import RunnerTalk from "./pages/RunnerTalk/RunnerTalk_Main/RunnerTalk_Main"
import RunnerTalkFilter from "./pages/RunnerTalk/RunnerTalk_Filtering/RunnerTalk_Filtering"
import RunnerTalkDetail from "./pages/RunnerTalk/RunnerTalk_Detail/RunnerTalk_Detail"
import RunnerTalkSearch from "./pages/RunnerTalk/RunnerTalk_Search/RunnerTalk_Search"
import RunnerTalkWrite from "./pages/RunnerTalk/RunnerTalk_Write/RunnerTalk_Write"
import RunnerTalkEdit from "./pages/RunnerTalk/Edit/Edit"

import Profile from "./pages/Profile/Profile_Main/Profile_Main"
import MyCompetition from './pages/Profile/Profile_My/Container/SavedCompetition';
import MyCrew from "./pages/Profile/Profile_My/Container/SavedCrew";
import MyShoes from "./pages/Profile/Profile_My/Container/SavedShoes";
import MyRunnerTalk from "./pages/Profile/Profile_My/Container/MyRunnerTalk";
import MySavedPost from "./pages/Profile/Profile_My/Container/SavedRunnerTalk";

import InformationTerm from "./component/Term/privacy";

import Report from "./pages/Report/report";
import Resign from "./pages/Resign/resign"

import RouteTransition from "./Util/RouteTransition"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import './style/plate/reset.css'
import "./style/transitionStyle.css"


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
  const location = useLocation();


  React.useEffect(()=>{
      window.scrollTo(0,0);
  },[location.pathname]);

  return (
    <RecoilRoot>
      <WebMain>
        <APP>
          <RouteTransition location={location}>
            <Routes location={location}>
              <Route element={<WithNav/>}>
                <Route path ="/" element={<Main/>}/>
                <Route path='/schedule' element = {<Schedule/>}/>
                <Route path='/schedule/search' element ={<ScheduleSearch/>}/>

                <Route path='/shoes' element ={<Shoes/>}/>
                <Route path='/shoes/search' element ={<ShoesSearch/>}/>

                <Route path='/crew' element ={<Crew/>}/>
                <Route path="/crew/location" element={<CrewLocation/>}/>
                <Route path='/crew/search' element ={<CrewSearch/>}/>

                <Route path="/runnertalk" element={<RunnerTalk/>}/>
                <Route path="/runnertalk/search" element={<RunnerTalkSearch/>}/>
              </Route>

              <Route element={<WithoutNav/>}>
                <Route path="/login/main" element={<LoginMain/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register/tel" element={<RegisterTel/>}/>
                <Route path="/register/nickname" element={<RegisterNickname/>} />
                <Route path="/register/crew" element={<RegisterCrew/>} />

                <Route path='/competition/detail/:id' element ={<Competition_Detail/>}/>  
                <Route path='/competition/add' element ={<CompetitionAdd/>}/>

                <Route path="/shoes/detail/:id" element={<Shoes_Detail/>}/> 
                <Route path="/shoes/add" element={<ShoesAdd/>}/>

                <Route path="/runnertalk/category/:id" element={<RunnerTalkFilter/>}/>
                <Route path="/runnertalk/detail/:id" element={<RunnerTalkDetail/>}/>
                <Route path="/runnertalk/write" element={<RunnerTalkWrite/>}/>
                <Route path="/runnertalk/edit/:id" element={<RunnerTalkEdit/>}/>

                <Route path="/crew/add" element={<CrewAdd/>}/>
                <Route path="/crew/detail/:id" element={<CrewDetail/>}/>

                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/saved/competition" element={<MyCompetition/>}/>
                <Route path="/profile/saved/crew" element={<MyCrew/>}/>
                <Route path="/profile/saved/shoes" element={<MyShoes/>}/>
                <Route path="/profile/myrunnertalk" element={<MyRunnerTalk/>}/>
                <Route path="/profile/saved/runnertalk" element={<MySavedPost/>}/>

                <Route path="/term/privacy" element={<InformationTerm/>}/>
                <Route path="/term/service" element={<InformationTerm/>}/>

                <Route path="/report" element={<Report/>}/>
                <Route path="/resign" element={<Resign/>}/>
              </Route>

            </Routes>
            </RouteTransition>
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
  overflow:hidden;
`

//앱 크기
const APP = styled.div`
  width:100%;
  min-width:360px;
  max-width:450px;
  min-height:100vh;
  background-color:#ffffff;
  overflow:hidden;
`

export default App;
