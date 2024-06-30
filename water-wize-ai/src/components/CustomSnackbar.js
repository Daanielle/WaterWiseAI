import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function CustomSnackbar({ openSnackbar, handleClose, msg }) {
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        message={msg}
      />
    </div>
  );
}