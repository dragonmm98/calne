import "../../../css/order.css"
import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tab from '@mui/material/Tab';
import { TabContext, TabList } from "@mui/lab";
import PausedOrders from "../OrdersPage/pausedOrders";
import Marginer from "../../components/marginer";
import ProcessOrders from "../OrdersPage/proccessOrders";
import FinishedOrders from "./finishedOrders";



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
                           <Tab style={{marginLeft:"50px"}} label="Buyurtmalarim" value={"1"}/>                 
                           <Tab style={{marginLeft:"200px"}} label="Jarayon" value={"2"}/>                 
                           <Tab style={{marginLeft:"200px"}} label="Yakunlangan" value={"3"}/>                
                        </TabList>
                    </Box>
                </Box>
                <Stack className="order_main_content">
                      <PausedOrders/>
                      <ProcessOrders/>
                      <FinishedOrders/>
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

            <form className={"order_payment_box"}>
                <Box className={"input_box_pay"}>
                  <input 
                  type={"text"} 
                  name={"card_number"} 
                  placeholder={"Card number:12345"}
                  className={"card_number"}/>
                  <div className="row_input_box">
                  <input 
                  type={"data"} 
                  name={"card_data"} 
                  placeholder={"07/24"}
                  className={"card_data"}/>

                 <input 
                  type={"text"} 
                  name={"card_number"} 
                  placeholder={"CVV:010"}
                  className={"card_cvv"}/>
                  </div>

                  <input 
                  type={"text"} 
                  name={"user_name"} 
                  placeholder={"Account Name"}
                  className={"card_user"}/>
                </Box>
                <Box className={"payment_images"}>
                    <img src="/icons/western_union.svg" alt=""/>
                    <img src="/icons/master_card.svg" alt=""/>
                    <img src="/icons/paypal.svg" alt=""/>
                    <img src="/icons/visa.svg" alt=""/>
                </Box>
            
             </form>
           </Stack>

        </Container>

        </div>
    )
}