// src/ViewPost.tsx

import React, { useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Post from './Post';
import { getPostById, userSignIn } from '../Utils/BackendAPICalls';
import { Post as PostType } from '../Types/allTypes';

const ViewPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = React.useState<PostType>();
  const nav = useNavigate();

  useEffect(() => {
    if (!postId) {
      nav('/');
    }
    const fetchPost = async () => {
      if (postId) {
        try {
          const post = await getPostById(postId);
          setPost(post);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPost();
  }, [postId, nav]);

  const postNotAvailable = () => {
    return (
      <Card sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent>
          <Typography variant="h4">Post not found</Typography>
          <Button onClick={() => nav('/')} variant="contained" color="primary">
            Go back
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="md">
      {post && (
        <Post 
          {...post}
        />
      )}
      {!post && postNotAvailable()}
    </Container>
  );
};

export default ViewPost;
