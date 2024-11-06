import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import BusinessView from "../Components/BusinessView";
import { useParams } from "react-router-dom";
import { Business } from "../Types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { businesses, businessesLoading } from "../Redux/selectors";
import { Actions } from "../Redux/Reducer/rootReducer";
import LoadingOverlay from "../CommonComponents/LoadingOverlay";

const DisplayBusiness: React.FC = () => {
  const [businessData, setBusinessData] = useState<Business | null>(null);
  const businessDataList = useSelector(businesses);
  const isLoading = useSelector(businessesLoading);
  const dispatch = useDispatch();
  const { businessId } = useParams<{ businessId: string }>();


  useEffect(() => {
    dispatch(Actions.business.fetch.businessActions.request({
      searchValue: ['all']
    }));
  }, []);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const business = businessDataList?.find(business => business._id === businessId) || null;
        if (business) {
          setBusinessData(business);
        } else {
          console.log(`Error: No business found`);
        }
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
        const filteredBusiness = businessDataList?.find(business => business._id === businessId) || null;
        if (filteredBusiness) {
          setBusinessData(filteredBusiness);
        }
      }
    };
    fetchBusiness();
  }, [businessId, businessDataList]);

  document.title = "DisplayBusiness";

  // Fallback for empty photoUrls
  if (businessData?.photoUrls?.length === 0) {
    businessData.photoUrls = [businessData.category?.image || ""];
  }

  return (
    <Container>
      <LoadingOverlay isLoading={isLoading} />
      <BusinessView
        _id={businessData?._id || ""}
        name={businessData?.name || ""}
        photoUrls={businessData?.photoUrls || [
          businessData?.category?.image || ""
        ]}
        email={businessData?.email || ""}
        phone={businessData?.phone || ""}
        hours={businessData?.hours || {}}
        description={businessData?.description || ""}
        offerings={businessData?.offerings || []}
        address={businessData?.address || {
          street: "",
          city: "",
          province: "",
          postalCode: "",
          isVirtualOnly: false,
          country: ""
        }}
        listingUserId=""
        website={businessData?.website || ""} 
        category={businessData?.category || {
          _id: "",
          name: "",
          image: "",
          description: "",
          numBusiness: 0,
          subcategories: []
        }} 
        subcategory={businessData?.subcategory || {
          _id: "",
          name: "",
          description: "",
          parentCategory: "",
          numBusiness: 0
        }} 
        ratings={businessData?.ratings || { value: 0, reviewCount: 0 }} 
        tags={businessData?.tags || []} 
        socialMedia={businessData?.socialMedia || {}}
        authorizedUsers={businessData?.authorizedUsers || []}
      />
      {/* )} */}
    </Container>
  );
};

export default DisplayBusiness;
