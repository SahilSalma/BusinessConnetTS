import { Grid2 as Grid, Typography, Container } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import { useAuth } from "../Context/authContext";
import AddPost from "./PostContent";
import { useDispatch, useSelector } from "react-redux";
import { posts, postsLoading } from "../Redux/selectors";
import { Actions } from "../Redux/Reducer/rootReducer";
import LoadingOverlay from "../CommonComponents/LoadingOverlay";

const PostDisplay: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const currentPosts = useSelector(posts);
    const isLoading = useSelector(postsLoading);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentPosts)
            dispatch(Actions.posts.getPostActions.request({ page: String(page) }));
    }, [currentPosts]);

    useEffect(() => {
        dispatch(Actions.posts.resetGetPostsRequestAction());
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                if (scrollTop + clientHeight >= scrollHeight) {
                    setPage(prevPage => prevPage + 1);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        dispatch(Actions.posts.getPostActions.request({ page: String(page) }));
    }, [page]);

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            {isAuthenticated && (
                <Typography sx={{ my: 4 }} variant="h3" component="h1">
                    Your feed
                </Typography>
            )}
            <Container ref={containerRef} maxWidth="md" sx={{ maxHeight: 1500, overflow: 'scroll' }}>
                <Grid container spacing={2}>
                    {isAuthenticated && <Grid size={{ xs: 12 }}>
                        <AddPost />
                    </Grid>}
                    {currentPosts?.map((post, index) => {
                        return (
                            <Grid size={{ xs: 12 }} key={index}>
                                <Post
                                    {...post}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};

export default PostDisplay;
