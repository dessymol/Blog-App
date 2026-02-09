import axios from 'axios';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterceptor';

const Add = () => {

  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post('http://localhost:3000/blog/add', blog)
      .then(res => {
        alert("Blog added successfully 🎉");

        setBlog({
          title: '',
          description: '',
          imageUrl: ''
        });

        navigate('/home');   // 👉 redirect to home page
      })
      .catch(err => console.log(err));
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Add New Blog ✍️
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Blog Title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={blog.imageUrl}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={blog.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(135deg,#667eea,#764ba2)"
            }}
          >
            Publish Blog 🚀
          </Button>

        </Box>

      </Paper>

    </Box>
  );
};

export default Add;
