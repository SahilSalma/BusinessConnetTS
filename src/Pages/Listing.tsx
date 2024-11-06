import React, { useState, useEffect } from "react";
import { Container, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BusinessCard from "../Components/BusinessCard";
import CategorySectionList from "../Components/CategorySectionList";
import { useDispatch, useSelector } from "react-redux";
import { businesses, businessesLoading, categories } from "../Redux/selectors";
import { Actions } from "../Redux/Reducer/rootReducer";
import LoadingOverlay from "../CommonComponents/LoadingOverlay";

const Listing: React.FC = () => {
    document.title = "Category Search";
    
    const categoryData = useSelector(categories);
    const businessData = useSelector(businesses);
    const businessLoading = useSelector(businessesLoading);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState<string[]>([]);

    useEffect(() => {
        if (!categoryData) {
            dispatch(Actions.category.fetch.categoryActions.request());
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(Actions.business.fetch.businessActions.request({ 
            searchValue: checked.length > 0 ? checked : ['all']
        }));
    }, [checked]);

    const buildCategoryList = () => {
        return (
            <Grid container spacing={2}>
                {businessData?.map((business) => {
                    const categoryId = business?.category._id;
                    const categoryImage = categoryData?.find(x => x._id === categoryId)?.image;
                    const displayImage = business?.photoUrls?.length > 0 ? business?.photoUrls?.[0] : categoryImage;

                    return (
                        <Grid key={business?._id} size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                            <BusinessCard
                                id={business?._id}
                                image={displayImage || ''}
                                businessName={business?.name}
                                businessCatagory={business?.subcategory.name}
                                rating={business?.ratings}
                                businessDescription={business?.description}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    const location = useLocation();
    const filteredCategory = categoryData?.find(x => x.name.toLowerCase() === location.state.pageName.toLowerCase());
    
    return (
        <>
            <LoadingOverlay isLoading={businessLoading} />
            <Container maxWidth={'lg'}>
                <Typography sx={{ my: 2 }} variant="h4" component="div" gutterBottom> Filter By Needs </Typography>
                <Typography sx={{ my: 2 }} variant="subtitle1" component="div" gutterBottom> __________________________</Typography>
            </Container>
            <Divider sx={{ my: 2 }} />
            <Container maxWidth={'lg'}>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                        <CategorySectionList checked={checked} setChecked={setChecked} filteredCategory={filteredCategory} categoryData={categoryData || []} />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 8}}>
                        {buildCategoryList()}
                    </Grid>
                </Grid>
            </Container>
            <br />
        </>
    );
};

export default Listing;
