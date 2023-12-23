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

//Redux
import { useDispatch,useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit"; 
import { createSelector } from "reselect";
import {setTopRestaurants} from "../../screens/Homepage/slice"
import {retrieveTopRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from "../../../types/user";

//Redux Slice
const actionDispatch = (dispach: Dispatch) => ({
    setTopRestaurants: (data:Restaurant[]) => dispach(setTopRestaurants(data)),
});
//Redux Selector
const topRestaurantRetriever = createSelector(retrieveTopRestaurants,
    (topRestaurants)=>({
        topRestaurants,
    })
)

export function HomePage() {
    ///Initializations
    const {setTopRestaurants} = actionDispatch(useDispatch());
    const {topRestaurants} = useSelector(topRestaurantRetriever);

    //selector : sore => data
    useEffect(() => {
        // backend data request  => data
        const data: Restaurant[] = [
        
        ];
        setTopRestaurants(data);
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