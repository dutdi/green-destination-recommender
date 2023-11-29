import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlightTableRow from './FlightTableRow.jsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const FlightTable = ({ connections }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 1 }}>
            <TableContainer sx={{ maxHeight: 300 }}>
                <Table aria-label='collapsible table' sx={{ borderCollapse: 'separate' }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>CO2 (kg)</StyledTableCell>
                            <StyledTableCell align='right'>Duration</StyledTableCell>
                            <StyledTableCell align='right'>Number of stops</StyledTableCell>
                            <StyledTableCell align='right'>Airline</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {connections.map((connection) => (
                            <FlightTableRow row={connection}></FlightTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default FlightTable;
