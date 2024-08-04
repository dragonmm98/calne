import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import "../../../css/order.css";
//*****REDUX *****/
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import OrderApiService from "../../apiService/orderApiService";

//Redux Selector**//
const processOrdersRetriever = createSelector( 
    retrieveProcessOrders,
    (processOrders)=>({
        processOrders,
    })
  );




export default function ProcessOrders (props:any) {
    //** INITIALIZATIONS**/
    const {processOrders} = useSelector(processOrdersRetriever);

     //*** HANDLERS***/
     const finishOrderHandler = async (event:any) => {
        try {
            const order_id = event.target.value;
            const data = { order_id: order_id, order_status: "FINISHED"}
            if(!localStorage.getItem("member_data")) {
                sweetFailureProvider("Please Login First", true);
            };
            let confirmation = window.confirm("Buyurtmani tugallashni  tasdiqlaysizmi?");
            if(confirmation) {
                const orderService = new OrderApiService();
               await orderService.updateOrderStatus(data);
               props.setorderRebuild(new Date()) 
            }
        } catch (err) {
            console.log("finishOrderHandler, ERROR::", err);
            sweetErrorHandling(err).then()
        }
     
    }

    return (
        <TabPanel value="2">
            <Stack style={{gap: "10px"}}>
                {processOrders?.map((order: Order) => {
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

                               <Box className={"total_price_box1 blue_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>Product Price </p>
                                    <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                    <p>Total Price </p>
                                    <p>${order.order_total_amount}</p>
                                </Box>
                                <p className="data_comp">
                                    {moment(order.createdAt).format("YY-MM-DD")}
                                </p>
                                <Button
                                className="blue_button"
                                variant="contained"
                                value={order._id}
                                onClick={finishOrderHandler}
                                  > Finish

                                </Button>
                               </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}