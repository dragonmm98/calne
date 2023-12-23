import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { Advertisement } from "./advertisement";
import { BestDishes } from "./bestDishes";
import { BestRestaurants } from "./bestRestaurants";
import { Events } from "./events";
import { Recommendation } from "./recommendation";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurant";
import '../../../css/home.css'

export function HomePage(){
    //selector : sore => data
    useEffect(() => {
        // backend data request  => data
        // slice data => store
    },[]); 
    return( <div className="homepage">
        <Statistics/>
        <TopRestaurants/>
        <BestRestaurants/>
        <BestDishes/>
        <Advertisement/>
        <Events/>
        <Recommendation/>
    </div>
    )
}