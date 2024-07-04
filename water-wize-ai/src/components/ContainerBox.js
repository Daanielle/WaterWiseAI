import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ContainerBox = ({ children, sx, width, ...props }) => {
    return (
        <Box
            sx={{
                p: 2,
                // backgroundColor: 'var(--background-color)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                width: width || { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
                minWidth: '300px',
                // maxWidth: '100%', // responsive max width
                display: 'flex', // Make it a flex container
                flexDirection: 'column', // Stack children vertically
                // border: "2px solid var(--primary-color)",
                border: "2px solid var(--medium-green)",
                ...sx,
            }}
            {...props}
        >
            {React.Children.map(children, (child, index) => (
                <Box key={index} mb="1rem"> {/* Apply margin between children */}
                    {child}
                </Box>
            ))}
        </Box>
    );
};

ContainerBox.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object,
};

export default ContainerBox;
