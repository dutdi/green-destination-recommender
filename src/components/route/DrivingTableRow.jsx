import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { formatDuration } from '../../helpers/Functions.js';

const DrivingTableRow = ({ row }) => {
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'> {row.co2_kg}</TableCell>
                <TableCell align='center'>{row.distance_km}</TableCell>
                <TableCell align='center'>{formatDuration(row.duration_sec)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default DrivingTableRow;
