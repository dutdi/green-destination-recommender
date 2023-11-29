import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import DrivingTableRow from './DrivingTableRow.jsx';
import { Colors } from '../helpers/Colors.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: Colors.red,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const DrivingTable = ({ connections }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 1 }}>
            <TableContainer sx={{ maxHeight: 300 }}>
                <Table aria-label='collapsible table' sx={{ borderCollapse: 'separate' }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>CO2 (kg) 🍀</StyledTableCell>
                            <StyledTableCell align='right'>CO2 OSRM (kg) 🍀</StyledTableCell>
                            <StyledTableCell align='right'>Distance (km) 🛣️</StyledTableCell>
                            <StyledTableCell align='right'>Duration ⏱️</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {connections.map((connection) => (
                            <DrivingTableRow key={connection.to_id} row={connection}></DrivingTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default DrivingTable;
