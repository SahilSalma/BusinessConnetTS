import React from "react";
import { Box, Container, Divider } from "@mui/material";
import ImageSlider from "../CommonComponents/ImageSlider";
import FeatureListing from "../Components/FeatureListing";
import CategoryList from "../Components/CategoryList";
import { useTheme } from '@mui/material/styles';
import PostDisplay from "../Components/PostDisplay";

const Home: React.FC = () => {
	document.title = "Home";
    const theme = useTheme();

	return (
		<>
            {/* <ImageSlider /> */}
			<Container maxWidth="lg">
				{/* <Box sx={{ my: 4 }}>
					<FeatureListing />
				</Box> */}
				<Box sx={{ my: 4 }}>
					<PostDisplay />
				</Box>
			</Container>
			<Divider />
			<Container maxWidth={false} sx={{ backgroundColor: theme.palette.background.default, textAlign: 'center' }}>
				<CategoryList />
			</Container>
		</>
	);
};

export default Home;
