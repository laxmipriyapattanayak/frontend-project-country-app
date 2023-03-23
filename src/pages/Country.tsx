import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { countrySearchByName } from '../features/countrySlice';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));


const Country = () => {
  let { name } = useParams();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }; 

  useEffect(() => {
    dispatch(countrySearchByName(name)); 
  },[dispatch, name]);

  const { countriesData, loading } = useSelector((state:any)=>state.country);
  const country = countriesData[0];
  return (
    <div style={{ display:'flex', justifyContent:'center',marginTop:'2rem' }}>
      {loading ? <CircularProgress/> : (
        <Card sx={{ maxWidth: 345,alignItems:'center'}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="country">
                {country?.name?.common?.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={country?.name?.common}
            subheader={country?.capital[0]}
          />
          <CardMedia
            component="img"
            height="194"
            image={country?.flags['png']}
            alt={country?.flags['alt']}
          />
          <CardContent>
            <Typography variant="body2" >
              This country belong to <span className='label'>{country?.region}</span> region and <span className='label'>{country?.subregion}</span> sub-region.
              Located at the <span className='label'>{country?.latlng[0]}°N</span> and <span className='label'>{country?.latlng[0]}°W</span>, this country has population of <span className='label'>{country?.population}</span> and it has gained the independent, acording to CIA World Factbook.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Link to="/countries">
              <IconButton aria-label="add to favorites">
                <NavigateBeforeIcon />
              </IconButton>
            </Link>
            <IconButton aria-label="share">
              <Link to={country.maps.googleMaps}>
              <LocationOnIcon/>
              </Link>
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
        </CardContent>
        </Collapse>
        </Card>
      )}
    </div>
  )
}

export default Country