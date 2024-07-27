import { createSelector } from "reselect";
import { HomePage } from ".";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage; 

export const retrieveTopRestaurants = createSelector (
    selectHomePage,
    (HomePage) => HomePage.topRestaurants
)
export const retrievebestRestaurants = createSelector (
    selectHomePage,
    (HomePage) => HomePage.bestRestaurants
)
export const retrievetrendProducts = createSelector (
    selectHomePage,
    (HomePage) => HomePage.trendProducts
)
export const retrievebestBoArticles = createSelector (
    selectHomePage,
    (HomePage) => HomePage.bestBoArticles
)
export const retrievetrendBoArticles = createSelector (
    selectHomePage,
    (HomePage) => HomePage.trendBoArticles
)
export const retrievenewsBoArticles = createSelector (
    selectHomePage,
    (HomePage) => HomePage.newsBoArticles
)
export const retrieveEvents = createSelector (
    selectHomePage,
    (HomePage) => HomePage.events
)