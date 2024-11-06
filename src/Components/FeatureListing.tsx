import { Grid2 as Grid, Zoom, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";
import { getFeaturedBusinesses } from "../Utils/BackendAPICalls";
import featuredBusinesses from "../DummyData/featuredBusinesses";
import { FeaturedBusiness } from "../Types/allTypes";

const FeatureListing: React.FC = () => {
  const [featuredBusiness, setFeaturedBusinesses] = useState<FeaturedBusiness[]>([]);

  useEffect(() => {
    const fetchFeaturedBusinesses = async () => {
    //   try {
    //     const businesses = await getFeaturedBusinesses();
    //     setFeaturedBusinesses(businesses);

    //     if (businesses?.length === 0) {
    //       console.log("No featured businesses found");
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch featured businesses:", error);
        setFeaturedBusinesses(featuredBusinesses);
    //   }
    };

    fetchFeaturedBusinesses();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', my: 2, mb: 3 }}>
        Featured Listing
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {featuredBusiness.map((business, index) => {
          const displayImage = business.photoUrls[0];
          return (
            <Grid key={business._id}>
              <Zoom in timeout={500 * index}>
                <div>
                    <BusinessCard
                        id={business._id}
                        image={displayImage}
                        businessName={business.name}
                        businessCatagory={business.category}
                        rating={business.rating}
                        businessDescription={business.description}
                    />
                </div>
              </Zoom>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FeatureListing;
