import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from "@mui/joy";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import { Swiper, SwiperSlide } from "swiper/react";
import  ArrowForwardIosIcon  from "@mui/icons-material/ArrowBackIos";



const restaurant_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(8).keys());

export function OneRestaurant() {
    return (
        <div className="single_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems="center">
                    <Stack className="avatar_big_box">
                        <Box className="top_text">
                            <p>Black Bear Restaurant</p>
                            <Box className="single_search_box">
                                <form className="single_search_form" action="" method="">
                                    <input
                                    type={"search"}
                                    className="single_searchInput"
                                    name="Single_search"
                                    placeholder="Search"/>
                                    <Button
                                    className="Single_button_search"
                                    variant="contained"
                                    endIcon={<SearchIcon/>}
                                    >
                                     Search
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Stack>
                    
                    
                    <Stack 
                    style={{
                    width:"100%", display: "flex"}}
                    flexDirection="row"
                    sx={{mt: "35px"}}>
                    <Box className={"prev_btn restaurant-prev"}>
                        <ArrowBackIosNewIcon
                        sx={{fontSize:40}}
                        style={{color: "white"}}
                        />
                     </Box>
                     <Swiper
                     className={"restaurant_avatar_wrapper"}
                     slidesPerView={7}
                     centeredSlides={false}
                     spaceBetween={30}
                     navigation={{
                        nextEl: ".restaurant-next",
                        prevEl: ".restaurant-prev",
                        }}
                        >
                       {restaurant_list.map((ele,index) => {
                        return (
                            <SwiperSlide
                            style={{cursor: "pointer"}}
                            key={index}
                            className={"restaurant_avatars"}
                            >
                              <img src="/restaurant/blackbear.jpg"/>
                              <span>Black Bear</span>
                            </SwiperSlide>
                        );
                       })}
                     </Swiper>
                     <Box className={"next_btn restaurant-next"}
                     style={{color: "white", transform: "rotate(180deg)"}}
                     >
                        <ArrowForwardIosIcon sx={{fontSize: 40}}/>
                      </Box>
                    </Stack>
                    
                    
                    <Stack 
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"flex-end"}
                    width={"90%"}
                    sx={{mt: "65px"}}>
                        <Box className={"dishs_filter_box"}>
                            <Button variant="contained" color="secondary">
                                new
                            </Button>
                            <Button variant="contained" color="secondary">
                                price
                            </Button>
                            <Button variant="contained" color="secondary">
                                likes
                            </Button>
                            <Button variant="contained" color="secondary">
                                views
                            </Button>
                        </Box>
                    </Stack>
                    
                    
                    <Stack
                    style={{width:"100%", display: "flex", minHeight: "60px"}}
                    flexDirection={"row"}>
                        <Stack className="dish_category_box">
                            <div className="dish_category_main">
                            <Button variant="contained" color="secondary">
                                boshqa
                            </Button>
                            <Button variant="contained" color="secondary">
                                desert
                            </Button>
                            <Button variant="contained" color="secondary">
                                ichimlik
                            </Button>
                            <Button variant="contained" color="secondary">
                                salad
                            </Button>
                            <Button variant="contained" color="secondary">
                                ovqatlar
                            </Button>
                            </div>
                        </Stack>
                        <Stack className={"dish_wrapper"}>
                            {product_list.map((ele,index) => {
                                const size_volume = "normal size";

                                return (
                                    <Box className={"dish_box"}>
                                        <Box 
                                        className={"dish_img"}
                                        sx={{backgroundImage: `url("https://img.freepik.com/premium-photo/nar-qovurma-turkish-stew-lamb-with-pomegranate_323283-6215.jpg?w=2000")`,
                                        }}
                                        >
                                            <div className="dish_sale">{size_volume}</div>
                                            <Button></Button>

                                        </Box>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Stack>
                
                </Stack>
            </Container>

             <div className="review_for_restaurant"></div>

             <Container className="member_reviews"> 
             </Container>
        </div>
    )
}