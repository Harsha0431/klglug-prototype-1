import { useState } from 'react';
import './navbar.css';
import { Link , useNavigate} from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ListIcon from '@mui/icons-material/List';
import MenuItem from '@mui/material/MenuItem';
import { TabMenu } from 'primereact/tabmenu';
import { TabView, TabPanel } from 'primereact/tabview';



const KLGLUG_LOGO = "data:image/png;base64,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";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };



  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={KLGLUG_LOGO} alt='logo'></img>
      </div>
      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <Link to='/' style={{textDecoration:'none'}}><Button variant="text" style={{textDecoration:'none' , fontSize:'20px', color:'black', fontWeight:'600' , padding:'3px 1.5rem'}} onClick={closeMenu} >home</Button> </Link>
        <Link to='/creditList' style={{textDecoration:'none'}}><Button variant="text" style={{textDecoration:'none' , fontSize:'20px', color:'black', fontWeight:'600' , padding:'3px 1.5rem'}} onClick={closeMenu} >Credit List</Button> </Link>
        <Link to='/loginMUI' style={{textDecoration:'none'}}><Button variant="text" style={{textDecoration:'none' , fontSize:'20px' ,color:'black', fontWeight:'600' , padding:'3px 1.5rem'}} onClick={closeMenu}>Login</Button> </Link>
      </div>
        <div className="navbar-toggle" onClick={handleMenuToggle}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <ListIcon color='action' fontSize='large' />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link to='/' style={{textDecoration:'none'}}><span style={{color:'black' , fontSize:'18px' , fontWeight:'550',textTransform:'capitalize'}}>home</span></Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/creditList' style={{textDecoration:'none'}}><span style={{color:'black' , fontSize:'18px' , fontWeight:'550',textTransform:'capitalize'}}>Credit List</span></Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/loginMUI' style={{textDecoration:'none'}}><span style={{color:'black' , fontSize:'18px' , fontWeight:'550',textTransform:'capitalize'}}>Login</span></Link></MenuItem>
          </Menu>
    </div>
    </nav>
  );
};

export default Navbar;