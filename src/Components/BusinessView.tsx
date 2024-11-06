import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Grid2 as Grid,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Divider,
  Fade,
  Button,
  Alert,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DoneIcon from '@mui/icons-material/Done';
import ImageDisplay from '../CommonComponents/ImageDisplay';
import Review from '../Components/Review';
import { useAuth } from '../Context/authContext';
import { Animations, Business, BusinessOffering } from '../Types/allTypes';
import { t } from 'i18next';
import { timeOptions } from '../Utils/Utils';
import { useTheme } from '@mui/material/styles';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { posts } from '../Redux/selectors';
import { Actions } from '../Redux/Reducer/rootReducer';
import { useLocation } from 'react-router-dom';
import Animation from '../CommonComponents/Animation';
import { countryList } from '../Utils/ConstantLists';
import Slider from '../CommonComponents/ImageSlider';

const BusinessView: React.FC<Business> = ({
  _id,
  name,
  photoUrls,
  email,
  phone,
  ratings,
  website,
  address: {
    isVirtualOnly,
    street,
    city,
    province,
    country,
  },
  hours,
  description,
  socialMedia,
  offerings,
}) => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setItemCopied({ ...itemCopied, [type]: true });
    setTimeout(() => {
      setItemCopied({ ...itemCopied, [type]: false });
    }, 2000);
  };

  const { user } = useAuth();
  const postDetails = useSelector(posts);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [itemCopied, setItemCopied] = useState({
    website: false,
    phone: false,
    email: false,
    address: false,
  });

  const address = {
    isVirtualOnly,
    street,
    city,
    province,
    country,
  }

  const virtualAddress: string = !isVirtualOnly ? `${street}, ` : ``;

  const selectedCountry = countryList.find(c => c._id === country);
  const countryString = selectedCountry ? selectedCountry?.name : country;

  const selectedProvince = selectedCountry?.provinces.find(p => p._id === province);
  const provinceString = selectedProvince ? selectedProvince.name : province;

  const addressString = virtualAddress + `${city}, ${provinceString}, ${countryString}`;
  const theme = useTheme();



  useEffect(() => {
    if (_id)
    dispatch(Actions.posts.getPostActions.request({
      businessId: _id,
      page: String(page),
    }));
  }, [page, _id]);


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

  const buildBusinessHoursAccordion = () => {
    return (
        <AccordionDetails>
            {hours && Object.keys(hours).map((day) => {
              if (typeof hours[day] === 'string') return null;
              return (
                <Grid container spacing={2} key={day} alignItems="center" sx={{marginBottom: 3 }}>
                    <Grid size={{ xs: 6 }}>
                        <Typography fontWeight={'bold'} variant="subtitle1">{t(day)}</Typography>
                    </Grid>
                    {hours[day].checked && (
                        <>
                            <Grid size={{ xs: 3 }}>
                              <Typography variant="subtitle1">{timeOptions.filter(
                                (time) => time._id === hours[day].start
                              )[0].name}</Typography>
                            </Grid>
                            <Grid size={{ xs: 3 }}>
                              <Typography variant="subtitle1">{timeOptions.filter(
                                (time) => time._id === hours[day].end
                              )[0].name}</Typography>
                            </Grid>
                        </>
                    )}
                    {!hours[day].checked && (
                        <>
                            <Grid size={{ xs: 3 }}>
                              <Typography variant="subtitle1">{t('closed')}</Typography>
                            </Grid>
                            <Grid size={{ xs: 3 }}>
                              <Typography variant="subtitle1">{t('closed')}</Typography>
                            </Grid>  
                        </>
                    )}
                </Grid>
            )})}
        </AccordionDetails>
    )
};

  const getListItem = (icon: JSX.Element, text: string, type: 'website' | 'phone' | 'email' | 'address') => {
    const noWrap = type === 'address' ? false : true;
    return (
      <ListItem>
        {icon}
        <Typography noWrap={noWrap} variant="subtitle1">{text}</Typography>
        <Tooltip title={`Copy ${type}`}>
          <IconButton onClick={() => copyToClipboard(text, type)}>
            {itemCopied[type] && <Fade in={itemCopied[type]}>
              <DoneIcon fontSize="small" />
            </Fade>}
            {!itemCopied[type] && <Fade in={!itemCopied[type]}>
              <ContentCopyIcon fontSize="small" />
            </Fade>}
          </IconButton>
        </Tooltip>
      </ListItem>
    );
  };

  const buildAccordion = (title: string, content: JSX.Element, size: {xs?: number, md?: number, lg?: number}) => {
    return (
      <Grid size={size}>
        <Accordion defaultExpanded elevation={4} sx={{ marginBottom: 1, backgroundColor: theme.palette.background.default}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{
            color: theme.palette.primary.contrastText
          }} />} sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText
          }}>
            <Typography variant="h6">{title}</Typography>
          </AccordionSummary>
          {content}
        </Accordion>
      </Grid>
    );
  };

  const buildContactInfo = () => {
    return (<AccordionDetails>
      {isVirtualOnly && <Alert severity="info">{t('virtualOnlyDisclaimer')}</Alert>}
      <List>
        {phone && getListItem(<PhoneIcon sx={{ mr: 1 }} />, phone, 'phone')}
        {email && getListItem(<EmailIcon sx={{ mr: 1 }} />, email, 'email')}
        {website && getListItem(<LanguageIcon sx={{ mr: 1 }} />, website, 'website')}
        {address && (
          <>
            {getListItem(<LocationOnIcon sx={{ mr: 1 }} />, addressString, 'address')}
            <iframe
              title="map"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-5_QawKUgD9_sKAm7SrZFzgXKMR3izok&q=Space+Needle,${encodeURIComponent(addressString)}`}
            />
          </>
        )}
      </List>
    </AccordionDetails>)
  };

  const buildOfferings = (items: BusinessOffering[]) => {
    return (
      <AccordionDetails sx={{maxHeight: 450, overflow:'scroll', }}>
      <List>
        {items.map((service, index) => {
          return (
          <ListItem key={index}>
            <Paper sx={{ p: 2, width: '100%' }}>
              <Grid container justifyContent="space-between">
                <Typography variant="h6" component="div">
                  {service.name}
                </Typography>
                {service.price?.value && <Typography fontWeight={'bold'} variant="subtitle1">
                  {service.price?.value} {service.price?.currency}
                </Typography>}
              </Grid>
              <br/>
              <Typography variant="body1">
                {service.description}
              </Typography>
              <Grid justifyContent="flex-end" display={'flex'}>
                <Button variant="text" sx={{ mt: 2 }}>
                  {t('sendRequest')}
                </Button>
              </Grid>
            </Paper>
            {index < offerings.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
          </ListItem>
        )})}
      </List>
    </AccordionDetails>
    );
  };

  const buildPosts = () => {
    return (
      <AccordionDetails ref={containerRef} sx={{ maxHeight: 1500, overflow: 'scroll' }}>
        {
          postDetails?.map((post, index) => {
            return (
              <Post
                key={index}
                {...post}
              />
            );
          })
        }
        {postDetails?.length === 0 && <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Animation size={{width: 200, height: 200}} animationData={Animations.NO_POSTS} />
          {<Typography variant="h6">{t('noBusinessPosts')}</Typography>}
        </Box>}
      </AccordionDetails>
    );
  };


  const buildSocialMedia = () => {
    const hasSocialMedia = socialMedia && Object.keys(socialMedia).length > 0;
    return hasSocialMedia && <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          {socialMedia?.facebook && <IconButton>
            <FacebookIcon fontSize='large' />
          </IconButton>}
          {socialMedia?.instagram && <IconButton>
            <InstagramIcon fontSize='large'/>
          </IconButton>}
          {socialMedia?.twitter && <IconButton onClick={() => window.open(socialMedia.twitter)}>
            <XIcon fontSize='large'/>
          </IconButton>}
          {socialMedia?.linkedin && <IconButton onClick={() => window.open(socialMedia.linkedin)}>
            <LinkedInIcon fontSize='large'/>
          </IconButton>}
          {socialMedia?.youtube && <IconButton onClick={() => window.open(socialMedia.youtube)}>
            <YouTubeIcon fontSize='large'/>
          </IconButton>}
      </Box>
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4} sx={{ flexDirection: 'row-reverse' }}>
          <Grid size={{xs: 12, lg: 6}}>
              <Typography variant="h3" component="h1" gutterBottom>
                {name}
              </Typography>
              <Rating name="read-only" value={ratings.value} precision={0.1} readOnly sx={{ marginBottom: '2em' }} />
              <Typography variant="body1">
                {description}
              </Typography>
              {buildSocialMedia()}
            </Grid>
            <Grid size={{xs: 12, lg: 6}}>
              <Slider images={photoUrls} />
            </Grid>
            <Grid size={{xs: 12, lg: 6}}>
              <Grid container spacing={2}>
                {
                  offerings && offerings.length > 0 && (offerings.filter(item => item.type === 'service')).length > 0 && (
                    buildAccordion('Services', buildOfferings(offerings.filter(item => item.type === 'service')), {xs: 12})
                  )
                }
                {
                  offerings && offerings.length > 0 && (offerings.filter(item => item.type === 'product')).length > 0 && (
                    buildAccordion('Products', buildOfferings(offerings.filter(item => item.type === 'product')), {xs: 12})
                  )
                }
                {buildAccordion('Contact Information', buildContactInfo(), {xs: 12})}
                {hours && buildAccordion('Hours of Operation', buildBusinessHoursAccordion(), {xs: 12})}
              </Grid>
            </Grid>
            {buildAccordion('Posts', buildPosts(), {xs: 12, lg: 6})}
            <Grid size={{xs: 12, lg: 12}}>
              <Review businessId={_id} userId={user?._id ?? ''} />
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BusinessView;
