import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../features/favoriteSlice'

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

const Countries2 = (props: any) => {
    const {countriesData} = props;

    interface Country {
        flags: { png: string; alt: string};
        name: {common: string};
        region: string;
        population: number;
        languages?: { [key: string]: string };
    }
    
    const { favoriteValue } = useSelector((state:any)=>state.favorite);
    const dispatch = useDispatch();

    const handleFav = (index: number,country: Country) => {
        dispatch(update({index: index,country: country}))
    }

   

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Flag</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Region</TableCell>
                        <TableCell align="center">Population</TableCell>
                        <TableCell align="center">Languages</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countriesData && countriesData.map((country: Country, index: number)=> {
                        return (
                            <TableRow
                                key={index}
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
                                        color={ favoriteValue[index]?.fav ? "error" : "default" }
                                        onClick={() => handleFav(index, country)}>
                                            <FavoriteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                <IconButton
                                    size="large"
                                    aria-label="change me"
                                    color="inherit">
                                        <NavigateNextIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Countries2