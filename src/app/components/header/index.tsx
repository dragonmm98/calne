
import { Logout } from "@mui/icons-material";
import { Badge, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Basket from "./basket";

export function NavbarHome (props:any) {
  
    
    const [value, setValue] = useState(true);


    return (
    <div className="format home_navbar">
        <Container>
            <Stack flexDirection={'row'} className="navbar_config" justifyContent={"space-between"}>
            <Box>
                <img  src="/home/logocar.png" alt="" width={"140px"} height={"100px"}/>
            </Box>
            <Stack flexDirection={"row"} justifyContent="space-evenly" alignItems={"center"} className="navbar_links">
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/"} activeClassName="underline">Home Page</NavLink>
                </Box>
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/restaurant"} activeClassName="underline">Dealers</NavLink>
                </Box>
                {props.verifiedMemberData ? 
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/orders"} activeClassName="underline">Buy a Car</NavLink>
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
                onDelete={props.onDelete}
                onDeleteAll={props.onDeleteAll}
                setorderRebuild={props.setorderRebuild}/>

                {!props.verifiedMemberData ? (
                    <Box> 
                    <Button variant="contained" style={{color:"#FFFFF", background:"transparent", border: "1px inset"}}
                    onClick={props.handleLoginOpen}>Login</Button>
                 </Box>
                ) : (<img style={{width: "48px", height: "48px", borderRadius: "24px" }} 
                src={props.verifiedMemberData.mb_image} 
                onClick={props.handleLogoutClick}
                />
                )}
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
                 
            </Stack>
            </Stack>

            <Stack className="head_information" justifyContent={"row"}>
                <Stack justifyContent={'column'} style={{marginTop: "86px", marginLeft: "24px"}}>
                    <Box>
                      <h2 style={{
                        fontFamily:"-moz-initial", color:"#AD6D4F"
                      }}
                      >Welcome to Calne</h2> 
                    </Box>
                    <Box className="define_restaurant">
                    Get your desired one in your Desired Way</Box>
                    <Box className="timeline_serv"></Box>
                    <Box sx={{mt:'90px'}}>
                        {!props.verifiedMemberData ? (
                    <Button variant="contained" style={{width: '210px', height: '60px', background: 'transparent', color:'#FFFF', border: "1px inset"}} 
                    onClick={props.handleSignUpOpen}>Register</Button>
                        ) : null}
               
                    </Box>
                </Stack>

                <Box className="big_img"></Box>
                
            </Stack>
        </Container>
    </div>
    );
}