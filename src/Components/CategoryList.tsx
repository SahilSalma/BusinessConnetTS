import { Divider, Grid2 as Grid, Typography, Zoom } from "@mui/material";
import React, { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { useTheme } from '@mui/material/styles';
import { Category } from "../Types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { categories as categoriesList, categoriesLoading } from "../Redux/selectors";
import { t } from "i18next";
import { Actions } from "../Redux/Reducer/rootReducer";
import LoadingOverlay from "../CommonComponents/LoadingOverlay";

const CategoryList: React.FC = () => {
    const categories: Category[] = useSelector(categoriesList) || [];
    const isLoading = useSelector(categoriesLoading);
    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(Actions.category.fetch.categoryActions.request());
        }
    }, []);

    return (
        <>
            <Typography sx={{ my: 4, color: theme.palette.text.primary, fontWeight: 'bolder' }} variant="h3" component="h1">
                {t('categoriesTitle')}
            </Typography>
            {/* <LoadingOverlay isLoading={isLoading} /> */}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent={'center'} alignItems="center">
                {categories.map((category, index) => (
                    <Zoom in={true} timeout={500*index} key={index}>
                        <Grid key={index} component="div">
                            <CategoryCard 
                                image={category.image} 
                                name={category.name} 
                                numBusiness={category.numBusiness || 0} 
                            />
                        </Grid>
                    </Zoom>
                ))}
            </Grid>
            <Divider sx={{ my: 2 }} />
        </>
    );
};

export default CategoryList;
