import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../../types/screen";



const initialState: CommunityPageState = {
 targetBoArticles: [],
};

const communityPageSlice = createSlice({
    name: "communityPage",
    initialState,
    reducers: {
        setTargetBoArticles: (state,action) => {
            state.targetBoArticles = action.payload;
        },
    }
});

export const {setTargetBoArticles,} = communityPageSlice.actions;

const CommunityPageReducer = communityPageSlice.reducer;
export default CommunityPageReducer;