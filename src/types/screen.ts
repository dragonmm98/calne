import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState {
    homePage: HomePageState;
    restaurantPage: RestaurantPageState;
}

export interface HomePageState {
    topRestaurants: Restaurant[];
    bestRestaurants: Restaurant[];
    trendProducts:Product[];
    bestBoArticles: BoArticle[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}


//** RESTAURANT PAGE**/
export interface RestaurantPageState {
    targetRestaurants: Restaurant[];
    randomRestaurants: Restaurant[];
    chosenRestaurant: Restaurant | null;
    targetProducts: Product[];
    chosenProduct: Product | null;
}