import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Restaurant } from "./user";
import { Event } from "./events";
import { Comment } from "./comment";

export interface AppRootState {
    homePage: HomePageState;
    restaurantPage: RestaurantPageState;
    ordersPage: OrdersPageState;
    communityPage: CommunityPageState;
    memberPage: MemberPageState;
}

export interface HomePageState {
    topRestaurants: Restaurant[];
    bestRestaurants: Restaurant[];
    trendProducts:Product[];
    bestBoArticles: BoArticle[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
    events:Event[];
}


//** RESTAURANT PAGE**/
export interface RestaurantPageState {
    targetRestaurants: Restaurant[];
    randomRestaurants: Restaurant[];
    chosenRestaurant: Restaurant | null;
    targetProducts: Product[];
    chosenProduct: Product | null;
    comment: Comment[];
}


//**Orders PAGE ***/

export interface OrdersPageState {
    pausedOrders: Order[],
    processOrders: Order[],
    finishedOrders: Order[],
}

//** Community Page**/
export interface CommunityPageState {
    targetBoArticles: BoArticle[],

}

//** MEMBER PAGE **/
export interface MemberPageState {
    chosenMember: Member | null;
    chosenMemberBoArticles: BoArticle[];
    chosenSingleBoArticle: BoArticle | null;
    memberFollowers: Follower[];
    memberFollowings: Following [];
    
}