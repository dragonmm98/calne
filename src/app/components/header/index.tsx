
import { Logout } from "@mui/icons-material";
import { Badge, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function NavbarHome (props:any) {
  
    
    const [value, setValue] = useState(true);

    // useEffect(()=> {
    //     setCount(count+1);
    // }, [value]);
    return (
    <div className="format home_navbar">
        <Container>
            <Stack flexDirection={'row'} className="navbar_config" justifyContent={"space-between"}>
            <Box>
                <img  src="/icons/papay..svg" alt="" />
            </Box>
            <Stack flexDirection={"row"} justifyContent="space-evenly" alignItems={"center"} className="navbar_links">
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/"} activeClassName="underline">Bosh Sahifa</NavLink>
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
                <NavLink to={"/member-page"} activeClassName="underline">Sahifam</NavLink>
            </Box> : null
                }
                <Box className="hover-line" onClick={props.setpath}>
                    <NavLink to={"/help"} activeClassName="underline">Help</NavLink>
                </Box>
                <Box className="hover-line">
                    <IconButton 
                    aria-label="cart" 
                    id="basic-button"
                    aria-controls={undefined}
                    aria-haspopup="true"
                    aria-expanded={undefined} >
                       <Badge badgeContent={3} color="secondary">
                        <img src={"/icons/shopping-cart.svg"} alt=''/>
                       </Badge>
                    </IconButton>
                </Box>
                {!props.verifiedMemberData ? (
                    <Box> 
                    <Button variant="contained" style={{color:"#FFFFF", background:"#1976d2"}}
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
                    <img  src="/icons/welcome.svg" alt=""/>
                    </Box>
                    <Box className="define_restaurant">
                        The Authentic Restaurant & Cafe</Box>
                    <Box className="timeline_serv">24 soat xizmatingizdamiz.</Box>
                    <Box sx={{mt:'90px'}}>
                        {!props.verifiedMemberData ? (
                    <Button variant="contained" style={{width: '210px', height: '60px', background: '#1976d2', color:'#FFFFF'}} 
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