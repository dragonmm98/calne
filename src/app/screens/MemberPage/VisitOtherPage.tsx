import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Pagination, PaginationItem, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import  FacebookIcon  from "@mui/icons-material/Facebook";
import  InstagramIcon  from "@mui/icons-material/Instagram";
import  TelegramIcon  from "@mui/icons-material/Telegram";
import  YoutubeIcon  from "@mui/icons-material/YouTube";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import TViewer from "../../components/TuiEditor/TViewer";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle } from "./slice";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import { retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle } from "./selector";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiService/memberApiService";
import CommunityApiService from "../../apiService/communityApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import FollowApiService from "../../apiService/followApiService ";
import { verifiedMemberData } from "../../apiService/verify";

  //Redux Slice
  const actionDispatch = (dispach: Dispatch) => ({
    setChosenMember: (data:Member) => dispach(setChosenMember(data)),
    setChosenMemberBoArticles: (data:BoArticle[]) => dispach(setChosenMemberBoArticles(data)),
    setChosenSingleBoArticle: (data:BoArticle) => dispach(setChosenSingleBoArticle(data))
  });


//Redux Selector
const chosenMemberRetriever = createSelector(retrieveChosenMember,
    (chosenMember)=>({
        chosenMember,
    })
  );
  const chosenMemberBoArticlesRetriever = createSelector(retrieveChosenMemberBoArticles,
    (chosenMemberBoArticles)=>({
        chosenMemberBoArticles,
    })
  );
  const chosenSingleBoArticleRetriever = createSelector(retrieveChosenSingleBoArticle,
    (chosenSingleBoArticle)=>({
        chosenSingleBoArticle,
    })
  );

