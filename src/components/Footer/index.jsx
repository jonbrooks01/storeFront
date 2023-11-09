import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ flexGrow: 1 }}
            align="center"
          >
            &copy; Jonathan Brooks
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
