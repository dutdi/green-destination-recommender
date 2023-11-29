import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../helpers/Colors.js';
import { useData } from './DataContext';
import { calculateDistance } from '../helpers/Functions.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: Colors.gray2,
        color: Colors.white,
    },
    [`&.${tableCellClasses.body}`]: {
        padding: '10px 0',
        border: 0,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: Colors.gray,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const HoverableTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: Colors.gray,
        transition: 'background-color 0.3s ease',
    },
}));

const columns = [
    { id: 'image', label: '' },
    { id: 'destination', label: 'Destination' },
    { id: 'population', label: 'Population', sortable: true },
    { id: 'trend', label: 'Trend', sortable: true },
    { id: 'review_count', label: 'Reviews', sortable: true },
    { id: 'aqi_val', label: 'AQI', sortable: true },
    { id: 'distance', label: 'Distance' },
    { id: 'duration', label: 'Duration' },
    { id: 'details', label: 'Details' },
    { id: 'co2', label: 'CO2' },
];

const DestinationTable = () => {
    const { state } = useLocation();
    const { destinations, dataFetched } = useData();
    const fromDestination = JSON.parse(state.fromDestination);
    const toDestination = JSON.parse(state.toDestination);
    const [sortBy, setSortBy] = useState('population');
    const [sortOrder, setSortOrder] = useState('asc');

    const renderCell = (columnId, row) => {
        switch (columnId) {
            case 'image':
                return (
                    <TableCell
                        sx={{ width: '300px', height: '300px', textAlign: 'center', padding: '10px 0', position: 'relative', border: 0 }}
                    >
                        <img
                            src={require(`../media/misc/${row.to_id}.jpg`)}
                            alt={row.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        />
                    </TableCell>
                );
            case 'destination':
                return (
                    <StyledTableCell>
                        {row.toDestination.name}, {row.toDestination.country}
                    </StyledTableCell>
                );
            case 'population':
                const populationValue = parseInt(row.toDestination.population);
                return <StyledTableCell>{populationValue.toLocaleString('en-US')}</StyledTableCell>;
            case 'trend':
                const trendValue = row.toDestination.popularity.avg_trend_val;
                return <StyledTableCell>{parseFloat(trendValue)}</StyledTableCell>;
            case 'review_count':
                const reviewValue = parseInt(row.toDestination.popularity.review_count);
                return <StyledTableCell>{reviewValue.toLocaleString('en-US')}</StyledTableCell>;
            case 'aqi_val':
                const aqiValue = row.toDestination.aqi.aqi_val;
                return <StyledTableCell>{parseFloat(aqiValue)}</StyledTableCell>;
            case 'distance':
                const distanceValue = calculateDistance(fromDestination, row);
                return <StyledTableCell>{parseInt(distanceValue)} km</StyledTableCell>;
            case 'duration':
                const durationValueInSec = row.duration_sec || row.details?.duration_sec || '-1';
                return <StyledTableCell>{durationValueInSec}</StyledTableCell>;
            case 'co2':
                const co2Value = row.details ? row.details.co2_kg : (row.estd_emissions_osrm_gm / 1000).toFixed(2);
                return <TableCell sx={{ border: 0 }}>{co2Value} kg</TableCell>;

            case 'details':
                return row.details ? (
                    <StyledTableCell>
                        via Flight ✈️
                        <br />
                        {row.details.airline} <br />
                        {row.details.source_airport}-{row.details.destination_airport} <br />
                        {row.details.departure_time}-{row.details.arrival_time}
                    </StyledTableCell>
                ) : (
                    <StyledTableCell>by Driving 🚗</StyledTableCell>
                );

            default:
                return null;
        }
    };

    const handleSort = (columnId) => {
        const newOrder = sortBy === columnId && sortOrder === 'desc' ? 'asc' : 'desc';
        setSortBy(columnId);
        setSortOrder(newOrder);
    };

    const getRows = () => {
        const rows = [];
        if (toDestination) {
            const filteredDrivingConnections = fromDestination.connections_driving.filter((c) => c.to_id === toDestination.id);
            const filteredFlightConnections = fromDestination.connections_flight.filter((c) => c.to_id === toDestination.id);
            rows.push(...filteredDrivingConnections, ...filteredFlightConnections);
        } else {
            rows.push(...fromDestination.connections_driving, ...fromDestination.connections_flight);
        }

        rows.forEach((row) => {
            const toDest = destinations.miscDestinations.find((dest) => dest.id === row.to_id);
            row['toDestination'] = toDest;
        });

        return rows.sort((a, b) => {
            const order = sortOrder === 'desc' ? -1 : 1;
            switch (sortBy) {
                case 'population':
                    return order * (a['toDestination']['population'] - b['toDestination']['population']);
                case 'trend':
                    return order * (a['toDestination']['popularity']['avg_trend_val'] - b['toDestination']['popularity']['avg_trend_val']);
                case 'review_count':
                    return order * (a['toDestination']['popularity']['review_count'] - b['toDestination']['popularity']['review_count']);
                case 'aqi_val':
                    return order * (a['toDestination']['aqi']['aqi_val'] - b['toDestination']['aqi']['aqi_val']);
                default:
                    return order * (a[sortBy] - b[sortBy]);
            }
        });
    };

    const rows = getRows();

    return (
        dataFetched && (
            <Paper sx={{ p: { xs: 2, sm: 4, md: 8 } }}>
                <Typography
                    gutterBottom
                    variant='h5'
                    sx={{
                        mb: 4,
                        letterSpacing: '.2rem',
                        fontWeight: 'bold',
                    }}
                >
                    Recommendations based on your choice: {fromDestination.name}, {fromDestination.country}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                {columns.map((column) => (
                                    <StyledTableCell key={column.id} sortDirection={sortBy === column.id ? sortOrder : false}>
                                        {column.sortable ? (
                                            <TableSortLabel
                                                active={sortBy === column.id}
                                                direction={sortBy === column.id ? sortOrder : 'asc'}
                                                onClick={() => handleSort(column.id)}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        ) : (
                                            column.label
                                        )}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <HoverableTableRow key={index}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id}>{renderCell(column.id, row)}</TableCell>
                                        ))}
                                    </HoverableTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    );
};

export default DestinationTable;
