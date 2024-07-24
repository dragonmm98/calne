import { MonetizationOn } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";

//Redux
import { useDispatch,useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit"; 
import { createSelector } from "reselect";
import { Product } from "../../../types/product";
import { setTrendProducts } from "./slice";
import ProductApiService from "../../apiService/productApiService";
import { retrievetrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

//Redux Selector
const trendProductRetriever = createSelector(retrievetrendProducts,
    (trendProduct)=>({
        trendProduct,
    })
)

//Redux Slice
const actionDispatch = (dispach: Dispatch) => ({
  setTrendProducts: (data: Product[]) => dispach (setTrendProducts(data)),
});

export function BestDishes () {
    //**Initializations**//
    const history = useHistory();
    const {setTrendProducts} = actionDispatch(useDispatch())
    const {trendProduct} = useSelector(trendProductRetriever)
    useEffect(() => {
      const productService = new ProductApiService();
      productService.getTargetProducts({order: "product_likes", page: 1, limit: 10})
      .then((data) => {setTrendProducts(data)})
      .catch(err=> console.log(err));
    }, [])

//******HANDLERS ******/
const chosenDishHandler = (id:string) => {
    history.push(`/restaurant/dish/${id}`)
  }
    

    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems="center" sx={{marginTop: "72px"}}>
                <Box className="category_title">Top Cars</Box>
               
                <Stack sx={{marginTop: "43px"}} flexDirection="row">
                <Swiper style={{width: "1400px"}}
                 loop={true}
                 slidesPerView={"auto"}
                 centeredSlides={true}
                 autoplay={{
                     delay: 2500,
                     disableOnInteraction: true,
                    }}
                    >
                    {trendProduct.map((product: Product) => {
                        const image_path  = `${serverApi}/${product.product_images[0]}`;
                        const size_volume = product.product_collection === "drink" 
                        ? product.product_milaege + 'km' 
                        : product.product_size   
                        return (
                            
                            <SwiperSlide>
                           <Box className="dish_box">

                            <Stack className="dish_img" 
                            sx={{backgroundImage:`url(${image_path})`}}>
                            <div className="dish_sale">{size_volume}</div>
                            <div className="view_btn"
                            onClick={() => chosenDishHandler(product._id) }
                            >More About
                              <img 
                              src={"/icons/arrowright.svg"}
                              style={{marginLeft: "9px"}}/>
                            </div>
                            </Stack>
                            <Stack className="dish_desc">
                                <span className="dish_title_text">{product.product_name}</span>
                                <span className="dish_desc_text">
                                    <MonetizationOn/>
                                    {product.product_price}
                                    </span>
                            </Stack>
                        </Box>
                    </SwiperSlide>
                        )
                    })}
                   
                </Swiper>
                </Stack>
                </Stack>
                
            </Container>
        </div>
    )
}