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
    useEffect(() => {
        console.log("componentlar did mount yani joylandi = data fetching");
        return () => {
            console.log ("componentlar unmount ya'ni yo'qotildi disappear holatiga otdi ")
        }
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