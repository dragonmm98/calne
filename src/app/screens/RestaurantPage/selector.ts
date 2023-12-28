import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectRestaurantPage = (state: AppRootState) => state.restaurantPage;

export const retrieveTargetRestaurants = createSelector(
    selectRestaurantPage,
    (RestaurantPage) => RestaurantPage.targetRestaurants
);
export const retrieveRandomRestaurants = createSelector(
    selectRestaurantPage,
    (RestaurantPage) => RestaurantPage.randomRestaurants
);
export const retrieveChosenRestaurant = createSelector(
    selectRestaurantPage,
    (RestaurantPage) => RestaurantPage.chosenRestaurants
);
export const retrieveTargetProducts = createSelector(
    selectRestaurantPage,
    (RestaurantPage) => RestaurantPage.targetProducts
);
export const retrieveChosenDish = createSelector(
    selectRestaurantPage,
    (RestaurantPage) => RestaurantPage.chosenProduct
);