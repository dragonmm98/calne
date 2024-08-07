import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import MemberApiService from "../../apiService/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import ChatBot from "../../components/chatbot/chat";

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

// const chosen_list = Array.from(Array(3).keys());
// const restaurant_list = Array.from(Array(8).keys());

export function ChosenDish(props:any) {
  //****INITIALIZATIONS ****/
  const {setChosenProduct,setChosenRestaurant} = 
  actionDispatch(useDispatch());
  const {chosenProduct} = useSelector(chosenProductRetriever);
  const {chosenRestaurant} = useSelector(chosenRestaurantRetriever);
  let {dish_id} = useParams<{dish_id:string }>();
  const [productRebuild, setproductRebuild] = useState<Date>(new Date());

  const dishRelatedProcess = async ():Promise<void> => {
    try {
        const productService = new ProductApiService();
        const product:Product = await productService
        .getChosenDish(dish_id);
        setChosenProduct(product);

        const restaurantService = new RestaurantApiService();
        const restaurant: Restaurant = await restaurantService
        .getChosenRestaurant(product.dealers_mb_id);
        setChosenRestaurant(restaurant)
    } catch (err) {
        console.log(`dishRelatedProcess, ERROR`, err);
    }
  };

  useEffect(() => {

    dishRelatedProcess().then();
  }, [productRebuild])
  
    const label= {inputProps: {"aria-label": "CheckBox demo"}};
    
    
    //******HANDLERS *****/
    //like mechanism
    const targetLikeProduct = async (e:any): Promise<void> => {
      try{
        assert.ok(localStorage.getItem("member_data"), Definer.auth_err1)
  
        const member_service = new MemberApiService(),
        like_result:any = await member_service.memberLikeTarget({
          like_ref_id: e.target.id, 
          group_type: "product"});
          console.log(like_result)
        assert.ok(like_result, Definer.general_err1);
       await sweetTopSmallSuccessAlert("success", 700, false);
       setproductRebuild(new Date());
      } catch (err:any) {
        console.log("targetLikeProduct", err);
        sweetErrorHandling(err).then();
      }
    }
  
  
 

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
                     spaceBetween={20}
                     slidesPerView={chosenProduct?.product_images.length}
                     watchSlidesProgress={true}
                     freeMode={true}
                     modules={[FreeMode,Navigation,Thumbs]}
                     loop={true}
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
                     <strong className="dish_txt">{chosenProduct?.product_name}</strong>
                     <Box className="about_txt">
                     <span className="resto_name">Owner: {chosenRestaurant?.mb_nick}</span>
                     <span className="resto_name">Company: {chosenProduct?.product_company}</span>
                     <span className="resto_name">Condition: {chosenProduct?.product_collection}</span>
                     <span className="resto_name">Year: {chosenProduct?.product_year} Year Model</span>
                     <span className="resto_name">Milaege: {chosenProduct?.product_milaege} km</span>
                     <span className="resto_name">Color: {chosenProduct?.product_color}</span>
                     <span className="resto_name">Type: {chosenProduct?.product_size} car</span>
                     </Box>
                        
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
                                id={chosenProduct?._id}
                                onClick={targetLikeProduct}
                                checked={chosenProduct?.me_liked 
                                  && chosenProduct?.me_liked[0]?.my_favorite ? true : false}
                                />
                                <span>{chosenProduct?.product_likes} ta</span>
                            </div>
                            <div style={{display: "flex", alignItems:"center"}}>
                                <RemovedRedEyeIcon style={{width: "32px", height: "24px"}} sx={{mr: "10px"}}/>
                                <span className="eye_txt">{chosenProduct?.product_views} views</span>
                                
                            </div>
                        </div>
                     </Box>
                     <p className="dish_desc_info"> {chosenProduct?.product_description ? chosenProduct?.product_description : "no descirption"} </p>
                     <Marginer
                     direction="horizontal"
                     height="1"
                     width="100%"
                     bg="#000000"/>
                     <div className="dish_price_box">
                        <span>Price:</span>
                        <span>{chosenProduct?.product_price}$</span>
                     </div>
                     <div className="button_box">
                        <Button variant="contained"
                        onClick={() => {props.onAdd(chosenProduct)}}>Send to buy</Button>
                     </div>
                </Stack>
                <ChatBot/>
            </Container>
        </div>
    )
}

function setproductRebuild(arg0: Date) {
  throw new Error("Function not implemented.");
}
