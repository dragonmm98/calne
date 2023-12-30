import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import "../../../css/order.css";

//*****REDUX *****/
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";

//Redux Selector**//
const pausedOrdersRetriever = createSelector( 
    retrievePausedOrders,
    (pausedOrders)=>({
        pausedOrders,
    })
  );

const pausedOrders = [
    [1,2,3]
    
];

export default function PausedOrders (props:any) {
    //** INITIALIZATIONS**/
    // const {pausedOrders} = useSelector(pausedOrdersRetriever);
    return (
        <TabPanel value="1">
            <Stack>
                {pausedOrders?.map((order) => {
                    return (
                        <Box className={"order_main_box"}>
                      <Box className={"order_box_scroll"}>
                        {order.map((item) => {
                            const image_path = `/others/foodmm.jpg`;
                            return (
                                <Box className={"ordersName_price"}>
                                    <img src={image_path} className={"orderDishImg"} alt=""/>
                                    <p className="titleDish">Qovurilgan go’sht cho’poncha</p>
                                    <Box className={"priceBox"}>
                                        <p>$7</p>
                                        <img src="/icons/Close.svg" alt="" />
                                        <p>$3</p>
                                        <img src="/icons/pause.svg" alt=""/>
                                        <p style={{marginLeft: "4px"}}>$21</p>
                                    </Box>
                                     </Box>
                            );
                        })}
                      </Box>

                               <Box className={"total_price_box black_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>mahsulot narxi </p>
                                    <p>$22</p>
                                    <img src="/icons/plus.svg" alt="" style={{marginLeft: "20px"}}/>
                                    <p>yetkazish xizmati </p>
                                    <p>$2 </p>
                                    <img src="/icons/pause.svg" alt="" 
                                    style={{ marginLeft: "20px"}}/>
                                    <p>Jami narx </p>
                                    <p>$110</p>
                                </Box>
                           
                                  <Button className="red_button_box" variant="contained" >bekor qilish</Button>
                                
                              
                                  <Button className="blue_button_box" variant="contained"
                                   > To'lash</Button>
                                 

                               </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}