import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box>
      {/* <AppBar position="static" style={{ padding: '4px' }}> */}
      <Typography
        variant="subtitle2"
        component="div"
        sx={{ flexGrow: 1 }}
        align="center"
      >
        &copy; Jonathan Brooks
      </Typography>
      {/* </AppBar> */}
    </Box>
  );
};

export default Footer;
