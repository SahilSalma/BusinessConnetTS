import React, { useState, ChangeEventHandler, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container, TextField, Button, Grid2 as Grid, Typography, MenuItem,
    Checkbox, FormControlLabel, Accordion, AccordionSummary,
    AccordionDetails, Alert,
    Paper,
    Chip,
    Snackbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../Context/authContext';
import { useTheme } from '@mui/material/styles';
import ImageUpload from '../CommonComponents/ImageUpload';
import { useTranslation } from 'react-i18next';
import { AccordianFieldInfoType, BusinessFormProps, Business, BusinessOffering, listSelectFieldType, listTextFieldType, Subcategory } from '../Types/allTypes';
import { businessTagOptions, countryList, currencyList } from '../Utils/ConstantLists';
import MultiSelectTags from '../CommonComponents/Tags';
import { emailRegex, timeOptions } from '../Utils/Utils';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBusiness, addBusinessLoading, businesses, categories as categoriesList } from '../Redux/selectors';
import { Actions } from '../Redux/Reducer/rootReducer';
import { deleteMultipleImages, uploadMultipleImages } from '../Utils/CloudCalls';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';

const EditBusiness: React.FC<BusinessFormProps> = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isLoading = useSelector(addBusinessLoading);
    const isUpdateSuccess = useSelector(addBusiness);
    const businessDataList = useSelector(businesses);
    const { businessId } = useParams<{ businessId: string }>();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Business>({
        _id: '',
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            province: '',
            postalCode: '',
            isVirtualOnly: false,
            country: ''
        },
        photoUrls: [],
        website: '',
        category: {
            _id: '',
            name: '',
            image: '',
            description: '',
            numBusiness: 0,
            subcategories: [],
        },
        listingUserId: '',
        subcategory: {
            _id: '',
            name: '',
            description: '',
            parentCategory: '',
            numBusiness: 0,
        },
        description: '',
        hours: {
            monday: { checked: true, start: '18', end: '34' },
            tuesday: { checked: true, start: '18', end: '34' },
            wednesday: { checked: true, start: '18', end: '34' },
            thursday: { checked: true, start: '18', end: '34' },
            friday: { checked: true, start: '18', end: '34' },
            saturday: { checked: false, start: '18', end: '34' },
            sunday: { checked: false, start: '18', end: '34' }
        },
        ratings: {
            value: 0,
            reviewCount: 0
        },
        tags: [],
        offerings: [],
        socialMedia: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            youtube: '',
        },
        authorizedUsers: [],
    });

    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        message: string;
        severity: 'info' | 'success' | 'error';
    }>({
        open: false,
        message: "",
        severity: 'info'
    });

    const handleCloseAlert = () => {
        setAlertInfo({ ...alertInfo, open: false });
    };

    const showAlert = (message: string, severity: 'info' | 'success' | 'error') => {
        setAlertInfo({ open: true, message, severity });
        setTimeout(() => {
            handleCloseAlert();
        }, 6000);
    };

    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const categories = useSelector(categoriesList);
    const [subCategories, setSubCategories] = useState<Subcategory[]>([]);

    const handleImageChange = (files: File[]) => {
        const newImages = [...images];
        const newImagePreviews = [...imagePreviews];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(file);
                newImagePreviews.push(reader.result as string);
                setImages(newImages);
                setImagePreviews(newImagePreviews);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        const deletedImageUrl = imagePreviews[index];
        if (deletedImageUrl.startsWith('https://')) {
            const index = deletedImageUrl.indexOf('/', deletedImageUrl.indexOf('://') + 3) + 1;
            const imageName = deletedImageUrl.slice(index);
            setDeletedImages([...deletedImages, imageName]);
        }
        const newImages = images.filter((_, i) => i !== index);
        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        const newPhotoUrls = formData.photoUrls.filter(url => url !== deletedImageUrl);
        setFormData({
            ...formData,
            photoUrls: newPhotoUrls,
        });
        setImages(newImages);
        setImagePreviews(newImagePreviews);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [name]: value,
            }
        });
    }

    const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            socialMedia: {
                ...formData.socialMedia,
                [name]: value,
            }
        });
    };

    const handleOfferingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        if (index === undefined) return;
        const { name, value } = e.target;
        const newOfferings = [...formData.offerings];
        newOfferings[index] = {
            ...newOfferings[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            offerings: newOfferings,
        });
    }

    const handleHoursChange = (day: string, field: 'checked' | 'start' | 'end', value: boolean | string) => {
        if (!formData.hours) return;
        setFormData({
            ...formData,
            hours: {
                ...formData.hours,
                [day]: {
                    ...formData.hours?.[day],
                    [field]: value,
                },
            },
        });
    };

    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = -100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };


    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.category || !formData.subcategory || !formData.description) {
            showAlert('Please fill in all required fields', 'error');
            return false;
        }
        // const phoneRegex = /^\d{10}$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Please enter a valid email', 'error');
            return false;
        }
        // if (!phoneRegex.test(formData.phone)) {
        //     showAlert('Please enter a valid phone number', 'error');
        //     return false;
        // }
        if (!formData.address?.isVirtualOnly && (!formData.address?.street || !formData.address?.city || !formData.address?.province || !formData.address?.postalCode || !formData.address?.country)) {
            showAlert('Please fill in all required fields', 'error');
            return false;
        }
        if (formData.offerings.length === 0) {
            showAlert('Please add at least one offering', 'error');
            return false;
        }
        if (imagePreviews.length === 0) {
            showAlert('Please upload at least one image', 'error');
            return false;
        }

        return true;
    };

    const checkAuthorization = (business: Business) => {
        if (user?.email && business?.authorizedUsers.includes(user.email)) return;
        if (business.listingUserId === user?._id) return;
        showAlert('You are not authorized to edit this business', 'error');
        navigate('/unauthorized');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (deletedImages.length > 0) {
            await deleteMultipleImages(deletedImages);
            setDeletedImages([]);
        }
        const newImages = images.filter((image) => image instanceof File && image.size > 0);
        const imageUrls = await uploadMultipleImages(newImages);
        setImages(Array(imagePreviews.length).fill(new File([], '')));
        dispatch(Actions.business.business.editBusinessActions.request({ businessData: {
            ...formData,
            photoUrls: [...formData.photoUrls, ...imageUrls],
        }}));
        if (!isLoading && isUpdateSuccess) {
            showAlert('Business updated successfully', 'success');
        } else if (!isLoading && !isUpdateSuccess) {
            showAlert('Error updating business', 'error');
        }
    };

    const handleAddAuthorizedUser = () => {
        const email = (document.getElementById('memberEmail') as HTMLInputElement).value;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email', 'error');
            return;
        }
        if (email && formData.authorizedUsers && !formData.authorizedUsers.includes(email)) {
            setFormData({
                ...formData,
                authorizedUsers: [...formData.authorizedUsers, email]
            });
        }
        (document.getElementById('memberEmail') as HTMLInputElement).value = '';
    };

    useEffect(() => {
        let id = businessId;
        if (id) {
            const business = businessDataList?.find((business) => business._id === id);
            if (business) {
                checkAuthorization(business);
            }
            const subcategoryList = categories?.find((cat) => cat._id === business?.category._id)?.subcategories;
            setSubCategories(subcategoryList || []);
            if (business) {
                setFormData({
                    _id: business._id,
                    name: business.name,
                    email: business.email,
                    phone: business.phone,
                    address: business.address || {
                        street: '',
                        city: '',
                        province: '',
                        postalCode: '',
                        isVirtualOnly: false,
                        country: ''
                    },
                    photoUrls: business.photoUrls,
                    website: business.website,
                    category: business.category,
                    subcategory: business.subcategory,
                    description: business.description,
                    listingUserId: business.listingUserId,
                    hours: business.hours || {
                        monday: { checked: true, start: '18', end: '34' },
                        tuesday: { checked: true, start: '18', end: '34' },
                        wednesday: { checked: true, start: '18', end: '34' },
                        thursday: { checked: true, start: '18', end: '34' },
                        friday: { checked: true, start: '18', end: '34' },
                        saturday: { checked: false, start: '18', end: '34' },
                        sunday: { checked: false, start: '18', end: '34' }
                    },
                    ratings: business.ratings,
                    tags: business.tags,
                    offerings: business.offerings || [],
                    socialMedia: business.socialMedia,
                    authorizedUsers: business.authorizedUsers || [],
                });

                setDeletedImages([]);
                setImages(new Array(business.photoUrls.length).fill(new File([], '')));
                setImagePreviews(business.photoUrls);
            }
        }
    }, []);

    const getTextField = (textFieldInfo: listTextFieldType) => {
        const { gridSize, isDisabled, name, display, labelName, value, onChange, isRequired, isMultiline } = textFieldInfo;
        const adornment = <Typography variant="body1" sx={{ marginRight: 1, color: 'text.disabled' }}>{display ? display : ''}</Typography>;
        return (
            <Grid size={gridSize}>
            <TextField
                disabled={isDisabled}
                required={isRequired}
                label={t(labelName)}
                name={name || labelName}
                fullWidth
                value={value}
                multiline={isMultiline}
                rows={isMultiline ? 4 : 1}
                onChange={onChange}
                sx={{
                    '& .MuiInputBase-input': {
                        textAlign: display ? 'right' : 'left',
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: display ? adornment : undefined,
                    },
                }}
            />
            </Grid>
        );
    };

    const getDropdownField = (dropdownFieldInfo: listSelectFieldType) => {
        const { gridSize, labelName, value, optionsList, isRequired, selectValue, onChange } = dropdownFieldInfo;
        return (<Grid size={gridSize}>
            <TextField
                required={isRequired}
                select={selectValue}
                label={t(labelName)}
                name={labelName}
                fullWidth
                value={value}
                onChange={onChange}
            >
                {optionsList?.map((option) => (
                    <MenuItem
                        sx={{ height: '3em', borderBottom: '.02em solid #bbb' }}
                        key={option._id}
                        value={option._id}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>)
    };

    const getAccordionField = (accordionInfo: AccordianFieldInfoType) => {
        const { title, fields, accordionDetails, isOptional } = accordionInfo;
        const hasAccordionDetails = accordionDetails ? true : false;
        return (
            <Grid size={{ xs: 12 }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {!isOptional && <Typography variant="h6">{t(title)}</Typography>}
                        {isOptional && <Typography variant="h6">{t(title)} ({t('optional')})</Typography>}
                    </AccordionSummary>
                    {!hasAccordionDetails && <AccordionDetails>
                        <Grid container spacing={2}>
                            {fields && fields.map(
                                (textFieldInfo) => getTextField(textFieldInfo))
                            }
                        </Grid>
                    </AccordionDetails>}
                    {hasAccordionDetails && accordionDetails}
                </Accordion>
            </Grid>
        );
    };

    const buildBusinessHoursAccordion = () => {
        return (
            <AccordionDetails>
                {formData.hours && Object.keys(formData.hours).map((day) => (
                    <Grid container spacing={2} key={day} alignItems="center" sx={{ marginLeft: 3, marginBottom: 3 }}>
                        <Grid size={{ xs: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.hours?.[day].checked}
                                        onChange={(e) => handleHoursChange(day, 'checked', e.target.checked)}
                                    />
                                }
                                label={t(day)}
                            />
                        </Grid>
                        {formData.hours?.[day].checked && (
                            <>
                                {getDropdownField(
                                    {
                                        gridSize: { xs: 4 },
                                        labelName: 'start',
                                        value: formData.hours[day].start,
                                        optionsList: timeOptions,
                                        isRequired: false,
                                        selectValue: true,
                                        onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                                            let value = e.target.value as string;
                                            if (formData.hours) {
                                                formData.hours[day].start = value;
                                            }
                                            setFormData({ ...formData });
                                        }
                                    }
                                )}
                                {getDropdownField(
                                    {
                                        gridSize: { xs: 4 },
                                        labelName: 'end',
                                        value: formData.hours[day].end,
                                        optionsList: timeOptions,
                                        isRequired: false,
                                        selectValue: true,
                                        onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                                            let value = e.target.value as string;
                                            if (formData.hours) {
                                                formData.hours[day].end = value;
                                            }
                                            setFormData({ ...formData });
                                        }
                                    }
                                )}
                            </>
                        )}
                    </Grid>
                ))}
            </AccordionDetails>
        )
    };

    const buildOfferGrid = (index: number) => {
        const handleRemoveOffering = () => {
            if (formData.offerings.length === 1) {
                showAlert('At least one offering is required', 'error');
                return;
            }
            setFormData({
                ...formData,
                offerings: formData.offerings.filter((_, i) => i !== index)
            });
        };

        return (<Paper elevation={3} sx={{ padding: '1em', marginBottom: '1em' }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: '1em', fontWeight: 'bold' }}>
                        {t('type')}
                    </Typography>
                </Grid>
                {getDropdownField(
                    {
                        gridSize: { xs: 6 },
                        labelName: 'type',
                        value: formData.offerings[index].type,
                        optionsList: [
                            { _id: 'product', name: t('product') },
                            { _id: 'service', name: t('service') }
                        ],
                        isRequired: true,
                        selectValue: true,
                        onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                            formData.offerings[index].type = e.target.value as string;
                            setFormData({ ...formData });
                        }
                    }
                )}
                {getTextField({ gridSize: { xs: 6 }, labelName: 'name', value: formData.offerings[index].name, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleOfferingChange(e, index), isRequired: true })}
                {getTextField({ display: currencyList.find((currency) => currency._id === formData.offerings[index]?.price?.currency)?.symbol || '$', 
                    gridSize: { xs: 3 }, labelName: 'price', value: formData.offerings[index].price?.value || '', onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        let newPrice = {
                            currency: formData.offerings[index]?.price?.currency || 'CAD',
                            value: e.target.value
                        };
                        formData.offerings[index].price = newPrice;
                        setFormData({ ...formData });
                    }, isRequired: false })}
                {getDropdownField(
                    {
                        gridSize: { xs: 3 },
                        labelName: 'currency',
                        value: formData.offerings[index]?.price?.currency || '',
                        optionsList: currencyList,
                        isRequired: false,
                        selectValue: true,
                        onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                            let newPrice = {
                                currency: e.target.value as string,
                                value: formData.offerings[index]?.price?.value || ''
                            }
                            formData.offerings[index].price = newPrice;
                            setFormData({ ...formData });
                        }
                    }
                )}
                {getTextField({ gridSize: { xs: 12 }, labelName: 'description', value: formData.offerings[index].description, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleOfferingChange(e, index), isRequired: true, isMultiline: true })}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={handleRemoveOffering}
                        color='error'
                    >
                        {t('removeOffering')}
                    </Button>
                </Grid>
            </Grid>
        </Paper>)
    };

    const buildOfferingsAccordion = () => {
        return <AccordionDetails id="offerings">
            {formData.offerings?.map((offering, index) => buildOfferGrid(index))}
            <Grid container>
                <Grid size={{ xs: 6 }}>
                    <Button
                        variant="outlined"                            
                        onClick={() => setFormData({
                            ...formData,
                            offerings: [
                                ...formData.offerings,
                                {
                                    type: '',
                                    name: '',
                                    price: {
                                        currency: 'CAD',
                                        value: ''
                                    },
                                    description: '',
                                }
                            ]
                        })}
                    >
                        {t('addOffering')}
                    </Button>
                </Grid>
                <Grid size={{ xs: 6 }} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        color='error'
                        variant="outlined"
                        onClick={() => {setFormData({
                            ...formData,
                            offerings: [{
                                type: '',
                                name: '',
                                price: {
                                    currency: 'CAD',
                                    value: ''
                                },
                                description: '',
                            }]
                        })
                        scrollToId('offerings')
                        }
                    }>
                        {t('removeAllOfferings')}
                    </Button>
                </Grid>
            </Grid>
        </AccordionDetails>

    };

    const buildAddressAccordion = () => {
        const virtualValidFields = ['city', 'province', 'country'];
        return (
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox checked={formData.address?.isVirtualOnly} onChange={
                            (e) => setFormData({ ...formData, address: { ...formData.address, isVirtualOnly: e.target.checked } })
                        } />
                        <Typography variant="subtitle1">
                            {t('isVirtualOnlyText')}
                        </Typography>
                    </Grid>
                    {addressFields.map(
                        (textFieldInfo) => {
                            if (formData.address?.isVirtualOnly && virtualValidFields.includes(textFieldInfo.labelName)) {
                                return getTextField(textFieldInfo);
                            } else if (!formData.address?.isVirtualOnly) {
                                return getTextField(textFieldInfo);
                            }
                        })
                    }
                    {getDropdownField(
                        {
                            gridSize: { xs: formData.address?.isVirtualOnly ? 12 : 6 },
                            labelName: 'country',
                            value: formData.address?.country,
                            optionsList: countryList,
                            isRequired: false,
                            selectValue: true,
                            onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                                setFormData({
                                    ...formData,
                                    address: {
                                        ...formData.address,
                                        country: e.target.value as string
                                    }
                                });
                            }
                        }
                    )}
                </Grid>
            </AccordionDetails>
        );
    };

    const handleTagClick = (tag: string) => {    
        setFormData({
            ...formData,
            tags: formData.tags.includes(tag) ? formData.tags.filter((t) => t !== tag) : [...formData.tags, tag],
        });
    };

    const buildTagsAccordion = () => {
        return (
            <AccordionDetails>
                <MultiSelectTags 
                    options={businessTagOptions}
                    selectedTags={formData.tags}
                    handleTagClick={handleTagClick}
                />
            </AccordionDetails>
        );
    };

    const buildAccessControl = () => {
        return (
            <AccordionDetails>
                <Grid container spacing={2} alignItems={'center'} display={'flex'}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h6">
                            {t('accessControlText')}
                        </Typography>
                        <Typography variant="subtitle1">
                            {t('accessControlSubText')}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 8, lg: 9 }} sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <TextField
                            id='memberEmail'
                            label={t('memberEmail')}
                            name='memberEmail'
                            fullWidth
                            sx={{ mr: 2}}
                        />
                    </Grid>
                    <Grid size={{ xs: 4, lg: 3 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Button variant="contained" onClick={handleAddAuthorizedUser}>
                            {t('addMember')}
                        </Button>
                    </Grid>
                    {formData.authorizedUsers && formData.authorizedUsers.length > 0 && 
                        formData.authorizedUsers.map((authUser) => {
                            if (authUser === user?.email) return;
                            return (
                                <Chip
                                    label={authUser}
                                    onClick={() => { }}
                                    onDelete={() => {
                                        setFormData({
                                            ...formData,
                                            authorizedUsers: formData.authorizedUsers.filter((u) => u !== authUser)
                                        });
                                    }}
                                />
                        )})
                    }
                </Grid>
            </AccordionDetails>
        )
    };


    const initialTextFields = [
            { gridSize: { xs: 12 }, labelName: 'businessName', value: formData.name || '', onChange: handleChange, isRequired: true, isDisabled: true },
            { gridSize: { xs: 12 }, labelName: 'email', value: formData.email || '', onChange: handleChange, isRequired: true, isDisabled: true },
            { gridSize: { xs: 12 }, labelName: 'phone', value: formData.phone || '', onChange: handleChange, isRequired: true, isDisabled: true },
            { gridSize: { xs: 12 }, labelName: 'website', value: formData.website || '', onChange: handleChange, isRequired: false }
        ];

    const addressFields = [
            { gridSize: { xs: 12 }, labelName: 'street', value: formData.address?.street || '', onChange: handleAddressChange, isRequired: true },
            { gridSize: { xs: 6 }, labelName: 'city', value: formData.address?.city || '', onChange: handleAddressChange, isRequired: true },
            { gridSize: { xs: 6 }, labelName: 'province', value: formData.address?.province || '', onChange: handleAddressChange, isRequired: true },
            { gridSize: { xs: 6 }, labelName: 'postalCode', value: formData.address?.postalCode || '', onChange: handleAddressChange, isRequired: true },
        ];

    const socialMediaFields = [
            { gridSize: { xs: 6 }, labelName: 'facebook', value: formData.socialMedia?.facebook || '', onChange: handleSocialMediaChange, isRequired: false },
            { gridSize: { xs: 6 }, labelName: 'instagram', value: formData.socialMedia?.instagram || '', onChange: handleSocialMediaChange, isRequired: false },
            { gridSize: { xs: 6 }, labelName: 'twitter', value: formData.socialMedia?.twitter || '', onChange: handleSocialMediaChange, isRequired: false },
            { gridSize: { xs: 6 }, labelName: 'linkedin', value: formData.socialMedia?.linkedin || '', onChange: handleSocialMediaChange, isRequired: false },
            { gridSize: { xs: 6 }, labelName: 'youtube', value: formData.socialMedia?.youtube || '', onChange: handleSocialMediaChange, isRequired: false },
        ];

    const accordions = [
        { title: 'address', accordionDetails: buildAddressAccordion(), isOptional: false },
        { title: 'offerings', accordionDetails: buildOfferingsAccordion(), isOptional: false },
        { title: 'socialMedia', fields: socialMediaFields, isOptional: true },
        { title: 'businessHours', accordionDetails: buildBusinessHoursAccordion(), isOptional: true },
        { title: 'tags', accordionDetails: buildTagsAccordion(), isOptional: true },
        { title: 'Access Control', accordionDetails: buildAccessControl(), isOptional: true }
    ];

    return (
        <>
        <LoadingOverlay isLoading={isLoading} />
        <Container maxWidth="md" sx={{ marginTop: '5em' }}>
            <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert severity={alertInfo.severity}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', margin: '3rem' }}>
                {t('editBusinessTitle')}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <Grid container spacing={4}>
                            {initialTextFields.map(
                                (textFieldInfo) => getTextField(textFieldInfo))
                            }
                            {getDropdownField(
                                {
                                    gridSize: { xs: 12 },
                                    labelName: 'category',
                                    value: formData.category._id,
                                    optionsList: categories || [],
                                    isRequired: true,
                                    selectValue: true,
                                    onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                                        const category = categories?.find((cat) => cat._id === e.target.value);
                                        setFormData({
                                            ...formData,
                                            category: category || { _id: '', name: '', image: '', description: '', numBusiness: 0, subcategories: [] },
                                        });
                                        setSubCategories(category?.subcategories || []);
                                    }
                                }
                            )}
                            {formData.category && getDropdownField(
                                {
                                    gridSize: { xs: 12 },
                                    labelName: 'subCategory',
                                    value: formData.subcategory._id,
                                    optionsList: subCategories || [],
                                    isRequired: true,
                                    selectValue: true,
                                    onChange: (e: React.ChangeEvent<{ value: unknown }>) => {
                                        const subcategory = subCategories.find((subcat) => subcat._id === e.target.value);
                                        setFormData({
                                            ...formData,
                                            subcategory: subcategory || { _id: '', name: '', description: '', parentCategory: '', numBusiness: 0 },
                                        });
                                    }
                                }
                            )}
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <ImageUpload
                            imagePreviews={imagePreviews}
                            handleImageChange={handleImageChange}
                            handleRemoveImage={handleRemoveImage}
                            reviewUpload={false}
                        />
                    </Grid>

                    {getTextField({ gridSize: { xs: 12 }, labelName: 'description', value: formData.description, onChange: handleChange, isRequired: true, isMultiline: true })}
                    {accordions.map(
                        (accordionInfo) => getAccordionField(accordionInfo)
                    )}
                    

                    <Grid size={{ xs: 12 }} sx={{display:'flex', justifyContent: 'flex-end'}}>
                        <Button sx={{ width: '50%', marginBottom: '2em' }} variant="outlined" type="submit">
                            {t('submitEdit')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        </>
    );
};

export default EditBusiness;
