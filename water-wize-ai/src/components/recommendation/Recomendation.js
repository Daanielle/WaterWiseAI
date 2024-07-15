// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Tooltip, Typography, Icon, Button } from '@mui/material';
// import waterCalculatorVariablesDetails from '../../resources/mapping/waterCalculatorVariablesDetails';
// import stations from '../../resources/mapping/imsStations.json';
// import { CSVLink } from 'react-csv';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//     components: {
//         MuiDataGrid: {
//             styleOverrides: {
//                 root: {
//                     '& .MuiDataGrid-columnHeader': {
//                         fontWeight: 'bold',
//                         whiteSpace: 'normal', // Allow header text to wrap
//                         lineHeight: '1.2', // Adjust line height for wrapped text
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         height: '100px',
//                         backgroundColor: 'var(--light-accent-gray)',
//                     },
//                     '& .MuiDataGrid-columnHeaderTitleContainer': {
//                         height: '100px', // Ensure the header title container is tall enough
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         whiteSpace: 'normal', // Allow header text to wrap
//                         lineHeight: '1.2', // Adjust line height for wrapped text
//                         backgroundColor: 'var(--light-accent-gray)',
//                     },
//                     '& .MuiDataGrid-columnHeaders': {
//                         backgroundColor: 'var(--light-accent-gray)',
//                         height: '100px', // Set the height of the header row
//                         fontWeight: 'bold',
//                         whiteSpace: 'normal', // Allow header text to wrap
//                     },
//                     '& .MuiDataGrid-cell': {
//                         borderColor: '#ccc',
//                         textAlign: 'center', // Centering cell values
//                         whiteSpace: 'nowrap', // Prevent cell text from wrapping
//                         backgroundColor: 'var(--primary-white)',
//                     },
//                     '& .recommendation-column': {
//                         backgroundColor: 'burnt-orange',
//                         fontWeight: 'bold',
//                     },
//                 },
//             },
//         },
//         MuiCheckbox: {
//             styleOverrides: {
//                 root: {
//                     color: 'green',
//                     '&.Mui-checked': {
//                         color: 'green',
//                     },
//                 },
//             },
//         },
//     },
// });

// const Recommendation = ({ recommendationDataRows, onRowClick, onSelectionChange }) => {
//     const varData = waterCalculatorVariablesDetails();

//     // Create column definitions for DataGrid
//     const columns = [
//         {
//             field: 'date',
//             headerName: 'Date',
//             width: 100, // Increase width for longer text
//             headerAlign: 'center', // Centering header
//             renderHeader: (params) => (
//                 <Tooltip title="Date of the recommendation">
//                     <div>Date</div>
//                 </Tooltip>
//             ),
//             align: 'center', // Centering cell values
//         },
//         {
//             field: 'station',
//             headerName: 'Station',
//             width: 100, // Increase width for longer text
//             headerAlign: 'center', // Centering header
//             renderHeader: (params) => (
//                 <Tooltip title="Station associated with the recommendation">
//                     <div>Station</div>
//                 </Tooltip>
//             ),
//             align: 'center', // Centering cell values
//         },
//         ...Object.keys(varData).map((key) => ({
//             field: key,
//             headerName: varData[key].title,
//             width: 107, // Increase width for longer text
//             headerAlign: 'center', // Centering header
//             renderHeader: (params) => (
//                 <Tooltip
//                     title={
//                         <React.Fragment>
//                             <Typography color="inherit">{varData[key].description}</Typography>
//                         </React.Fragment>
//                     }
//                 >
//                     <div
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '0.8rem',
//                             flexWrap: 'wrap', // Allow content to wrap
//                             textAlign: 'center', // Center content horizontally
//                         }}
//                     >
//                         {varData[key].icon && (
//                             <Icon
//                                 component={varData[key].icon}
//                                 sx={{ color: 'var(--medium-green)', fontSize: '1rem' }}
//                             />
//                         )}
//                         <div>{varData[key].title}</div>
//                         <div>{varData[key].units}</div>
//                     </div>
//                 </Tooltip>
//             ),
//             valueFormatter: (params) => {
//                 const value = params.value;
//                 // Convert string values to number and format to 3 decimal places
//                 if (typeof params === 'string' && !isNaN(Number(params))) {
//                     return Number(params).toFixed(3);
//                 }
//                 return params.toFixed(3);
//             },
//             align: 'center', // Centering cell values
//             cellClassName: key === 'recommendation' ? 'recommendation-column' : '',
//         })),
//     ];

