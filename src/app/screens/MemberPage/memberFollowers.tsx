import { Avatar, Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "./slice";
import { Follower, FollowSearchObj } from "../../../types/follow";
import { retrieveMemberFollowers } from "./selector";
import FollowApiService from "../../apiService/followApiService ";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";


  //Redux Slice
  const actionDispatch = (dispach: Dispatch) => ({
    setMemberFollowers: (data:Follower[]) =>
     dispach(setMemberFollowers(data)),
  });


//Redux Selector
const memberFollowersRetriever = createSelector(retrieveMemberFollowers,
    (memberFollowers)=>({
        memberFollowers,
    })
  );


export function MemberFollowers (props: any) {
      /***INZITIZALIZATIONS ***/
      const {setFollowRebuild,followRebuild, mb_id} = props;
      const {setMemberFollowers} = actionDispatch(useDispatch());
      const {memberFollowers} = useSelector(memberFollowersRetriever);
      const [followersSearchObj,setFollowersSearchObj] = 
      useState<FollowSearchObj>({page: 1, limit: 5, mb_id: mb_id});

      useEffect(() => {
        const followService = new FollowApiService();
        followService.getMemberFollowers(followersSearchObj)
        .then((data) => setMemberFollowers(data))
        .catch((err) => console.log(err))
      }, [followersSearchObj,followRebuild]);

      //***HANDLERS***/
      const subscribeHandler = async (e: any, id: string ) => {
        try {
            e.stopPropagation();
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            
            const followService = new FollowApiService();
            await followService.subscribe(id);
        
        await sweetTopSmallSuccessAlert("subscribed successfully", 800, false);
        setFollowRebuild(!followRebuild);
        } catch (err:any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
      }

    return (
        <Stack style={{gap: "15px", marginTop: "15px"}}>
            {memberFollowers.map((follower: Follower) => {
                const image_url = follower?.subscriber_member_data?.mb_image 
                ? `${serverApi}/${follower.subscriber_member_data.mb_image}` 
                : "/icons/default_user.svg";
                return (
                    <Box className={"follow_box"}>
                        <Avatar alt="" src={image_url} sx={{width: 89, height: 89}}/>
                            <div 
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85px",
                            }}>
                                <span className="username_txt">{follower?.subscriber_member_data?.mb_type}</span>
                                <span className="name_txt">{follower?.subscriber_member_data?.mb_nick}</span>
                            </div>
                            {props.actions_enabled && 
                            (follower?.me_followed && follower.me_followed[0]?.my_following ?(
                                <Button
                                variant="contained"
                                className="following_already"
                                >
                                  FOLLOWING
                                </Button>
                            ) : (
                            <Button
                            variant={"contained"}
                            startIcon={
                                <img src="/icons/followicon.svg" alt=""
                                style={{width: "30px", height: "28px"}}
                                />
                            }
                            className={"follow_btn"}
                            onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                            > 
                            Follow Back
                            </Button>
                              ))}
                    </Box>
                );
            })}
        </Stack>
    );
}