import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";


const chosen_list = Array.from(Array(3).keys());
const restaurant_list = Array.from(Array(8).keys());

export function ChosenDish() {
        
    const label= {inputProps: {"aria-label": "CheckBox demo"}};

    return (
        <div className="chosen_dish_page">
            <Container className="dish_container">
                
                <Stack className="chosen_dish_slider">
                  <Swiper className="dish_wrapper"
                  loop={true}
                  spaceBetween={5}
                  navigation={true}
                  modules={[FreeMode,Navigation,Thumbs]}
                  >
                 {chosen_list.map((ele) => {
                    const image_path = `/others/foodmm.jpg`;
                    return (
                      <SwiperSlide>
                        <img 
                        style={{width: "100%", height: "100%" }}
                        src={image_path} alt=""/>
                      </SwiperSlide>
                    );
                 })}

                  </Swiper>
                    
                    
                    <Swiper
                     className={"dish_avatar_wrapper"}
                     slidesPerView={3}
                     centeredSlides={false}
                     spaceBetween={10}
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
                              <img src="/others/sliderimg.jpg" alt=""/>
                            </SwiperSlide>
                        );
                       })}
                     </Swiper>
                </Stack>
                
                
                
                <Stack className="chosen_dish_info_container">
                    <Box className="chosen_dish_info_box">
                     <strong className="dish_txt">Sweet Sandwich</strong>
                     <span className="resto_name">Black Bear</span>
                     <Box className="rating_box">
                        <Rating  name="half-rating" defaultValue={3.5} precision={0.5}/>
                        <div className="evaluation_box">
                            <div 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "20px",
                            }}>
                                <Checkbox {...label}
                                icon={<FavoriteBorder/>}
                                checkedIcon={<Favorite style={{ color: "red"}}/>}
                                checked={true}
                                />
                                <span>98 ta</span>
                            </div>
                            <div style={{display: "flex", alignItems:"center"}}>
                                <RemovedRedEyeIcon style={{width: "32px", height: "24px"}} sx={{mr: "10px"}}/>
                                <span className="eye_txt">1000 ta</span>
                            </div>
                        </div>
                     </Box>
                     <p className="dish_desc_info">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.  </p>
                     <Marginer
                     direction="horizontal"
                     height="1"
                     width="100%"
                     bg="#000000"/>
                     <div className="dish_price_box">
                        <span>Price:</span>
                        <span>$11</span>
                     </div>
                     <div className="button_box">
                        <Button variant="contained">Savatchaga qo'shish</Button>
                     </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    )
}