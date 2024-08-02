import { createSlice } from "@reduxjs/toolkit";
import { RestaurantPageState } from "../../../types/screen";


const initialState: RestaurantPageState = {
    targetRestaurants: [],
    randomRestaurants: [],
    chosenRestaurant:  null,
    targetProducts: [],
    chosenProduct: null,
    comment: [],
}

const restaurantPageSlice = createSlice({
    name: "restaurantPage",
    initialState,
    reducers: {
        setTargetRestaurants: (state,action) => {
            state.targetRestaurants = action.payload;
        },
        setRandomRestaurants: (state,action) => {
            state.randomRestaurants = action.payload;
        },
        setChosenRestaurants: (state,action) => {
            state.chosenRestaurant = action.payload;
        },
        setTargetProducts: (state,action) => {
            state.targetProducts = action.payload;
        },
        setChosenProduct: (state,action) => {
            state.chosenProduct = action.payload;
        },
        setComment: (state,action) => {
            state.comment = action.payload;
        },
    },
});

export const {
    setTargetRestaurants,
    setChosenRestaurants,
    setRandomRestaurants,
    setChosenProduct,
    setTargetProducts,
    setComment,
} = restaurantPageSlice.actions;

const RestaurantPageReducer = restaurantPageSlice.reducer;
export default RestaurantPageReducer;