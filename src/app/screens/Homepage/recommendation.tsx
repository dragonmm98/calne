import { Avatar, Box, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { BoArticle } from "../../../types/boArticle";
import { setBestBoArticles, setNewsBoArticles, setTrendBoArticles } from "./slice";
import { retrievebestBoArticles, retrievenewsBoArticles, retrievetrendBoArticles } from "./selector";
import CommunityApiService from "../../apiService/communityApiService";
import { serverApi } from "../../../lib/config";
import TViewer from "../../components/TuiEditor/TViewer";


  //Redux Slice
  const actionDispatch = (dispach: Dispatch) => ({
    setBestBoArticles: (data:BoArticle[]) =>
     dispach(setBestBoArticles(data)),
     setTrendBoArticles: (data:BoArticle[]) =>
     dispach(setTrendBoArticles(data)),
     setNewsBoArticles: (data:BoArticle[]) =>
     dispach(setNewsBoArticles(data))
  });
    


//Redux Selector
const bestBoArticlesRetriever = createSelector(retrievebestBoArticles,
    (bestBoArticles)=>({
        bestBoArticles,
    })
  );
  const trendBoArticlesRetriever = createSelector(retrievetrendBoArticles,
    (trendBoArticles)=>({
        trendBoArticles,
    })
  );
  const newsBoArticlesRetriever = createSelector(retrievenewsBoArticles,
    (newsBoArticles)=>({
        newsBoArticles,
    })
  );


export function Recommendation () {
     /***INZITIZALIZATIONS ***/
     const {setBestBoArticles,setNewsBoArticles,setTrendBoArticles} = 
     actionDispatch(useDispatch());
     const {bestBoArticles} = useSelector(bestBoArticlesRetriever);
     const {trendBoArticles} = useSelector(trendBoArticlesRetriever);
     const {newsBoArticles} = useSelector(newsBoArticlesRetriever);
     
     useEffect(() => {
       const communityService = new CommunityApiService();
       communityService.getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_views",
       })
       .then((data) => setBestBoArticles(data))
       .catch((err) => console.log(err));

       communityService.getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_likes",
       })
       .then((data) => setTrendBoArticles(data))
       .catch((err) => console.log(err));

       communityService.getTargetArticles({
        bo_id: "celebrity",
        page: 1,
        limit: 2,
        order: "art_views",
       })
       .then((data) => setNewsBoArticles(data))
       .catch((err) => console.log(err))
     }, [])
    return (
        <div className="top_article_frame">
            <Container
            maxWidth="lg"
            sx={{mb:"50px", mt:"60px"}}
            style={{position:"relative"}}>
                <Stack 
                flexDirection={"column"}
                alignItems="center"
                sx={{mt:"45px"}}>
                    <Box className="category_title">Recommended Articles</Box>
                    <Stack className="article_main" flexDirection={"row"}>
                        <Stack className="article_container">
                            <Box className="article_category">Most viewed</Box>
                            {bestBoArticles?.map((article: BoArticle) => {
                                const art_image_url = article?.art_image 
                                ? `${serverApi}/${article?.art_image}` : "/community/xasbulla.webp"
                                return (
                                    <Stack className="article_box" key={article?._id}>
                                    <Box
                                    className="article_img"
                                    sx={{backgroundImage: `url(${art_image_url})`}}
                                    ></Box>
                                    <Box className="article_info">
                                 <Box className="article_main_info">
                                    <div className="article_author">
                                     <Avatar
                                      alt="Author_photo"
                                   src={article?.members_data?.mb_image 
                                    ? `${serverApi}/${article?.members_data?.mb_image}` 
                                    : "/icons/default_user.svg"}
                                      sx={{width:"35px", heigh:"35px"}}/>
                                  <span className="author_username">{article?.members_data?.mb_nick}</span>
                                    </div>
                                 <span className="article_title">{article?.art_subject}</span>
                                     <p className="article_desc"></p>
                                        </Box>
                                    </Box>
                                </Stack>
                                )
                                
                            })}

                           
                            <Box className="article_category">Most liked</Box>

                            {trendBoArticles?.map((article: BoArticle) => {
                                const art_image_url = article?.art_image 
                                ? `${serverApi}/${article?.art_image}` : "/community/xasbulla.webp"
                                return (
                                    <Stack className="article_box" key={article?._id}>
                                    <Box
                                    className="article_img"
                                    sx={{backgroundImage: `url(${art_image_url})`}}
                                    ></Box>
                                    <Box className="article_info">
                                 <Box className="article_main_info">
                                    <div className="article_author">
                                     <Avatar
                                      alt="Author_photo"
                                   src={article?.members_data?.mb_image 
                                    ? `${serverApi}/${article?.members_data?.mb_image}` 
                                    : "/icons/default_user.svg"}
                                      sx={{width:"35px", heigh:"35px"}}/>
                                  <span className="author_username">{article?.members_data?.mb_nick}</span>
                                    </div>
                                 <span className="article_title">{article?.art_subject}</span>
                                     <p className="article_desc"></p>
                                        </Box>
                                    </Box>
                                </Stack>
                                )
                                
                            })}

                      </Stack>
                      <Stack className="article_container">
                            <Box className="article_category">Famous People</Box>
                            {newsBoArticles?.map((article: BoArticle) => {
                                return (
                                    <Box className="article_news">
                                   <TViewer chosenSingleBoArticle={article} />
                                </Box>
                                )
                            })}
                            
                        </Stack>



                    </Stack>
                    </Stack>

            </Container>
        </div>
    )
}