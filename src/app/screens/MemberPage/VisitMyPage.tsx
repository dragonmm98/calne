import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Pagination, PaginationItem, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SettingsIcon from "@mui/icons-material/Settings";
import  FacebookIcon  from "@mui/icons-material/Facebook";
import  InstagramIcon  from "@mui/icons-material/Instagram";
import  TelegramIcon  from "@mui/icons-material/Telegram";
import  YoutubeIcon  from "@mui/icons-material/YouTube";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySetting";
import { TuiEditor } from "../../components/TuiEditor/TuiEditor";
import TViewer from "../../components/TuiEditor/TViewer";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle } from "./slice";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import { retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle } from "./selector";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiService/communityApiService";
import MemberApiService from "../../apiService/memberApiService";
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

export function VisitMyPage(props: any) {
    /** INITIALIZATIONS **/
    const {setChosenMember,
         setChosenMemberBoArticles,
         setChosenSingleBoArticle} = actionDispatch(useDispatch());
   
    const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
    const {chosenSingleBoArticle} = useSelector(chosenSingleBoArticleRetriever);
    const {chosenMember} = useSelector(chosenMemberRetriever);

    const [value,setValue] = useState("1");
    const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
    const [followRebuild, setFollowRebuild] = useState<boolean>(false)
    const [memberArticleSearchObj,setMemberArticleSearchObj] = useState<SearchMemberArticlesObj>({
        mb_id: "none", page: 1, limit: 5
    });

    useEffect(() => {
      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true, true);
      }

      const communityService = new CommunityApiService();
      const memberService = new MemberApiService();

      communityService.getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

      memberService.getChosenMember(verifiedMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));

    }, [memberArticleSearchObj,articleRebuild,followRebuild])

    /** HANDLERS**/
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };
  
        const handlePaginationChange = (event: any, value: number) => {
            memberArticleSearchObj.page = value;
            setMemberArticleSearchObj({...memberArticleSearchObj});
        };

    const renderChosenArticleHandler =  async (art_id:string) => {
    try {
      const communityService = new CommunityApiService();
      communityService.getChosenArticle(art_id)
      .then((data) => {
        setChosenSingleBoArticle(data);
      setValue("5")})
      .catch((err) => console.log(err));

    } catch (err: any) {
        console.log (err);
        sweetErrorHandling(err).then()
    }
    }
    
    return (
         <div className="my_page">
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px"}}>
               <Stack className="my_page_frame">
                <TabContext value={value}>
                    <Stack className="my_page_left">
                        <Box display={"flex"} flexDirection={"column"}>
                            <TabPanel value="1">
                                <Box className={"menu_name"}>Mening Maqolalarim</Box>
                                <Box className={"menu_content"}>
                                     <MemberPosts 
                                     chosenMemberBoArticles={chosenMemberBoArticles}
                                     renderChosenArticleHandler={renderChosenArticleHandler}
                                     setArticleRebuild={setArticleRebuild}
                                     />
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
                                     <MemberFollowers actions_enabled={true}
                                     setFollowRebuild={setFollowRebuild}
                                     followRebuild={followRebuild}
                                     mb_id={props.verifiedMemberData?._id}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value="3" >
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing actions_enabled={true}
                                        setFollowRebuild={setFollowRebuild}
                                        followRebuild={followRebuild}
                                        mb_id={props.verifiedMemberData?._id}/>
    
                                    </Box>
                                </TabPanel>

                                <TabPanel value="4">
                                    <Box className={"menu_name"}>Maqola Yozish</Box>
                                    <Box className={"write_content"}>
                                        <TuiEditor setValue={setValue}
                                        setArticleRebuild={setArticleRebuild}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value="5">
                                    <Box className={"menu_name"}>Tanlangan Maqola</Box>
                                    <Box className={"menu_content"}>
                                        <TViewer chosenSingleBoArticle={chosenSingleBoArticle}/>
    
                                    </Box>
                                </TabPanel>

                                <TabPanel value="6">
                                    <Box className={"menu_name"}>My Setting</Box>
                                    <Box className={"menu_content"}>
                                      <MySettings/>
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
                                <img src={verifiedMemberData?.mb_image} alt=""
                        className="order_user_avatar"/>
                        <img  className="avatar_1" src={ chosenMember?.mb_type === "DEALER" 
                                ? "/restaurant/Rectangle 4391.png" 
                                : "/icons/user1.svg"} alt=""/>
                        <a onClick={() => setValue("6")} className={"settings_btn"}> 
                            <SettingsIcon/>
                            </a>
                         </div>
                         <span className="Ismoilov-Akmaljon">
                                {chosenMember?.mb_nick}
                               </span>
                            <span className="Foydalanuvchi">
                                    {chosenMember?.mb_type}
                             </span> 
                            </Box>
                            <Box className={"user_media_box1"}>
                                <FacebookIcon/>
                                <InstagramIcon/>
                                <TelegramIcon/>
                                <YoutubeIcon/>
                            </Box>
                            <Box className={"user_media_box"}>
                                <p className="follows">Followers {chosenMember?.mb_subscriber_cnt}</p>
                                <p className="follows">Following {chosenMember?.mb_follow_cnt}</p>
                            </Box>
                            <p>{chosenMember?.mb_description ?? "no extra info"}</p>
                            <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            sx={{mt: "10px"}}
                            >
                                <TabList
                                orientation="vertical"
                                variant="scrollable"
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                style={{width: "95%"}}
                                >
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"4"}
                                    component={(e) => (
                                        <Button
                                        className="maqola_btn"
                                        variant="contained"
                                        onClick={() => setValue("4")}
                                        > 
                                        Maqola Yozish
                                        </Button>
                                    )}
                                    />               
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
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue("1")}
                                        > 
                                        <img src="/icons/post.svg" alt=""/>
                                        <span>Maqolalarim</span>
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