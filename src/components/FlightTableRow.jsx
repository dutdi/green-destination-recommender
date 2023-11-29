import React, { useState } from 'react';
import { Box, Collapse, IconButton, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const FlightTableRow = ({ row }) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.details.co2_kg}
                </TableCell>
                <TableCell align='right'>{row.details.duration_str}</TableCell>
                <TableCell align='right'>{row.details.no_of_stops}</TableCell>
                <TableCell align='right'>{row.details.airline}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='body2' fontWeight='bold' gutterBottom component='div'>
                                Details
                            </Typography>
                            <Table size='small' aria-label='details'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Departure airport</TableCell>
                                        <TableCell>Destination airport</TableCell>
                                        <TableCell align='right'>Departure time</TableCell>
                                        <TableCell align='right'>Arrival time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component='th' scope='row'>
                                            {row.details.source_airport}
                                        </TableCell>
                                        <TableCell>{row.details.destination_airport}</TableCell>
                                        <TableCell align='right'>{row.details.departure_time}</TableCell>
                                        <TableCell align='right'>{row.details.arrival_time}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default FlightTableRow;
