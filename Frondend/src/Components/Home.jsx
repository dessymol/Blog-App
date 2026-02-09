import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Grid, IconButton, Tooltip,Box,Dialog,DialogContent} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiousInstance from '../../axiosinterceptor';

const Home = () => {
 let token=localStorage.getItem('token');
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});
  const [previewImg, setPreviewImg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/blog')
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteBlog = (id) => {
    axiosInstance.delete(`http://localhost:3000/blog/delete/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleShare = (id) => {
    const link = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(link);
    alert("Blog link copied!");
  };

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto", px: 4, py: 4 }}>

      <Grid container spacing={4} justifyContent="flex-start">

        {blogs.map((blog) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={blog._id}
            display="flex"
            justifyContent="center"
          >

            <Card
              sx={{
                width: "100%",
                maxWidth: 320,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                transition: "0.4s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }
              }}
            >

              <Box
                sx={{ overflow: "hidden", cursor: "pointer" }}
                onClick={() => setPreviewImg(blog.imageUrl)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    blog.imageUrl?.startsWith("http")
                      ? blog.imageUrl
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={blog.title}
                  sx={{
                    objectFit: "cover",
                    transition: "0.5s",
                    "&:hover": { transform: "scale(1.08)" }
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  noWrap
                >
                  {blog.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {blog.description}
                </Typography>

              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Tooltip title="Like">
                    <IconButton onClick={() => handleLike(blog._id)}>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </Tooltip>

                  <Typography variant="caption">
                    {likes[blog._id] || 0}
                  </Typography>

                  <Tooltip title="Share">
                    <IconButton onClick={() => handleShare(blog._id)}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box>
                  { token &&(
                    <>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => navigate(`/edit/${blog._id}`)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteBlog(blog._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  </>
                  )
}
                </Box>

              </CardActions>

            </Card>

          </Grid>

        ))}

      </Grid>

      {/* IMAGE PREVIEW MODAL */}
      <Dialog
        open={Boolean(previewImg)}
        onClose={() => setPreviewImg(null)}
        maxWidth="md"
      >
        <DialogContent sx={{ p: 0 }}>
          <img
            src={previewImg}
            alt="preview"
            style={{ width: "100%", borderRadius: 10 }}
          />
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default Home;
