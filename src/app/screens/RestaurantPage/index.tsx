import { Container } from "@mui/system";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AllRestaurant } from "./allRestaurant";
import { ChosenDish } from "./chosenDish";
import { OneRestaurant } from "./oneRestaurant";
import "../../../css/restaurant.css";
import ChatBot from "../../components/chatbot/chat";

export function RestaurantPage(props:any){
     let restaurant = useRouteMatch();
    return(
       <div className="restaurant_page">
        <Switch>
            <Route path={`${restaurant.path}/dish/:dish_id`}>
                <ChosenDish onAdd={props.onAdd}/>
            </Route>
            <Route path={`${restaurant.path}/:dealer_id`}>
                <OneRestaurant onAdd={props.onAdd}/>
            </Route>
            <Route path={`${restaurant.path}`}>
                <AllRestaurant/>
                <ChatBot/>
            </Route>
        </Switch>
       </div> 
    );
}