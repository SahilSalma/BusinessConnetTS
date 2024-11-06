import React from "react";
import { Box, Grid2 as Grid, IconButton, SxProps } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { ImageUploadProps } from "../Types/allTypes";

const ImageUpload: React.FC<ImageUploadProps> = ({
    imagePreviews,
    handleImageChange,
    handleRemoveImage,
    reviewUpload
}) => {

    const theme = useTheme();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            handleImageChange(Array.from(files));
        }
    };

    const cameraButtonCSS = reviewUpload ? {
        width: 120,
        height: 90,
        overflow: 'hidden',
        cursor: 'pointer',
    } : {
        width: 100,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        aspectRatio: "1/1",
        border: '0.1em solid',
        borderRadius: 2,
        cursor: "pointer",
    };

    const imagePreviewCSS: SxProps = reviewUpload ? {
        width: 120,
        height: 90,
        border: '0.1em solid',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
    } : {
        maxWidth: 100,
        maxHeight: 100,
        display: "flex",
        aspectRatio: "1/1",
        border: '0.1em solid',
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
    };

    const gridContainerCSS = reviewUpload ? { padding: '2em' } : { 
        
        maxWidth: 400,
        maxHeight: 400,
        marginLeft: '1em',
        overflow: 'scroll',
    };

    return (
        <Grid container spacing={1} sx={gridContainerCSS}>
            <Grid>
                <Box
                    sx={cameraButtonCSS}
                    component="label"
                >
                    <PhotoCamera sx={{ fontSize: "4rem" }} />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={handleFileChange}
                    />
                </Box>
            </Grid>
            {imagePreviews.map((imagePreviewUrl, index) => (
                <Grid key={index}>
                    <Box
                        sx={imagePreviewCSS}
                    >
                        <img
                            src={imagePreviewUrl}
                            alt={`Image Preview ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                            }}
                        />
                        <IconButton
                            sx={{
                                position: "absolute",
                                top: "0.1em",
                                right: "0.1em",
                                scale: 0.5,
                                backgroundColor: theme.palette.background.default,
                                "&:hover": {
                                    backgroundColor: theme.palette.error.main,
                                },
                            }}
                            onClick={() => handleRemoveImage(index)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageUpload;
