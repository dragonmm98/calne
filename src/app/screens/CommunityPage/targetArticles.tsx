
import { Typography } from "@mui/joy";
import { Box, Link, Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import  FavoriteIcon  from "@mui/icons-material/Favorite";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";



export function TargetArticles(props: any) {
    return (
        <Stack style={{gap: "15px"}}>
            {props.targetBoArticles?.map((article: BoArticle) =>{
                const art_image_url = article?.art_image ? `${serverApi}/${article.art_image}` : "/community/xasbulla.webp";
                return (
                    <Link className="all_article_box"
                    sx={{textDecoration: "none"}}
                    href={``}
                    >
                        <Box className={"all_article_img"}
                        sx={{backgroundImage: `url("${art_image_url}")`}}> 
                        </Box>
                        <Box className={"all_article_container"}>
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                src="/icons/default_user.svg"
                                width={"35px"}
                                style={{borderRadius: "50%", backgroundSize: "cover"}}
                                />
                                <span className="all_article_author_user">{article?.members_data.mb_nick}</span>
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
                                    {moment().format("YY-MM-DD HH:MM")}
                                </p>
                                <Box className={"heartandeye"}>
                                <Typography
                                id={article._id}
                                level="body-sm"
                                sx={{
                                    fontWeight: "md",
                                    color: "white",
                                    alignItems: "center",
                                    display: "flex",
                                    }}
                                    >
                                    <FavoriteIcon sx={{fontSize:20, marginLeft: "5px",}}/>
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
                    </Link>
                )
            })}
        </Stack>
    );
}    