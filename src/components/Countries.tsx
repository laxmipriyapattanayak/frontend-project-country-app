import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { sorting, reset, markFavorite } from '../features/countrySlice';
import { Link} from 'react-router-dom';

const Countries = (props: any) => {
    const {countriesData} = props;

    interface Country {
        id: number;
        cca3: string;
        flags: { png: string; alt: string};
        name: {common: string};
        region: string;
        population: number;
        languages?: { [key: string]: string };
        isFav: boolean;
    }
    const dispatch = useDispatch();
    const [isSort,setIsSort] = useState(false)

    const handleFav = (index: any) => {
        dispatch(markFavorite(index))
    }

    const handleSort = () => {
        setIsSort(isSort ? false : true)
        if(isSort) {
            dispatch(reset())
        } else {
            dispatch(sorting(countriesData))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Flag</TableCell>
                        <TableCell align="center" onClick={handleSort}>Name<ArrowDropUpIcon/></TableCell>
                        <TableCell align="center">Region</TableCell>
                        <TableCell align="center">Population</TableCell>
                        <TableCell align="center">Languages</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countriesData && countriesData.map((country: Country)=> {
                        return (
                            <TableRow
                                key={country.cca3}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                                </TableCell>
                                <TableCell align="center">{country?.name?.common}</TableCell>
                                <TableCell align="center">{country?.region}</TableCell>
                                <TableCell align="center">{country?.population}</TableCell>
                                <TableCell align="justify">
                                    <ul>
                                        { country.languages && Object.values(country?.languages).map((lang: string)=><li key={lang}>{lang}</li>) }
                                    </ul>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="large"
                                        aria-label="change me"
                                        color={ country.isFav ? "error" : "info" }
                                        onClick={() => handleFav(country.cca3)}>
                                            <FavoriteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={"/country/"+country.name.common}>
                                        <IconButton
                                            size="large"
                                            aria-label="change me"
                                            color="inherit">
                                                <NavigateNextIcon/>
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Countries