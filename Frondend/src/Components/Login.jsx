import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('/api/auth/login', form);
    alert(res.data.message);
    
    if(res.data.usertoken){
       
          localStorage.setItem("user",res.data.usertoken);//the token that we created
           navigate('/home');
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4
        }}
      >

        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Login 🔐
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Welcome back! Please login to your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              fontSize: "1rem",
              borderRadius: 3,
              background: "linear-gradient(135deg,#667eea,#764ba2)"
            }}
          >
            Login
          </Button>

        </Box>

      </Paper>
    </Box>
  );
};

export default Login;
