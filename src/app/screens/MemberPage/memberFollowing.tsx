import { Avatar, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";
import { Following, FollowSearchObj } from "../../../types/follow";
import { retrieveMemberFollowings } from "./selector";
import FollowApiService from "../../apiService/followApiService ";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";



  //Redux Slice
  const actionDispatch = (dispach: Dispatch) => ({
    setMemberFollowings: (data:Following[]) =>
     dispach(setMemberFollowings(data)),
  });


//Redux Selector
const memberFollowingsRetriever = createSelector(retrieveMemberFollowings,
    (memberFollowings)=>({
        memberFollowings,
    })
  );



export function MemberFollowing (props: any) {
      /***INZITIZALIZATIONS ***/
      const history = useHistory();
      const {setFollowRebuild,followRebuild, mb_id} = props;
      const {setMemberFollowings} = actionDispatch(useDispatch());
      const {memberFollowings} = useSelector(memberFollowingsRetriever);
      const [followingSearchObj,setFollowingSearchObj] = 
      useState<FollowSearchObj>({page: 1, limit: 5, mb_id: mb_id});

      useEffect(() => {
        const followService = new FollowApiService();
        followService.getMemberFollowings(followingSearchObj)
        .then((data) => setMemberFollowings(data))
        .catch((err) => console.log(err))
      }, [followingSearchObj,followRebuild]);

      //***HANDLERS***/
      const handlePaginationChange = (event: any, value: number) => {
        followingSearchObj.page = value;
        setFollowingSearchObj({...followingSearchObj});
    };

      const unsubscribeHandler = async (e: any, id: string ) => {
        try {
            e.stopPropagation();
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            
            const followService = new FollowApiService();
            await followService.unsubscribe(id);
        
        await sweetTopSmallSuccessAlert("unsubscribed successfully", 800, false);
        setFollowRebuild(!followRebuild);
        } catch (err:any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
      }
      const visitMemberHandler = (mb_id:string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
      }

    return (
        <Stack style={{gap: "15px", marginTop: "15px"}}>
            {memberFollowings.map((following: Following) => {
                 const image_url = following?.follow_member_data?.mb_image 
                 ? `${serverApi}/${following.follow_member_data.mb_image}` 
                 : "/icons/default_user.svg";
                return (
                    <Box className={"follow_box"}>
                        <Avatar
                         style={{cursor: "pointer"}} 
                         onClick={() => visitMemberHandler(following?.follow_id)}
                         alt="" src={image_url} sx={{width: 89, height: 89}}/>
                            <div 
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85px",
                            }}>
                                <span className="username_txt">{following.follow_member_data.mb_type}</span>
                                <span className="name_txt"
                                 style={{cursor: "pointer"}} 
                                 onClick={() => visitMemberHandler(following?.follow_id)}>{following?.follow_member_data.mb_nick}</span>
                            </div>

                            {props.actions_enabled && (
                             
                                <Button
                                variant="contained"
                                startIcon={
                                    <img src="/icons/followicon.svg" alt=""
                                    style={{width: "39px", marginLeft: "15px"}}
                                    />
                                }
                                className={"follow_cancel_btn"}
                                onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                                >
                                  Bekor Qilish
                                </Button>
                            )}
                    </Box>
                );
            })}
            <Stack
                                     sx={{my: "40px"}}
                                     direction="row"
                                     alignItems={"center"}
                                     justifyContent={"center"}>
                                        <Box className="bottom_box">
                                        <Pagination
                                  count={followingSearchObj.page >= 3 
                                    ? followingSearchObj.page + 1 : 3}
                                  page={followingSearchObj.page}
                                  renderItem={(item) => (
                                    <PaginationItem
                                    style={{color: "white"}}
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                    />
                                  )} 
                                  onChange={handlePaginationChange}
                                  />
                                  </Box>
                                 </Stack>
        </Stack>
    );
}