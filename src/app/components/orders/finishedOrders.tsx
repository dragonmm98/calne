import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import "../../../css/order.css";

const pausedOrders = [
    [1,2,3]
    
];

export default function FinishedOrders (props:any) {
    return (
        <TabPanel value="3">
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

                               <Box className={"total_price_box2 black_solid"}>
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
                           
                                 

                               </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}