import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import { useParams } from "react-router-dom";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
//*****REDUX *****/
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setChosenRestaurants } from "./slice";
import { Product } from "../../../types/product";
import { retrieveChosenProduct, retrieveChosenRestaurant } from "./selector";
import ProductApiService from "../../apiService/productApiService";
import RestaurantApiService from "../../apiService/restaurantApiService";
import { serverApi } from "../../../lib/config";

//** REDUX SLICE**/
const actionDispatch = (dispach: Dispatch) => ({
    setChosenProduct: (data:Product) => dispach(setChosenProduct(data)),
    setChosenRestaurant:(data:Restaurant) => dispach(setChosenRestaurants(data)),
  });

//** REDUX SELECTOR**/
const chosenRestaurantRetriever = createSelector(
    retrieveChosenRestaurant,
    (chosenRestaurant) =>({
        chosenRestaurant,
    })
);
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) =>({
        chosenProduct,
    })
);

const chosen_list = Array.from(Array(3).keys());
const restaurant_list = Array.from(Array(8).keys());

export function ChosenDish() {
  //****INITIALIZATIONS ****/
  const {setChosenProduct,setChosenRestaurant} = 
  actionDispatch(useDispatch());
  const {chosenProduct} = useSelector(chosenProductRetriever);
  const {chosenRestaurant} = useSelector(chosenRestaurantRetriever);
  let {dish_id} = useParams<{dish_id:string }>();
  
  const dishRelatedProcess = async () => {
    try {
        const productService = new ProductApiService();
        const product:Product = await productService
        .getChosenDish(dish_id);
        setChosenProduct(product);

        const restaurantService = new RestaurantApiService();
        const restaurant: Restaurant = await restaurantService
        .getChosenRestaurant(product.restaurant_mb_id);
        setChosenRestaurant(restaurant)
    } catch (err) {
        console.log(`dishRelatedProcess, ERROR`, err);
    }
  };

  useEffect(() => {

    dishRelatedProcess().then();
  }, [])
  
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
                 {chosenProduct?.product_images.map((ele:string) => {
                    const image_path = `${serverApi}/${ele}`;
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
                     slidesPerView={chosenProduct?.product_images.length}
                     centeredSlides={false}
                     spaceBetween={10}
                     navigation={{
                        nextEl: ".restaurant-next",
                        prevEl: ".restaurant-prev",
                        }}
                        >
                       {chosenProduct?.product_images.map((ele:string) => {
                        const image_path = `${serverApi}/${ele}`;
                        return (
                            <SwiperSlide
                            style={{cursor: "pointer"}}
                            key={chosenProduct._id}
                            className={"restaurant_avatars"}
                            >
                              <img src={image_path} alt=""/>
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