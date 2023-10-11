import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

export default function Navbar() {
  const [value, setValue] = React.useState('recents');

  const navigate = useNavigate();

  const navigateToMain = () =>{
    navigate('/');
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: '50%', right: 0,width:'100%',minWidth:'360px',maxWidth:'420px',transform:'translate(-50%,0)',zIndex:2 }} elevation={0}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="홈"
          value="Home"
          onClick = {navigateToMain}
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="대회일정"
          value="Contest"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="러너톡"
          value="Talk"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="러닝크루"
          value="Crew"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="러닝화"
          value="Shoes"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}