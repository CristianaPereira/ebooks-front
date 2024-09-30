import { useState, MouseEvent } from 'react'
import { Box, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom';
import paths from '../../../../routes/paths';
import { useSession } from '../../../../hooks/session';
import useRequest from '../../../../hooks/useRequest';

const settings = ['Profile', 'Account', 'Dashboard'];

export default function UserMenu() {
  const { logged_in } = useSession()
  if (logged_in) {
    return <LoggedUserMenu />
  } else {
    return <Link to={paths.LOGIN} >Login</Link>
  }
}

function LoggedUserMenu() {
  const { handleLogout } = useSession()

  const { loading: logoutLoading, sendRequest } = useRequest();

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);


  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = async () => {
    await sendRequest({ method: 'DELETE', url: 'session/logout' }).then(() => {
      handleLogout();
    }).catch((err) => {
      // TODO: handle errors
      console.log(err);
    });
  };


  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {/* TODO: after profile pic upload */}
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={onLogout}>
          {logoutLoading && <Typography>Loading...</Typography>}
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}


