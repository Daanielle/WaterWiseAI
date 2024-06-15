import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import waterCalculatorVariablesDetails from '../../resources/mapping/waterCalculatorVariablesDetails';
import Tooltip from '@mui/material/Tooltip';
import { Typography, Icon } from '@mui/material';

const Recommendation = ({ recommendationDataRows }) => {
    const varData = waterCalculatorVariablesDetails
    const tableHeaders = Object.keys(varData).map(key => varData[key].title);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(varData).map((key, index) => (
                            <TableCell
                                key={index}
                                align="center"
                                sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }} // Bold text for header cells
                            >
                                <Tooltip title={
                                    <React.Fragment>
                                        <Typography color="inherit">{varData[key].description}</Typography>
                                    </React.Fragment>
                                }
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Icon component={varData[key].icon} sx={{ color: "#72ab38", fontSize: '1rem' }} />
                                        <div style={{ fontSize: '1rem', marginRight: '0.5rem' }}>{varData[key].title}</div>
                                    </div>
                                </Tooltip>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recommendationDataRows.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
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
                                        } : {}}>
                                        {typeof value === 'number' ? value.toFixed(3) : value}
                                    </TableCell> //TODO: add units
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Recommendation