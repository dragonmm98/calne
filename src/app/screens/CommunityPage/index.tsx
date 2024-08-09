import { TabContext, TabPanel } from "@mui/lab";
import Tab from '@mui/material/Tab';
import TabList from "@mui/lab/TabList"
import { Box, Container, Stack, } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../css/community.css";
import { CommunityChats } from "./communityChats";
import { TargetArticles } from "./targetArticles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommunityApiService from "../../apiService/communityApiService";
import { BoArticle, SearchArticleObj } from "../../../types/boArticle";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";
import { useMediaQuery } from "react-responsive";

  //Redux Slice
  const actionDispatch = (dispach: Dispatch) => ({
    setTargetBoArticles: (data:BoArticle[]) =>
     dispach(setTargetBoArticles(data))
  });


//Redux Selector
const targetBoArticlesRetriever = createSelector(retrieveTargetBoArticles,
    (targetBoArticles)=>({
        targetBoArticles,
    })
  );

export function CommunityPage(props: any){
    /***INZITIZALIZATIONS ***/
    const {setTargetBoArticles} = actionDispatch(useDispatch());
    const {targetBoArticles} = useSelector(targetBoArticlesRetriever);

    const [value,setValue] = useState("1");
    const [searchArticleObj, setSearchArticleObj] = useState<SearchArticleObj>({
        bo_id: "all",
        page:1,
        limit: 5,
    });
   
    const [articleRebuild, setArticleRebuild] = useState<Date>( new Date);

    useEffect(() => {
      const communityService = new CommunityApiService;
      communityService.getTargetArticles(searchArticleObj)
      .then((data) => {setTargetBoArticles(data)})
      .catch((err) => console.log(err));
    }, [searchArticleObj,articleRebuild])
    /** Handlers**/
    const handleChange = (event:any, newValue: string) => {
     searchArticleObj.page = 1;
     switch (newValue) {
        case "1" :
         searchArticleObj.bo_id = "all";
               break;
         case "2" :
            searchArticleObj.bo_id = "dealerfeed";
            break;
         case "3" :
           searchArticleObj.bo_id = "aboutcars";
                break;
        case "4" :
          searchArticleObj.bo_id = "recommendation";
                break;
     }
      setSearchArticleObj({...searchArticleObj});
      setValue(newValue);
    };

    const handlePaginationChange = (event: any, value: number) => {
        searchArticleObj.page = value;
        setSearchArticleObj({...searchArticleObj});
    };
    const isDesktopOrLaptop = useMediaQuery({minDeviceWidth:1304})
    const isMobile = useMediaQuery({maxWidth: 1304});
   

    return(
        <div className="community_page">
          {isDesktopOrLaptop && 
        <div className="community_frame">
            <Container sx={{mt: "50px", mb: "50px"}}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                   <CommunityChats />
                   <Stack 
                   className="community_all_frame"
                   inputMode={"text"}
                   style={{border: "1px solid #fff"}}
                   >
                    <TabContext value={value}>
                        <Box className={"article_tabs"}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                
                                <TabList
                                component={"data"}
                                value={value}
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                style={{borderColor: "blue"}}
                                >
                                    <Tab sx={{color: "white"}} label="All feedbacks" value={"1"}/>
                                    <Tab sx={{color: "white"}} label="Dealer Feedback" value={"2"}/>
                                    <Tab sx={{color: "white"}} label="Car Feedbacks" value={"3"}/>
                                    <Tab sx={{color: "white"}} label="Recommendation" value={"4"}/>
                                </TabList>
                                </Box>
                                </Box>
                                
                                <Box className={"article_main"}>
                                    <TabPanel value="1">
                                        <TargetArticles targetBoArticles={targetBoArticles}
                                        setArticleRebuild={setArticleRebuild}/>
                                       </TabPanel>
                                    <TabPanel value="2">
                                    <TargetArticles targetBoArticles={targetBoArticles}
                                    setArticleRebuild={setArticleRebuild} />
                                    </TabPanel>
                                    <TabPanel value="3">
                                    <TargetArticles targetBoArticles={targetBoArticles}
                                    setArticleRebuild={setArticleRebuild}/>
                                    </TabPanel>
                                    <TabPanel value="4">
                                    <TargetArticles targetBoArticles={targetBoArticles}
                                    setArticleRebuild={setArticleRebuild}/>
                                    </TabPanel>
                                </Box>

                                <Box className={"article_bott"}>
                                  <Pagination
                                  count={
                                    searchArticleObj.page >= 3 
                                    ? searchArticleObj.page +1 : 3}
                                  page={searchArticleObj.page}
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
                                  )} onChange={handlePaginationChange}/>
                                </Box>
                                </TabContext>
                    </Stack>
                </Stack>
            </Container>
        </div>}
        {isMobile && <div style={{ backgroundColor: "white"}}>Mobile Page is under development</div>}

        </div>
        
    );
}