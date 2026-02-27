import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  let token =localStorage.getItem('user')
  const navigate = useNavigate();
  const handleLog=()=>{
    localStorage.removeItem('user')
    navigate('/home')
  }
  
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid #eee',
        color: '#333' 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Typography 
            variant="h5" 
            component={Link} 
            to="/home"
            sx={{ fontWeight: 800, letterSpacing: '-1px', textDecoration: 'none', color: 'inherit', fontFamily: 'serif' }}
          >
            BLOGS.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button component={Link} to="/home" sx={{ color: '#555', fontWeight: 500 }}>Home</Button>
            {!token &&(
            <>
            <Button component={Link} to="/login" variant="outlined" sx={{ borderRadius: '20px', textTransform: 'none', px: 3, borderColor: '#333', color: '#333' }}>
              Login
            </Button>
            </>)}
           {token &&(
            <>
            <Button component={Link} to="/blogsadd" sx={{ color: '#555', fontWeight: 500 }}>Add Post</Button>
            <Button  variant="outlined"  onClick={handleLog} sx={{ borderRadius: '20px', textTransform: 'none', px: 3, borderColor: '#333', color: '#333' }} >
              Logout
            </Button>
            </>)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;