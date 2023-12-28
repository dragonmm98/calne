import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import { Swiper, SwiperSlide } from "swiper/react";
import  ArrowForwardIosIcon  from "@mui/icons-material/ArrowBackIos";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import  MonetizationOnIcon  from "@mui/icons-material/MonetizationOn";
import { useParams } from "react-router-dom";
//*****REDUX *****/
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { retrieveChosenRestaurant, retrieveRandomRestaurants, retrieveTargetProducts, retrieveTargetRestaurants } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenRestaurants, setRandomRestaurants, setTargetProducts } from "./slice";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiService/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

//Redux Selector
const randomRestaurantRetriever = createSelector(retrieveRandomRestaurants,
    (randomRestaurants)=>({
        randomRestaurants,
    })
  );
  
  const chosenRestaurantRetriever = createSelector(retrieveChosenRestaurant,
    (chosenRestaurants)=>({
        chosenRestaurants,
    })
  );
  
  const targetProductsRetriever = createSelector(retrieveTargetProducts,
    (targetProducts)=>({
        targetProducts,
    })
  );
  //Redux Slice
  const actionDispatch = (dispach: Dispatch) => ({
    setRandomRestaurants: (data:Restaurant[]) =>
     dispach(setRandomRestaurants(data)),
    setChosenRestaurants: (data:Restaurant[]) => 
    dispach(setChosenRestaurants(data)),
    setTargetProducts: (data:Product[]) => 
    dispach(setTargetProducts(data)),
  });




export function OneRestaurant() {

    //*** INITIALIZATIONS***/
    let {restaurant_id} = useParams<{restaurant_id:string }>();
  const {setRandomRestaurants,setChosenRestaurants,setTargetProducts} = 
  actionDispatch(useDispatch());
  const {randomRestaurants} = useSelector(randomRestaurantRetriever);
  const {chosenRestaurants} = useSelector(chosenRestaurantRetriever);
  const {targetProducts} = useSelector(targetProductsRetriever);

  const [chosenRestaurantId, setChosenRestaurantId] = useState<string>(restaurant_id);
  const [targetProductSearchObj, setTargetProductSearchObj] = useState<ProductSearchObj>({
    page: 1,
    limit: 8,
    order: "createdAt",
    restaurant_mb_id: restaurant_id,
    product_collection: "dish",
  });

  useEffect(() => {
   const productService = new ProductApiService();
   productService
   .getTargetProducts(targetProductSearchObj)
   .then((data) => setTargetProducts(data))
   .catch((err) => console.log(err));
  }, [targetProductSearchObj])
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
                       {/* {restaurant_list.map((ele,index) => {
                        return ( */}
                            {/* <SwiperSlide
                            style={{cursor: "pointer"}}
                            key={index}
                            className={"restaurant_avatars"}
                            >
                              <img src="/restaurant/blackbear.jpg" alt=""/>
                              <span>Black Bear</span>
                            </SwiperSlide>
                        );
                       })} */}
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
                            {targetProducts.map((product:Product) => {
                                const image_path = `${serverApi}/${product.product_images[0]}`
                                const size_volume = product.product_collection === "drink" 
                                ? product.product_volume + "L" 
                                : product.product_size + " size"

                                return (
                                    <Box className={"dish_box"} key={product._id}>
                                        <Box 
                                        className={"dish_img"}
                                        sx={{backgroundImage: `url(${image_path})`,
                                        }}
                                        >
                                            <div className="dish_sale">{size_volume}</div>
                                            <Button
                                            className="like_view_btn"
                                            style={{left: "36px"}}>
                                                <Badge badgeContent={product.product_likes} color="primary">
                                                    <Checkbox 
                                                    icon={<FavoriteBorder style={{color: "white"} }/> }
                                                    id={product._id}
                                                    checkedIcon={<Favorite style={{color: "red"}}/>}
                                                    
                                                    checked={
                                                        product?.me_liked && product?.me_liked[0]?.my_favorite 
                                                        ? true : false}
                                                    />
                                                

                                                    

                                                </Badge>
                                            </Button>
                                            <Button className="view_btn">
                                                <img src="/icons/shopping_cart.svg" alt=""
                                                style={{display: "flex"}}/>
                                            </Button>
                                            <Button className="like_view_btn"
                                            style={{right: "36px"}}>
                                                <Badge badgeContent={product.product_views} color="primary">
                                                    <Checkbox 
                                                    icon={<RemovedRedEyeIcon style={{color: "white"}}/>}
                                                    />

                                                </Badge>
                                            </Button>
                                        </Box>
                                        <Box className={"dish_desc"}>
                                            <span className="dish_title_text">{product.product_name}</span>
                                            <div className="dish_desc_text">
                                                <MonetizationOnIcon/> {product.product_price}
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
              style={{ border: 0, marginTop: "60px" }}
              aria-hidden="false"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

                    </Stack>
             </Container>
        </div>
    )
}