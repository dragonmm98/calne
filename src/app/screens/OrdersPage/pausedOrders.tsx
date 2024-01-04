import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import "../../../css/order.css";

//*****REDUX *****/
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Order } from "../../../types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import OrderApiService from "../../apiService/orderApiService";

//Redux Selector**//
const pausedOrdersRetriever = createSelector( 
    retrievePausedOrders,
    (pausedOrders)=>({
        pausedOrders,
    })
  );


export default function PausedOrders (props:any) {
    //** INITIALIZATIONS**/
    const {pausedOrders} = useSelector(pausedOrdersRetriever);

    //*** HANDLERS***/
    const  processOrderHandler = async (event:any) => {
        try {
            const order_id = event.target.value;
            const data = { order_id: order_id, order_status: "PROCESS"}
            if(!localStorage.getItem("member_data")) {
                sweetFailureProvider("Please Login First", true);
            };
            let confirmation = window.confirm("Buyurtmani to'lashni  tasdiqlaysizmi?");
            if(confirmation) {
                const orderService = new OrderApiService();
               await orderService.updateOrderStatus(data);
               props.setorderRebuild(new Date()) 
            }
        } catch (err) {
            console.log("processOrderHandler, ERROR::", err);
            sweetErrorHandling(err).then()
        }
     
    }

    const deleteOrderHandler = async (event:any) => {
        try {
            const order_id = event.target.value;
            const data = { order_id: order_id, order_status: "DELETED"}
            if(!localStorage.getItem("member_data")) {
                sweetFailureProvider("Please Login First", true);
            };
            let confirmation = window.confirm("Buyurtmani bekor qilishni hohlaysizmi?");
            if(confirmation) {
                const orderService = new OrderApiService();
               await orderService.updateOrderStatus(data);
               props.setorderRebuild(new Date())
            }
        } catch (err) {
            console.log("deleteOrderHandler, ERROR::", err);
            sweetErrorHandling(err).then()
        }
     
    }

    return (
        <TabPanel value="1">
            <Stack>
                {pausedOrders?.map((order: Order) => {
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

                               <Box className={"total_price_box black_solid"}>
                                <Box className={"boxTotal"}>
                                    <p>mahsulot narxi </p>
                                    <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                    <img src="/icons/plus.svg" alt="" style={{marginLeft: "20px"}}/>
                                    <p>yetkazish xizmati </p>
                                    <p>${order.order_delivery_cost} </p>
                                    <img src="/icons/pause.svg" alt="" 
                                    style={{ marginLeft: "20px"}}/>
                                    <p>Jami narx </p>
                                    <p>${order.order_total_amount}</p>
                                </Box>
                           
                                  <Button className="red_button_box" variant="contained" 
                                  onClick={deleteOrderHandler}
                                  value={order._id}
                                  >bekor qilish</Button>
                                
                              
                                  <Button
                                  onClick={processOrderHandler}
                                  value={order._id}
                                   className="blue_button_box"
                                    variant="contained"

                                   > To'lash</Button>
                                 

                               </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}