//     // Create rows data for DataGrid
//     const rows = recommendationDataRows.map((row, index) => {
//         const stationName = stations.find((item) => item.id === row.station)?.name || '';
//         return {
//             id: index,
//             date: new Date(row.createdAt).toLocaleDateString(undefined, {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//             }),
//             station: stationName,
//             ...row,
//         };
//     });

//     const csvHeaders = columns.map((column) => ({
//         label: column.headerName,
//         key: column.field,
//     }));

//     const [selectedRows, setSelectedRows] = React.useState([]);

//     const handleSelectionChange = (newSelection) => {
//         setSelectedRows(newSelection);
//         const selectedRowsData = rows.filter((row) => newSelection.includes(row.id));
//         onSelectionChange(selectedRowsData); // Call the parent callback with selected rows
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <div style={{ width: '80vw', margin: '0 auto' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                     <Typography variant="h6">Recommendations</Typography>
//                     <Button variant="contained" color="primary">
//                         <CSVLink
//                             data={selectedRows.length ? selectedRows : rows}
//                             headers={csvHeaders}
//                             filename={'recommendations.csv'}
//                             style={{ color: '#fff', textDecoration: 'none' }}
//                         >
//                             Export Selected CSV
//                         </CSVLink>
//                     </Button>
//                 </div>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5, 10, 20]}
//                     checkboxSelection
//                     onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
//                     autoHeight
//                     onRowClick={(params) => onRowClick(params.row)}
//                     components={{
//                         ColumnSortedDescendingIcon: () => <Icon>expand_more</Icon>,
//                         ColumnSortedAscendingIcon: () => <Icon>expand_less</Icon>,
//                         ColumnMenuIcon: () => <Icon>more_vert</Icon>,
//                     }}
//                 />
//             </div>
//         </ThemeProvider>
//     );
// };

// export default Recommendation;


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
import stations from '../../resources/mapping/imsStations.json'; 
import PredictionFlag from '../water-calculator/PredictionFlag';

const Recommendation = ({ recommendationDataRows, onRowClick }) => {
    const varData = WaterCalculatorVariablesDetails();

    // Add the two new headers
    const tableHeaders = [
        { title: 'Date', description: 'Date of the recommendation', icon: null },
        { title: 'Station', description: 'Station associated with the recommendation', icon: null },
        ...Object.keys(varData).map(key => ({
            title: varData[key].title + " " + varData[key].units,
            description: varData[key].description,
            icon: varData[key].icon,
        }))
    ];

    return (
        <div style={{ width: '70vw', overflowX: 'auto', margin: '0 auto' }}>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map((header, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    sx={{ fontWeight: 'bold', backgroundColor: 'var(--light-gray)' }}
                                >
                                    <Tooltip title={
                                        <React.Fragment>
                                            <Typography color="inherit">{header.description}</Typography>
                                        </React.Fragment>
                                    }>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {header.icon && (
                                                <Icon component={header.icon} sx={{ color: "var(--medium-green)", fontSize: '1rem', marginRight: '0.5rem' }} />
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
                                        {row.isPrediction && <PredictionFlag/>}
                                        {new Date(row.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </TableCell>
                                    <TableCell align="right">{stations.find(item => item.id === row.station).name}</TableCell>
                                    {Object.keys(varData).map((key, cellIndex, arr) => {
                                        const value = row[key];
                                        const isLastCell = cellIndex === arr.length - 1;
                                        return (
                                            <TableCell
                                                key={cellIndex}
                                                align="right"
                                                sx={isLastCell ? {
                                                    backgroundColor: 'var(--accent-orange)',
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
                                    There are no saved recommendations for this user yet
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Recommendation;