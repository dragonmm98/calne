import "../../../css/order.css"
import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tab from '@mui/material/Tab';
import { TabContext, TabList } from "@mui/lab";
import PausedOrders from "../../components/orders/pausedOrders";
import Marginer from "../../components/marginer";
import ProcessOrders from "../../components/orders/proccessOrders";



export function OrdersPage(){
    /*** INITITIALIZATIONS***/
    const [value, setValue] = useState("1");
   
     /**HANDLERS **/
     const handleChange= (event: any, newValue: string) => {
        setValue(newValue);
     }

    return(
        <div className="order_page">
        <Container
        maxWidth="lg"
        style={{display: "flex", flexDirection:"row"}}
        sx={{ mt: "50px", mb: "50px"}}>
           
           <Stack className="order_left">
            <TabContext value={value}>
                <Box className="order_nav_frame">
                    <Box sx={{borderBottom: 1, borderColor: "white"}}>
                        <TabList
                        className="tablist_label"
                        onChange={handleChange}
                        // value={value}
                        aria-label="basic tabs example"
                        style={{display: "flex", justifyContent: "space-between",}}>
                           <Tab  label="Buyurtmalarim" value={1}/>                 
                           <Tab  label="Jarayon" value={2}/>                 
                           <Tab  label="Yakunlangan" value={3}/>                
                        </TabList>
                    </Box>
                </Box>
                <Stack className="order_main_content">
                      <PausedOrders/>
                      <ProcessOrders/>
                </Stack>
                 </TabContext>
           </Stack>

           <Stack className="order_right">
            <Box className={"order_info_box"}>
                <Box 
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}>
                    <div className="order_user_img">
                        <img src="/icons/default_user.svg" alt=""
                        className="order_user_avatar"/>
                        <img className="avatar_1" src="/icons/user1.svg" alt=""/>
                    </div>
                    <span className="Ismoilov-Akmaljon">
                          Ismoilov Akmaljon
                               </span>
                               <span className="Foydalanuvchi">
                                    Foydalanuvchi
                             </span> 
                             <Box className={"marginer_botline"}>
                            <Marginer
                             direction="horizontal"
                             height="2"
                             width="332"
                            bg="#A1A1A1;"/>
                            
                            <Box className={"location_bottom"}>
                                <img src="/icons/location1.svg"/>
                                <span className="location">
                                    Seoul
                                </span>
                            </Box>


                    </Box>
                </Box>
            </Box>
           </Stack>

        </Container>

        </div>
    )
}