import { Container } from "@mui/system";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AllRestaurant } from "./allRestaurant";
import { ChosenDish } from "./chosenDish";
import { OneRestaurant } from "./oneRestaurant";
import "../../../css/restaurant.css";

export function RestaurantPage(props:any){
     let restaurant = useRouteMatch();
     console.log(restaurant)
    return(
       <div className="restaurant_page">
        <Switch>
            <Route path={`${restaurant.path}/dish/:dish_id`}>
                <ChosenDish onAdd={props.onAdd}/>
            </Route>
            <Route path={`${restaurant.path}/:restaurant_id`}>
                <OneRestaurant onAdd={props.onAdd}/>
            </Route>
            <Route path={`${restaurant.path}`}>
                <AllRestaurant/>
            </Route>
        </Switch>
       </div> 
    );
}