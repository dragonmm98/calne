import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import "../../../css/order.css";
//*****REDUX *****/
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";

//Redux Selector**//
const processOrdersRetriever = createSelector( 
    retrieveProcessOrders,
    (processOrders)=>({
        processOrders,
    })
  );


const processOrders = [
    [1,2,3],
    [1,2,3],
    [1,2,3],
    
];

export default function ProcessOrders (props:any) {
    //** INITIALIZATIONS**/
    // const {processOrders} = useSelector(pausedOrdersRetriever);
    return (
        <TabPanel value="2">
            <Stack style={{gap: "10px"}}>
                {processOrders?.map((order) => {
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

                               <Box className={"total_price_box1 blue_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>mahsulot narxi </p>
                                    <p>$60</p>
                                    <img src="/icons/plus.svg" alt="" style={{marginLeft: "20px"}}/>
                                    <p>yetkazish xizmati </p>
                                    <p>$5 </p>
                                    <img src="/icons/pause.svg" alt="" 
                                    style={{ marginLeft: "20px"}}/>
                                    <p>Jami narx </p>
                                    <p>$65</p>
                                </Box>
                                <p className="data_comp">
                                    {moment().format("YY-MM-DD")}
                                </p>
                                <Button
                                className="blue_button"
                                variant="contained"
                                  > Yakunlash

                                </Button>
                               </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}