export function VisitOtherPage(props: any) {
    /** INITIALIZATIONS **/
    const history  = useHistory()
    const {chosen_mb_id,chosen_art_id} = props;
    const {setChosenMember,
        setChosenMemberBoArticles,
        setChosenSingleBoArticle} = actionDispatch(useDispatch());
  
   const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
   const {chosenSingleBoArticle} = useSelector(chosenSingleBoArticleRetriever);
   const {chosenMember} = useSelector(chosenMemberRetriever);
   const [followRebuild, setFollowRebuild] = useState<boolean>(false)
   const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
    const [value,setValue] = useState("1");
    const [memberArticleSearchObj,setMemberArticleSearchObj] = useState<SearchMemberArticlesObj>({
        mb_id: chosen_mb_id, page: 1, limit: 5
    });

    useEffect(() => {
       if(chosen_mb_id === verifiedMemberData?._id) {
        history.push("/member-page");
       }
       const communityService = new CommunityApiService();
       if(chosen_art_id) {
        communityService.getChosenArticle(chosen_art_id)
        .then((data) => {
            setChosenSingleBoArticle(data);
            setValue("4")
        }).catch((err) => console.log(err));
       }

      communityService.getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
    }, [memberArticleSearchObj, chosen_mb_id, articleRebuild])

    useEffect(() => {
        if(chosen_mb_id === verifiedMemberData?._id) {
         history.push("/member-page");
        }
        
      const memberService = new MemberApiService();
      memberService.getChosenMember(memberArticleSearchObj?.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
     }, [verifiedMemberData, chosen_mb_id,followRebuild])
    /** HANDLERS**/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const subscribeHandler = async (e: any ) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            
            const followService = new FollowApiService();
            await followService.subscribe(e.target.value);
        
        await sweetTopSmallSuccessAlert("subscribed successfully", 800, false);
        setFollowRebuild(!followRebuild);
        } catch (err:any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
      }
      const unsubscribeHandler = async (e: any ) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            
            const followService = new FollowApiService();
            await followService.unsubscribe(e.target.value);
        
        await sweetTopSmallSuccessAlert("unsubscribed successfully", 800, false);
        setFollowRebuild(!followRebuild);
        } catch (err:any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
      }
    const renderChosenArticleHandler =  async (art_id:string) => {
        try {
          const communityService = new CommunityApiService();
          communityService.getChosenArticle(art_id)
          .then((data) => {
            setChosenSingleBoArticle(data);
          setValue("4")})
          .catch((err) => console.log(err));
    
        } catch (err: any) {
            console.log (err);
            sweetErrorHandling(err).then()
        }
        }
        const handlePaginationChange = (event: any, value: number) => {
            memberArticleSearchObj.page = value;
            setMemberArticleSearchObj({...memberArticleSearchObj});
        };
        
      
    return (
         <div className="my_page">
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px"}}>
               <Stack className="my_page_frame">
                <TabContext value={value}>
                    <Stack className="my_page_left">
                        <Box display={"flex"} flexDirection={"column"}>
                            <TabPanel value="1">
                                <Box className={"menu_name"}>Feedbacks</Box>
                                <Box className={"menu_content"}>
                                     <MemberPosts
                                     chosenMemberBoArticles={chosenMemberBoArticles}
                                     setArticleRebuild={setArticleRebuild}
                                     renderChosenArticleHandler={renderChosenArticleHandler}/>
                                     <Stack
                                     sx={{my: "40px"}}
                                     direction="row"
                                     alignItems={"center"}
                                     justifyContent={"center"}>
                                        <Box className="bottom_box">
                                        <Pagination
                                  count={memberArticleSearchObj.page >= 3 
                                    ? memberArticleSearchObj.page + 1 : 3 }
                                  page={memberArticleSearchObj.page}
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
                                </Box>
                                </TabPanel>
                                
                                <TabPanel value="2" >
                                    <Box className={"menu_name"}>Followers</Box>
                                    <Box className={"menu_content"}>
                                     <MemberFollowers actions_enabled={false}
                                     mb_id={chosen_mb_id}
                                     setFollowRebuild={setFollowRebuild}
                                     followRebuild={followRebuild}
                                     />
                                    </Box>
                                </TabPanel>

                                <TabPanel value="3" >
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing actions_enabled={false}
                                        mb_id={chosen_mb_id}
                                        setFollowRebuild={setFollowRebuild}
                                     followRebuild={followRebuild}
                                        />
    
                                    </Box>
                                </TabPanel>


                                <TabPanel value="4">
                                    <Box className={"menu_name"}>Chosen Feedback</Box>
                                    <Box className={"menu_content"}>
                                      <TViewer chosenSingleBoArticle={chosenSingleBoArticle}/>
                                    </Box>
                                </TabPanel>

                        </Box>
                        </Stack>

                        <Stack className="my_page_right"> 
                           <Box className={"order_info_box"}>
                            
                            <Box 
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            >
                            
                                <div className="order_user_img">
                                <img src="/dealers/cardealer.jpg" alt=""
                        className="order_user_avatar"/>
                        <img  className="avatar_1" src="/icons/user1.svg" alt=""/>
                         </div>
                         <span className="Ismoilov-Akmaljon">
                                {chosenMember?.mb_nick}
                               </span>
                            <span className="Foydalanuvchi">
                                    {chosenMember?.mb_type}
                             </span> 
                            </Box>
                            <Box className={"user_media_box1"}>
                            <ul className="social-icons">
      <li><a href="https://www.facebook.com/"><i className="fa fa-instagram"><FacebookIcon/></i></a></li>
      <li><a href="https://www.instagram.com/"><i className="fa fa-twitter"><InstagramIcon/></i></a></li>
      <li><a href="https://www.telegram.com/"><i className="fa fa-linkedin"><TelegramIcon/></i></a></li>
      <li><a href="https://www.youtube.com/"><i className="fa fa-codepen"><YoutubeIcon/></i></a></li>
    </ul>
                            </Box>
                            <Box className={"user_media_box"}>
                                <p className="follows">Followers {chosenMember?.mb_subscriber_cnt}</p>
                                <p className="follows">Following {chosenMember?.mb_follow_cnt}</p>
                            </Box>
                            <p>{chosenMember?.mb_description ?? "no extra info" } </p>
                            <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            sx={{mt: "10px"}}
                            >
                                <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                >
                                   {chosenMember?.me_followed 
                                   && chosenMember.me_followed[0]?.my_following ? (  
                                   <Tab
                                    style={{flexDirection: "column"}}
                                    value={"4"}
                                    component={(e) => (
                                        <Button
                                        value={chosenMember?._id}
                                        style={{backgroundColor: "#f70909b8"}}
                                        className="maqola_btn"
                                        variant="contained"
                                        onClick={unsubscribeHandler}
                                        > 
                                        Unfollow
                                        </Button>
                                    )}
                                    />               
                                   ) : ( 
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"4"}
                                    component={(e) => (
                                        <Button
                                        value={chosenMember?._id}
                                        style={{backgroundColor: "#30945e"}}
                                        className="maqola_btn"
                                        variant="contained"
                                        onClick={subscribeHandler}
                                        > 
                                        Follow 
                                        </Button>
                                    )}
                                    />
                                   )}
                                </TabList>
                            </Box>
                           </Box>

                           <Box className="my_page_menu">
                           <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                style={{display: "flex", flexDirection: "column", cursor: "grab"}}
                                >
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"1"}
                                    component={(e) => (
                                        <div
                                        className={`menu_box ${e}`}
                                        onClick={() => setValue("1")}
                                        > 
                                        <img src="/icons/post.svg" alt=""/>
                                        <span>Feedbacks</span>
                                        </div>
                                    )}
                                    />
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"2"}
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue("2")}
                                        > 
                                        <img src="/icons/followers.svg" alt=""/>
                                        <span>Followers</span>
                                        </div>
                                    )}
                                    />
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"3"}
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue("3")}
                                        > 
                                        <img src="/icons/following.svg" alt=""/>
                                        <span>Following</span>
                                        </div>
                                    )}
                                    />                                     
                                </TabList>
                           </Box>
                        </Stack>

                </TabContext>
               </Stack>
            </Container>
         </div>
    );
}