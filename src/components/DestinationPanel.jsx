import React, { useState } from 'react';
import {
    Box,
    Dialog,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Rating,
} from '@mui/material';
import { Colors } from '../helpers/Colors.js';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const DestinationPanel = ({ destination, onClose }) => {
    const [userRating, setUserRating] = useState(0);
    const [open, setOpen] = useState(true);

    const handleRatingChange = (event, newValue) => {
        setUserRating(newValue);
    };

    const handleClose = () => {
        if (userRating !== 0) {
            destination.avgRating = (destination.avgRating * destination.numOfRatings + userRating) / (destination.numOfRatings + 1);
            destination.numOfRatings += 1;
        }
        setOpen(false);
        onClose();
    };

    return (
        <Dialog open={open} maxWidth={false}>
            <Box p={3} sx={{ textAlign: 'center' }}>
                <img
                    src={destination.imgPath}
                    alt={destination.name}
                    style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'cover',
                        marginBottom: '16px',
                        borderRadius: '8px',
                    }}
                />
                <Typography variant='h6' sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                    {destination.name}
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '14px', marginBottom: '12px' }} gutterBottom>
                    {destination.description}
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Climate</TableCell>
                                <TableCell align='center'>Biodiversity</TableCell>
                                <TableCell align='center'>Geography</TableCell>
                                <TableCell align='center'>Transport</TableCell>
                                <TableCell align='center'>Amenity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>
                                    {destination.weatherPatterns.map((pattern) => (
                                        <div
                                            key={pattern.text}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {pattern.icon}
                                            {pattern.text}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align='center'>
                                    <div
                                        key={destination.biodiversity.text}
                                        style={{ color: destination.biodiversity.color, fontWeight: 700 }}
                                    >
                                        {destination.biodiversity.text}
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    {destination.geographies.map((geo) => (
                                        <div
                                            key={geo.text}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {geo.icon}
                                            {geo.text}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align='center'>
                                    {destination.transports.map((transport) => (
                                        <div
                                            key={transport.text}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {transport.icon}
                                            {transport.text}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align='center'>
                                    {destination.amenities.map((amenity) => (
                                        <div
                                            key={amenity.text}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {amenity.icon}
                                            {amenity.text}
                                        </div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box mt={3}>
                    <Typography variant='body1' gutterBottom>
                        How is the recommendation?
                    </Typography>
                    <Rating
                        name='user-rating'
                        value={userRating}
                        precision={0.5}
                        onChange={handleRatingChange}
                        size='large'
                        emptyIcon={<StarBorderIcon fontSize='inherit' sx={{ color: Colors.green }} />}
                    />
                </Box>

                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClose}
                    style={{
                        marginTop: '16px',
                    }}
                >
                    {userRating !== 0 ? 'Save' : 'Close'}
                </Button>
            </Box>
        </Dialog>
    );
};

export default DestinationPanel;
