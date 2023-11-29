import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { formatDuration } from '../helpers/Functions.js';

const DrivingTableRow = ({ row }) => {
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component='th' scope='row'>
                    {row.estd_emissions_gm.toLocaleString('en-US')}
                </TableCell>
                <TableCell align='right'>{row.estd_emissions_osrm_gm.toLocaleString('en-US')}</TableCell>
                <TableCell align='right'>{parseInt(row.dist_km)}</TableCell>
                <TableCell align='right'>{formatDuration(row.duration_sec)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default DrivingTableRow;
