import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';
import Icon from '@mui/material/Icon';
import FacebookIcon from '@mui/icons-material/Facebook';

const CustomThumb = styled('span')(({ theme }) => ({
//   height: 24,
//   width: 24,
//   backgroundColor: '#fff',
//   border: '2px solid currentColor',
//   borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '0 0 0 8px rgba(0,0,0,0.16)',
  },
  '& .icon': {
    fontSize: 16,
  },
}));

function CustomSliderThumbComponent(props) {
  const { icon, ...other } = props;
  return (
    <CustomThumb {...other}>
      <Icon  component={icon}/>
    </CustomThumb>
  );
}


const ValueLabelComponent = (props) => {
    const { children, value, icon: IconComponent,open  } = props;
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '2px 4px',
            borderRadius: '4px',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <IconComponent className="icon" />
          <Box sx={{ marginLeft: 1 }}>{value}°C</Box>
        </Box>
      </Box>
    );
  };
  












export default function VirtecalSlider({ iconuser, min, max, value, onChange}) {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
          '&.Mui-disabled': {
            color: 'grey', // Change the slider color when disabled
            '.MuiSlider-thumb': {
              color: 'green', // Change the thumb color when disabled
            },
            '.MuiSlider-track': {
              color: 'green', // Change the track color when disabled
            },
            '.MuiSlider-rail': {
              color: 'darkgrey', // Change the rail color when disabled
            },
          },
        }}
        components={{
          Thumb: (props) => <CustomSliderThumbComponent {...props} icon={iconuser} />,
          ValueLabel: (props) => <ValueLabelComponent {...props} icon={iconuser} />,
        }}
        orientation="vertical"
        min={min}
        max={max}
        value={value}
        onChange={onChange}

        // defaultValue={30}
        aria-label="Temperature"
        // valueLabelDisplay="auto"
        valueLabelDisplay="on"
        onKeyDown={preventHorizontalKeyboardNavigation}
        // disabled
      />
    </Box>
  );
}