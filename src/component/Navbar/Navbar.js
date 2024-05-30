import * as React from 'react';
import {useEffect} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {ReactComponent as HomeIcon} from '../../Image/home.svg';
import {ReactComponent as DirectionsRunIcon} from '../../Image/contest.svg';
import {ReactComponent as PeopleIcon} from '../../Image/crew.svg';
import {ReactComponent as CorporateFareIcon} from '../../Image/community.svg';
import {ReactComponent as DoNotStepIcon} from '../../Image/shoes.svg';
import { DoNotStepOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

export default function Navbar() {

  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);

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
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="홈"
          value="/"
          onClick = {navigateToMain}
          icon={<HomeIcon  style={{ 
            color: 'inherit'}} width={24} height={24}/>}
        />
        <BottomNavigationAction
          label="대회일정"
          value="/schedule"
          onClick = {navigateToContest}
          icon={<DirectionsRunIcon  style={{ 
            color: 'inherit'}} width={24} height={24}/>}
        />
        <BottomNavigationAction
          label="러너톡"
          value="/runnertalk"
          onClick = {navigateToTalk}
          icon={<CorporateFareIcon  style={{ 
            color: 'inherit'}} width={24} height={24}/>}
        />
        <BottomNavigationAction
          label="러닝크루"
          value="/crew"
          onClick = {navigateToCrew}
          icon={<PeopleIcon  style={{ 
            color: 'inherit'}} width={24} height={24}/>}
        />
        <BottomNavigationAction
          label="러닝화"
          value="/shoes"
          onClick = {navigateToShoes}
          icon={<DoNotStepOutlined  style={{ 
            color: 'inherit'}} width={24} height={24}/>}
        />
      </BottomNavigation>
    </Box>
  );
}