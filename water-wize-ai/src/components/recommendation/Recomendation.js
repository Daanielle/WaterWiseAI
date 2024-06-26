import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import WaterCalculatorVariablesDetails from '../../resources/mapping/waterCalculatorVariablesDetails';
import Tooltip from '@mui/material/Tooltip';
import { Typography, Icon } from '@mui/material';

const Recommendation = ({ recommendationDataRows, onRowClick }) => {
    const varData = WaterCalculatorVariablesDetails();

    // Add the two new headers
    const tableHeaders = [
        { title: 'Date', description: 'Date of the recommendation', icon: null },
        { title: 'Station', description: 'Station associated with the recommendation', icon: null },
        ...Object.keys(varData).map(key => ({
            title: varData[key].title,
            description: varData[key].description,
            icon: varData[key].icon,
        }))
    ];

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((header, index) => (
                            <TableCell
                                key={index}
                                align="center"
                                sx={{ fontWeight: 'bold', backgroundColor: '#c3c4c0' }}
                            >
                                <Tooltip title={
                                    <React.Fragment>
                                        <Typography color="inherit">{header.description}</Typography>
                                    </React.Fragment>
                                }>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {header.icon && (
                                            <Icon component={header.icon} sx={{ color: "#72ab38", fontSize: '1rem', marginRight: '0.5rem' }} />
                                        )}
                                        <div style={{ fontSize: '1rem' }}>{header.title}</div>
                                    </div>
                                </Tooltip>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recommendationDataRows.length > 0 ? (
                        recommendationDataRows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                onClick={() => onRowClick(row)}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                            >
                                <TableCell align="right">
                                    {new Date(row.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </TableCell>
                                <TableCell align="right">{row.station}</TableCell>
                                {Object.keys(varData).map((key, cellIndex, arr) => {
                                    const value = row[key];
                                    const isLastCell = cellIndex === arr.length - 1;
                                    return (
                                        <TableCell
                                            key={cellIndex}
                                            align="right"
                                            sx={isLastCell ? {
                                                backgroundColor: '#c98736',
                                                fontWeight: 'bold',
                                            } : {}}
                                        >
                                            {typeof value === 'number' ? value.toFixed(3) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={tableHeaders.length} align="center">
                                There are no saved recommendations  for this user yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Recommendation;
