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
import {setbestRestaurants, setTopRestaurants} from "../../screens/Homepage/slice"
import {retrieveTopRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from "../../../types/user";
import RestaurantApiService from "../../apiService/restaurantApiService";

//Redux Slice
const actionDispatch = (dispach: Dispatch) => ({
    setTopRestaurants: (data:Restaurant[]) => dispach(setTopRestaurants(data)),
    setBestRestaurants: (data:Restaurant[]) => dispach(setbestRestaurants(data)),
});
//Redux Selector
const topRestaurantRetriever = createSelector(retrieveTopRestaurants,
    (topRestaurants)=>({
        topRestaurants,
    })
)

export function HomePage() {
    ///Initializations**//
    const {setTopRestaurants, setBestRestaurants} = actionDispatch(useDispatch());
 
    //selector : sore => data
    useEffect(() => {
        // backend data request  => data
        const restaurantService = new RestaurantApiService();
        restaurantService.getTopRestaurants().then(data => {
          setTopRestaurants(data);
        }).catch(err => console.log(err));

        restaurantService.getRestaurants({page:1, limit: 4, order: 'mb_point'})
        .then(data => {
            setBestRestaurants(data);
        })
        .catch(err => console.log(err))

    },[]); 
    return( <div className="homepage">
        <Statistics/>
        <Advertisement/>
        <TopRestaurants/>
        <BestRestaurants/>
        <BestDishes/>
        <Events/>
        <Recommendation/>
    </div>
    )
}