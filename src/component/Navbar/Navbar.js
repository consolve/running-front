import * as React from 'react';
import {useEffect} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {ReactComponent as HomeIcon} from '../../Image/home.svg';
import {ReactComponent as DirectionsRunIcon} from '../../Image/contest.svg';
import {ReactComponent as PeopleIcon} from '../../Image/crew.svg';
import {ReactComponent as CorporateFareIcon} from '../../Image/community.svg';
import {ReactComponent as DoNotStepIcon} from '../../Image/icon/shoes.svg';

import {ReactComponent as HomeIconActive} from '../../Image/icon/HomeOutlined.svg';
import {ReactComponent as CrewIconActive} from '../../Image/icon/CrewOutlined.svg';
import {ReactComponent as ContestIconActive} from '../../Image/icon/ContestOutlined.svg';
import {ReactComponent as CommunityIconActive} from '../../Image/icon/CommunityOutlined.svg';
import {ReactComponent as ShoesIconActive} from '../../Image/icon/shoesOutlined.svg';

import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

export default function Navbar() {

  const pathname = window.location.pathname;
  const [path, setValue] = React.useState(pathname);

  const navigate = useNavigate();

  const navigateToMain = () =>{
    navigate('/');
  }
  const navigateToContest = () =>{
    navigate('/schedule');
  }
  const navigateToTalk= () =>{
    navigate('/runnertalk');
  }
  const navigateToCrew= () =>{
    navigate('/crew');
  }
  const navigateToShoes= () =>{
    navigate('/shoes');
  }

  useEffect(()=>{
    setValue("/"+pathname.split('/')[1]);
  },[pathname])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: '50%', right: 0,width:'100%',minWidth:'360px',maxWidth:'450px',transform:'translate(-50%,0)',zIndex:1000 }} elevation={0}>
      <BottomNavigation value={path} onChange={handleChange} showLabels>
                <BottomNavigationAction
                  label="홈"
                  value="/"
                  onClick = {navigateToMain}
                  icon={
                    path === '/' ? 
                      <HomeIconActive style={{ color: 'inherit' }} width={24} height={24} />
                     : 
                      <HomeIcon style={{ color: 'inherit' }} width={24} height={24} />
                    
                  }
                  disableTouchRipple = {true}
                />
        <BottomNavigationAction
          label="대회일정"
          value="/schedule"
          onClick = {navigateToContest}
          icon={
            path === '/schedule' ? 
              <ContestIconActive style={{ color: 'inherit' }} width={24} height={24} />
             : 
              <DirectionsRunIcon style={{ color: 'inherit' }} width={24} height={24} />
            
          }
disableTouchRipple = {true}  
        />
        <BottomNavigationAction
          label="러너톡"
          value="/runnertalk"
          onClick = {navigateToTalk}
          icon={
            path==='/runnertalk'?
            <CommunityIconActive  style={{color: 'inherit'}} width={24} height={24}/>
            :
            <CorporateFareIcon  style={{color: 'inherit'}} width={24} height={24}/>
          }
disableTouchRipple = {true}
        />
        <BottomNavigationAction
          label="러닝크루"
          value="/crew"
          onClick = {navigateToCrew}
          icon={
            path==='/crew'?
            <CrewIconActive  style={{color: 'inherit'}} width={24} height={24}/>
            :
            <PeopleIcon  style={{color: 'inherit'}} width={24} height={24}/>
          }
disableTouchRipple = {true}
        />
        <BottomNavigationAction
          label="러닝화"
          value="/shoes"
          onClick = {navigateToShoes}
          icon={
            path==='/shoes'?
            <ShoesIconActive  style={{color: 'inherit'}} width={24} height={24}/>
            :
            <DoNotStepIcon  style={{color: 'inherit'}} width={24} height={24}/>
          }
disableTouchRipple = {true} 
        />
      </BottomNavigation>
    </Box>
  );
}