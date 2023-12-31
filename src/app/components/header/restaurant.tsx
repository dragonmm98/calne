import { Logout } from "@mui/icons-material";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Basket from "./basket";

export function NavbarRestaurant (props:any) {
    return (<div className="format_restaurant home_navbar">
         <Container>
            <Stack flexDirection={'row'} className="navbar_config" justifyContent={"space-between"}>
            <Box>
                <img  src="/icons/papay..svg" alt="" />
            </Box>
            <Stack flexDirection={"row"} justifyContent="space-evenly" alignItems={"center"} className="navbar_links">
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/"}>Bosh Sahifa</NavLink>
                </Box>
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/restaurant"} activeClassName="underline">Oshxona</NavLink>
                </Box>
                {props.verifiedMemberData ? 
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/orders"} activeClassName="underline">Orders</NavLink>
                </Box>: null
                }
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/community"} activeClassName="underline">Community</NavLink>
                </Box>
                {props.verifiedMemberData ? 
                <Box className="hover-line" onClick={props.setpath}>
                <NavLink to={"/member-page"} activeClassName="underline">My Page</NavLink>
            </Box> : null
                }
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/help"} activeClassName="underline">Help</NavLink>
                </Box>
             
                <Basket 
                cartItems={props.cartItems}
                 onAdd={props.onAdd} 
                 onRemove={props.onRemove}
                 onDelete={props.onDelete}/>

                 <Box> 
                   {!props.verifiedMemberData ? (
                     <Button variant="contained" style={{color:"#FFFFF", background:"#1976d2"}}
                     onClick={props.handleLoginOpen}>Login</Button>
                   ) :  (<img style={{width: "48px", height: "48px", borderRadius: "24px" }} 
                   src={props.verifiedMemberData.mb_image} 
                   onClick={props.handleLogoutClick}
                />)}
                 <Menu
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleCloseLogout}
                onClick={props.handleCloseLogout}
                slotProps={{
                  // Use slotProps instead of PaperProps
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                      }
                    }
                  }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem
                         onClick={props.handleLogOutRequest}>
                 
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "blue" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
                 </Box>
            </Stack>
            </Stack>
            </Container>
    </div>
    )
}