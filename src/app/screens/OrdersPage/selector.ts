import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";


const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrieveProcessOrders = createSelector(
    selectOrdersPage,
    (OrderPage) => OrderPage.processOrders
);
export const retrievePausedOrders = createSelector(
    selectOrdersPage,
    (OrderPage) => OrderPage.pausedOrders
);
export const retrieveFinishedOrders = createSelector(
    selectOrdersPage,
    (OrderPage) => OrderPage.finishedOrders
);
