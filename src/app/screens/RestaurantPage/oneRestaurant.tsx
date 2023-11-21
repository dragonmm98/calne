import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import { Swiper, SwiperSlide } from "swiper/react";
import  ArrowForwardIosIcon  from "@mui/icons-material/ArrowBackIos";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import  MonetizationOnIcon  from "@mui/icons-material/MonetizationOn";






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
                                    <Box className={"dish_box"} key={`${index}`}>
                                        <Box 
                                        className={"dish_img"}
                                        sx={{backgroundImage: `url("https://img.freepik.com/premium-photo/nar-qovurma-turkish-stew-lamb-with-pomegranate_323283-6215.jpg?w=2000")`,
                                        }}
                                        >
                                            <div className="dish_sale">{size_volume}</div>
                                            <Button
                                            className="like_view_btn"
                                            style={{left: "36px"}}>
                                                <Badge badgeContent={8} color="primary">
                                                    <Checkbox 
                                                    icon={<FavoriteBorder style={{color: "white"} }/> }
                                                    id={`${index}`}
                                                    checkedIcon={<Favorite style={{color: "red"}}/>}
                                                    checked={true}
                                                    />
                                                

                                                    

                                                </Badge>
                                            </Button>
                                            <Button className="view_btn">
                                                <img src="/icons/shopping_cart.svg" alt=""
                                                style={{display: "flex"}}/>
                                            </Button>
                                            <Button className="like_view_btn"
                                            style={{right: "36px"}}>
                                                <Badge badgeContent={1000} color="primary">
                                                    <Checkbox 
                                                    icon={<RemovedRedEyeIcon style={{color: "white"}}/>}
                                                    />

                                                </Badge>
                                            </Button>
                                        </Box>
                                        <Box className={"dish_desc"}>
                                            <span className="dish_title_text">Shirin Ovqatlar</span>
                                            <div className="dish_desc_text">
                                                <MonetizationOnIcon/> 7
                                            </div>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Stack>
                
                </Stack>
            </Container>

             <div className="review_for_restaurant">
                <Container
                sx={{mt: "100px"}}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                    <Box className={"category_title"}>Oshxona Haqida Fikrlar</Box>
                    <Stack 
                    flexDirection={"row"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={"100%"}>
                        {Array.from(Array(4).keys()).map((ele,index) => {
                            return (
                                <Box className={"review_box"} key={index}>
                                    <Box display={"flex"} justifyContent={"center"}>
                                        <img alt="" src="/community/xasbulla.webp"
                                        className="review_img"/>
                                    </Box>
                                    <span className="review_name">Xasbulla</span>
                                    <span className="review_prof">Foydalanuvchi</span>
                                    <p className="review_desc">
                                        I like this restaurant, ovqatlari juda mazzali Hammaga tavfsiya qilaman
                                    </p>
                                    <div className="review_stars">
                                        <StarIcon style={{color: "#F2BD57"}}/>
                                        <StarIcon style={{color: "#F2BD57"}}/>
                                        <StarIcon style={{color: "#F2BD57"}}/>
                                        <StarIcon style={{color: "#F9F9FA", stroke: "#A1A1A1", strokeWidth:1}}/>
                                        <StarIcon style={{color: "#F9F9FA", stroke: "#A1A1A1",strokeWidth:1}}/>
                                    </div>
                                </Box>
                            );
                        })}
                    </Stack>
                </Container>
             </div>

             <Container className="member_reviews">
                <Box className={"category_title"}> Oshxona Haqida</Box>
                <Stack 
                display={"flex"}
                flexDirection="row"
                width={"90%"}
                sx={{mt:"70px"}}>
                    <Box className={"about_left"}
                    sx={{ backgroundImage: `url("/restaurant/blackbear1.jpg")`}}
                    >
                        <div className="about_left_desc">
                            <span>Black Bear</span>
                            <p>Amazing Taste </p>
                        </div>
                        </Box>
                        <Box className={"about_right"}>
                            {Array.from(Array(3).keys()).map((ele,index) => {
                                return (
                                    <Box display={"flex"} flexDirection={"row"} key={index}>
                                        <div className="about_right_img"></div>
                                        <div className="about_right_desc">
                                            <span>Bizning mohir oshpazlar</span>
                                            <p>Bizning oshpazlarimiz nufuzli joylarda malaka 
                                                oshirib kelishgan
                                            </p>
                                        </div>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Stack> 

                    <Stack
                    sx={{mt:"60px"}}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    >
                        <Box className={"category_title"}>Restaurant Adress</Box>
                        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
              width="1320"
              height="500"
              frameBorder="0"
              style={{ border: 0 }}
              aria-hidden="false"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

                    </Stack>
             </Container>
        </div>
    )
}