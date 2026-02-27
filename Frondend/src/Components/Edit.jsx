import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosinterceptor';

const Edit = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    axiosInstance.get(`/api/blog/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.put(`/api/blog/update/${id}`, blog)
      .then(() => {
        alert("Blog Updated Successfully ✨");
        navigate('/home');
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
          Edit Blog ✏️
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
            Update Blog 🚀
          </Button>

        </Box>

      </Paper>

    </Box>
  );
};

export default Edit;
