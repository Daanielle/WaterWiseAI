import { Tooltip, Typography } from "@mui/material"
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';

const PredictionFlag = () => {
    return (
        <Tooltip title={<Typography gutterBottom component="div" fontSize={30}>
        This recomendetion is based on predicted values
        </Typography>}>
            <AutoAwesomeSharpIcon />
        </Tooltip >
    )

}

export default PredictionFlag