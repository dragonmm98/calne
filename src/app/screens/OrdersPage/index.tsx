import "../../../css/order.css"
import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tab from '@mui/material/Tab';
import { TabContext, TabList } from "@mui/lab";
import PausedOrders from "../OrdersPage/pausedOrders";
import Marginer from "../../components/marginer";
import ProcessOrders from "../OrdersPage/proccessOrders";
import FinishedOrders from "./finishedOrders";
import { Order } from "../../../types/order";
//*****REDUX *****/
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import OrderApiService from "../../apiService/orderApiService";

//***REDUX SLICE ***//
const actionDispatch = (dispach: Dispatch) => ({
    setPausedOrders: (data:Order[]) => dispach(setPausedOrders(data)),
    setProcessOrders: (data:Order[]) => dispach(setProcessOrders(data)),
    setFinishedOrders: (data:Order[]) => dispach(setFinishedOrders(data)),
});

export function OrdersPage(props:any){
    /*** INITITIALIZATIONS***/
    const [value, setValue] = useState("1");
    const {setPausedOrders,setProcessOrders,setFinishedOrders} = 
    actionDispatch(useDispatch());


    useEffect(() => {
        const orderService = new OrderApiService();
        orderService
        .getMyOrders("paused")
        .then(data => setPausedOrders(data))
        .catch(err=> console.log(err));
        
        orderService
        .getMyOrders("process")
        .then(data => setProcessOrders(data))
        .catch(err=> console.log(err));

        orderService
        .getMyOrders("finished")
        .then(data => setFinishedOrders(data))
        .catch(err=> console.log(err));
    }, [props.orderRebuild])
   

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
                      <PausedOrders setorderRebuild = {props.setorderRebuild}/>
                      <ProcessOrders setorderRebuild = {props.setorderRebuild}/>
                      <FinishedOrders setorderRebuild = {props.setorderRebuild}/>
                </Stack>
                 </TabContext>
           </Stack>

          
        </Container>

        </div>
    )
}