import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ padding: '8px' }}>
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Jonathan's Store
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
