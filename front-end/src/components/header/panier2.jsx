import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
  },
}));

const Cart = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  let [cart, setCart] = useState([])

  let localCart = localStorage.getItem("cart");
  const [count, setCount]=useState(0);

  const addItem = (item) => {

    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cart];

    //assuming we have an ID field in our item
    let { ID } = item;

    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.ID == ID);

    //if item already exists
    if (existingItem) {
      existingItem.quantity += item.quantity //update item
    } else { //if item doesn't exist, simply add it
      cartCopy.push(item)
    }

    //update app state
    setCart(cartCopy)

    //make cart a string and store in local space
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)

  }
  const editItem = (itemID, amount) => {

    let cartCopy = [...cart]

    //find if item exists, just in case
    let existentItem = cartCopy.find(item => item.ID == itemID);

    //if it doesnt exist simply return
    if (!existentItem) return

    //continue and update quantity
    existentItem.quantity += amount;

    //validate result
    if (existentItem.quantity <= 0) {
      //remove item  by filtering it from cart array
      cartCopy = cartCopy.filter(item => item.ID != itemID)
    }

    //again, update state and localState
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  const removeItem = (itemID) => {

    //create cartCopy
    let cartCopy = [...cart]

    cartCopy = cartCopy.filter(item => item.ID != itemID);

    //update state and local
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem('cart', cartString)
  }
  return (
    <div>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
         <Tooltip title="Account settings">
            <IconButton 
            aria-label="cart" 
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined} 
            >
                <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </Tooltip>
    </Box>
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

        PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
        <Link variant="text" to="/profile" >
            <MenuItem>
                Profile
            </MenuItem>
        </Link>
        <Link variant="text" to="/profile" >
            <MenuItem>
                Profile
            </MenuItem>
        </Link>

    </Menu>
</div>
  )

}

export default { Cart }