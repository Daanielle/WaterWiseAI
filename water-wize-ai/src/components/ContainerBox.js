import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ContainerBox = ({ children, sx, ...props }) => {
    return (
        <Box
            sx={{
                p: 2, 
                backgroundColor: '#f5f5f5',
                // border: '1px solid #4CAF50', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '20px', 
                width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
                maxWidth: '100%', // responsive max width
                ...sx, 
            }}
            {...props}
        >
            {children}
        </Box>
    );
};

ContainerBox.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object, 
};

export default ContainerBox;
