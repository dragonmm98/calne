import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";


const initialState: HomePageState = {
    topRestaurants: [],
    bestRestaurants: [],
    trendProducts:[],
    bestBoArticles: [],
    trendBoArticles: [],
    newsBoArticles: [],
}

const HomePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers:{
        setTopRestaurants: (state,action) => {
            state.topRestaurants = action.payload
        },
        setbestRestaurants: (state,action) => {
            state.bestRestaurants = action.payload
        },
        setTrendProducts: (state,action) => {
            state.trendProducts = action.payload
        },
        setBestBoArticles: (state,action) => {
            state.bestBoArticles = action.payload
        },
        setTrendBoArticles: (state,action) => {
            state.trendBoArticles = action.payload
        },
        setNewsBoArticles: (state,action) => {
            state.newsBoArticles = action.payload
        },
    }
});

export const  {
    setTopRestaurants,setbestRestaurants,
    setTrendProducts,setBestBoArticles,
    setTrendBoArticles,setNewsBoArticles} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default  HomePageReducer;