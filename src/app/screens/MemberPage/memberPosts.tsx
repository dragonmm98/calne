import React from "react";
import moment from "moment";
import { Box, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import  FavoriteIcon  from "@mui/icons-material/Favorite";
import { Typography } from "@mui/joy";

export function MemberPosts (props:any) {
    return (
        <Box className={"post_content"}>
            {["1"].map((article) => {
                return (
                    <Stack className="all_article_box"
                    sx={{cursor: "pointer"}}
                
                    >
                        <Box className={"all_article_img"}
                        sx={{backgroundImage: `url("/community/xasbulla.webp")`}}> 
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
                                <span className="all_article_title">Resto Baho</span>
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
                    </Stack>
                )
            })}

        </Box>
    )
}