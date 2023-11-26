
import { Typography } from "@mui/joy";
import { Box, Link, Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import  FavoriteIcon  from "@mui/icons-material/Favorite";



export function TargetArticles(props: any) {
    return (
        <Stack style={{gap: "15px"}}>
            {props.targetBoArticles?.map((article: any, index: string) =>{
                const art_image_url = "/community/xasbulla.webp";
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
                                <span className="all_article_author_user">Alex</span>
                            </Box>
                            <Box
                            display={"flex"}
                            flexDirection={"column"}
                            sx={{mt: "15px"}}
                            >
                                <span className="all_article_title">evoluation</span>
                                <p className="all_article_desc">
                                    Black Bear is amazing restaurant
                                </p>
                            </Box>

                            </Box>

                            <Box className={"time_moment"}>
                            <p className="data_comp">
                                    {moment().format("YY-MM-DD HH:MM")}
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
                                    <FavoriteIcon sx={{fontSize:20, marginLeft: "5px",}}/>
                                    <div style={{marginLeft: "10px"}}>2</div>
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
                                  <div style={{marginLeft: "6px"}}>2</div>
                                </Typography>
                                
                                
                                </Box>
                            
                                

                            </Box>
                    </Link>
                )
            })}
        </Stack>
    );
}    