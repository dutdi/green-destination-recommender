import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { formatDuration } from '../helpers/Functions.js';

const DrivingTableRow = ({ row }) => {
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'> {parseInt(row.estd_emissions_osrm_gm)}</TableCell>
                <TableCell align='center'>{parseInt(row.dist_km)}</TableCell>
                <TableCell align='center'>{formatDuration(row.duration_sec)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default DrivingTableRow;
