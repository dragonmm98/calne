import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import "../../../css/order.css";
//*****REDUX *****/
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

//Redux Selector**//
const finishedOrdersRetriever = createSelector( 
    retrieveFinishedOrders,
    (finishedOrders)=>({
        finishedOrders,
    })
  );




export default function FinishedOrders (props:any) {
    //** INITIALIZATIONS**/
    const {finishedOrders} = useSelector(finishedOrdersRetriever);
    return (
        <TabPanel value="3">
            <Stack>
                {finishedOrders?.map((order:Order) => {
                    return (
                        <Box className={"order_main_box"}>
                      <Box className={"order_box_scroll"}>
                        {order.order_items.map((item) => {
                            const product: Product = order.product_data
                            .filter(ele => ele._id === item.product_id )[0];
                            const image_path = `${serverApi}/${product.product_images[0]}`;
                            return (
                                <Box className={"ordersName_price"}>
                                    <img src={image_path} className={"orderDishImg"} alt=""/>
                                    <p className="titleDish">{product.product_name}</p>
                                    <Box className={"priceBox"}>
                                        <p>${item.item_price}</p>
                                        <img src="/icons/Close.svg" alt="" />
                                        <p>{item.item_quantity}</p>
                                        <img src="/icons/pause.svg" alt=""/>
                                        <p style={{marginLeft: "4px"}}>${item.item_price * item.item_quantity}</p>
                                    </Box>
                                     </Box>
                            );
                        })}
                      </Box>

                               <Box className={"total_price_box2 black_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>Product Price </p>
                                    <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                    <p>Total Price </p>
                                    <p>${order.order_total_amount}</p>
                                </Box>
                           
                                 

                               </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}