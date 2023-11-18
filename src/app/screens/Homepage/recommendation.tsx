import { Avatar, Box, Container, Stack } from "@mui/material";
import React from "react";

export function Recommendation () {
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

                            <Stack className="article_box">
                                <Box
                                className="article_img"
                                sx={{backgroundImage: `url("https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=sph")`}}
                                ></Box>
                                <Box className="article_info">
                             <Box className="article_main_info">
                                <div className="article_author">
                                 <Avatar
                                  alt="Author_photo"
                               src="/icons/default_user.svg"
                                  sx={{width:"35px", heigh:"35px"}}/>
                              <span className="author_username">James</span>
                                </div>
                             <span className="article_title">New Taste York city</span>
                                 <p className="article_desc"></p>
                                    </Box>
                                </Box>
                            </Stack>
                            
                            <Stack className="article_box">
                                <Box
                                className="article_img"
                                sx={{backgroundImage: `url("https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=sph")`}}
                                ></Box>
                                <Box className="article_info">
                             <Box className="article_main_info">
                                <div className="article_author">
                                 <Avatar
                                  alt="Author_photo"
                               src="/icons/default_user.svg"
                                  sx={{width:"35px", heigh:"35px"}}/>
                              <span className="author_username">James</span>
                                </div>
                             <span className="article_title">New Taste York city</span>
                                 <p className="article_desc"></p>
                                    </Box>
                                </Box>  
                            </Stack>

                            <Box className="article_category">Most liked</Box>

                            <Stack className="article_box">
                                <Box
                                className="article_img"
                                sx={{backgroundImage: `url("https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=sph")`}}
                                ></Box>
                                <Box className="article_info">
                             <Box className="article_main_info">
                                <div className="article_author">
                                 <Avatar
                                  alt="Author_photo"
                               src="/icons/default_user.svg"
                                  sx={{width:"35px", heigh:"35px"}}/>
                              <span className="author_username">James</span>
                                </div>
                             <span className="article_title">New Taste York city</span>
                                 <p className="article_desc"></p>
                                    </Box>
                                </Box>
                            </Stack>
                            
                            <Stack className="article_box">
                                <Box
                                className="article_img"
                                sx={{backgroundImage: `url("https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=sph")`}}
                                ></Box>
                                <Box className="article_info">
                             <Box className="article_main_info">
                                <div className="article_author">
                                 <Avatar
                                  alt="Author_photo"
                               src="/icons/default_user.svg"
                                  sx={{width:"35px", heigh:"35px"}}/>
                              <span className="author_username">James</span>
                                </div>
                             <span className="article_title">New Taste York city</span>
                                 <p className="article_desc"></p>
                           </Box>
                         </Box>  
                       </Stack>
                      </Stack>
                      <Stack className="article_container">
                            <Box className="article_category">Famous People</Box>
                            <Box className="article_news">
                                <h1 style={{color:"orange"}}>TVviewer</h1>
                            </Box>
                            <Box className="article_news">
                                <h1 style={{color:"orange"}}>TVviewer</h1>
                                /</Box>
                        </Stack>



                    </Stack>
                    </Stack>

            </Container>
        </div>
    )
}