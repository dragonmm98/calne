import React from "react";
import moment from "moment";
import { Box, Checkbox, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/joy";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import MemberApiService from "../../apiService/memberApiService";
import { Definer } from "../../../lib/Definer";

export function MemberPosts (props:any) {
const {chosenMemberBoArticles,renderChosenArticleHandler,setArticleRebuild} = props;

//** HANDLERS**/
const targetLikeHandler = async (e:any) => {
    try {
        e.stopPropagation();

       assert.ok(localStorage.getItem("member_data"), Definer.auth_err1)

       const memberService = new MemberApiService();
       const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id, 
        group_type: "community",
         })
         assert.ok (like_result, Definer.general_err1);
         await sweetTopSmallSuccessAlert("success", 800, false);
         setArticleRebuild(new Date());
    } catch (err:any) {
  console.log (err);
  sweetErrorHandling(err).then();
    }

}

    return (
        <Stack className={"post_content"} style={{gap: "15px"}}>
            {chosenMemberBoArticles.map((article: BoArticle) => {
                const image_path = article.art_image ? `${serverApi}/${article.art_image}` 
                :  "/community/xasbulla.webp";
                return (
                    <Stack className="all_article_box"
                    sx={{cursor: "pointer"}}
                    onClick={() => renderChosenArticleHandler(article?._id)}
                
                    >
                        <Box className={"all_article_img"}
                        sx={{backgroundImage: `url(${image_path})`}}> 
                        </Box>
                        <Box className={"all_article_container"}>
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                src= {article?.members_data?.mb_image 
                                    ? `${serverApi}/${article.members_data.mb_image}` 
                                    : "/dealers/cardealer.jpg"}
                                width={"35px"}
                                height={"35px"}
                                style={{borderRadius: "50%", backgroundSize: "cover"}}
                                alt=""
                                />
                                <span className="all_article_author_user">
                                    {article?.members_data?.mb_nick}</span>
                            </Box>
                            <Box
                            display={"flex"}
                            flexDirection={"column"}
                            sx={{mt: "15px"}}
                            >
                                <span className="all_article_title">{article?.bo_id}</span>
                                <p className="all_article_desc">
                                    {article?.art_subject}
                                </p>
                            </Box>

                            </Box>

                            <Box className={"time_moment"}>
                            <p className="data_comp">
                                    {moment(article?.createdAt).format("YY-MM-DD HH:MM")}
                                </p>
                                <Box className={"heartandeye"}>
                                <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: "md",
                                    color: "white",
                                    alignItems: "center",
                                    display: "flex",
                                    }}
                                    >
                                    <Checkbox
                             
                             icon={<FavoriteBorder style={{ fill: "white" }} />}
                             checkedIcon={<Favorite style={{ fill: "red" }} />}
                             id={article?._id}
                             onClick={targetLikeHandler}
                             checked={
                               article?.me_liked && article?.me_liked[0]?.my_favorite
                                 ? true
                                 : false
                             }
                           />
                                    <div style={{marginLeft: "10px"}}>{article?.art_likes}</div>
                                </Typography>
                                
                                <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: "md",
                                    color: "white",
                                    alignItems: "center",
                                    display: "flex",
                                }}>
                                  <VisibilityIcon sx={{fontSize:20, marginLeft:"5px"}}/>
                                  <div style={{marginLeft: "6px"}}>{article?.art_views}</div>
                                </Typography>
                                
                                
                                </Box>
                            
                                

                            </Box>
                    </Stack>
                )
            })}

        </Stack>
    )
}