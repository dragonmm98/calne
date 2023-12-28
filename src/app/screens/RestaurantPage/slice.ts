import { createSlice } from "@reduxjs/toolkit";
import { RestaurantPageState } from "../../../types/screen";


const initialState: RestaurantPageState = {
    targetRestaurants: [],
    randomRestaurants: [],
    chosenRestaurants:  null,
    targetProducts: [],
    chosenProduct: null,
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
            state.chosenRestaurants = action.payload;
        },
        setTargetProducts: (state,action) => {
            state.targetProducts = action.payload;
        },
        setChosenProduct: (state,action) => {
            state.chosenProduct = action.payload;
        },
    },
});

export const {
    setTargetRestaurants,
    setChosenRestaurants,
    setRandomRestaurants,
    setChosenProduct,
    setTargetProducts,
} = restaurantPageSlice.actions;

const RestaurantPageReducer = restaurantPageSlice.reducer;
export default RestaurantPageReducer;