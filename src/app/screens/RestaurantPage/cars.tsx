import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import "../../../css/cars.css";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import  MonetizationOnIcon  from "@mui/icons-material/MonetizationOn";
import { useHistory, useParams } from "react-router-dom";
//*****REDUX *****/
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { retrieveChosenRestaurant, retrieveRandomRestaurants, retrieveTargetProducts } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenRestaurants, setRandomRestaurants, setTargetProducts } from "./slice";
import { CarSearchObj, ProductSearchObj, ProductSearchObjCars } from "../../../types/others";
import ProductApiService from "../../apiService/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import RestaurantApiService from "../../apiService/restaurantApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiService/memberApiService";

//Redux Selector
const randomRestaurantRetriever = createSelector(retrieveRandomRestaurants,
    (randomRestaurants)=>({
        randomRestaurants,
    })
  );
  
  const chosenRestaurantRetriever = createSelector(retrieveChosenRestaurant,
    (chosenRestaurant)=>({
        chosenRestaurant,
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
    setChosenRestaurant: (data:Restaurant) => 
    dispach(setChosenRestaurants(data)),
    setTargetProducts: (data:Product[]) => 
    dispach(setTargetProducts(data)),
  });




export function Cars (props:any) {

    //*** INITIALIZATIONS***/
    let {dealer_id} = useParams<{dealer_id:string }>();

  const refs: any = useRef([]);
  const history = useHistory();


  const {setTargetProducts,} = 
  actionDispatch(useDispatch());
  const {targetProducts} = useSelector(targetProductsRetriever);


  const [chosenRestaurantId, setChosenRestaurantId] = useState<string>(dealer_id);
  const [targetProductSearchObj, setTargetProductSearchObj] = useState<CarSearchObj>({
    page: 1,
    limit: 8,
    order: "createdAt",
    product_size: ""
  });


  const [productRebuild, setproductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    



   const productService = new ProductApiService();
   productService
   .getSizeProducts(targetProductSearchObj)
   .then((data) => setTargetProducts(data))
   .catch((err) => console.log(err));

  }, [targetProductSearchObj,productRebuild])

  //*****HANDLERS****/
  
    const searchCollectionHandler = (size:string) => {;
        targetProductSearchObj.page = 1;
        targetProductSearchObj.order="";
        targetProductSearchObj.product_size = size;
        setTargetProductSearchObj({...targetProductSearchObj});
    }

    
    const searchOrderHandler = (order:string) => {
        targetProductSearchObj.page = 1;
        targetProductSearchObj.product_size="";
        targetProductSearchObj.order = order;
        setTargetProductSearchObj({...targetProductSearchObj});

  }
  const chosenDishHandler = (id:string) => {
    history.push(`/dealer/dish/${id}`)
  }
    
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

  const handlePaginationChange = (event: any , value: number) => {
    targetProductSearchObj.page = value; 
    setTargetProductSearchObj({...targetProductSearchObj});
  };

    return (
        <div className="single_cars">
            <Container>
                <Stack flexDirection={"column"} alignItems="center">
                    <Stack className="avatar_big_box">
                        <Box className="top_text">
                            <p>All Cars Page</p>
                            
                        </Box>
                    </Stack>
            
                    <Stack 
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"flex-end"}
                    width={"90%"}
                    sx={{mt: "65px"}}>
                          <Box className="dish_category_box">
                          <div className="dish_category_main">
                            <Button variant="contained" color="secondary"
                            onClick={() => searchCollectionHandler("SPORT")}>
                                Sport
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchCollectionHandler("ORDINARY")}>
                                Ordinary
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchCollectionHandler("VAN")}>
                                Van
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchCollectionHandler("MINI")}>
                                Mini
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchCollectionHandler("TRUCK")}>
                                Truck
                            </Button>
                            </div>
                            </Box>


                        <Box className={"dishs_filter_box"}>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchOrderHandler("createdAt") }>
                                new
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchOrderHandler("product_price") }>
                                price
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchOrderHandler("product_likes") }>
                                likes
                            </Button>
                            <Button variant="contained" color="secondary"
                            onClick={() => searchOrderHandler("product_views") }>
                                views
                            </Button>
                        </Box>
                    </Stack>
                    
                    
                    <Stack
                    style={{width:"100%", display: "flex", minHeight: "60px"}}
                    flexDirection={"row"}>
                        <Stack className={"dish_wrapper"}>
                            {targetProducts.map((product:Product) => {
                                const image_path = `${serverApi}/${product.product_images[0]}` 

                                return (
                                    <Box className={"dish_box"} key={product._id}>
                                        <Box 
                                        className={"dish_img"}
                                        onClick={() => chosenDishHandler(product._id)}
                                        sx={{backgroundImage:  `url(${image_path})`,
                                        
                                        }}
                                        >
                                            <div className="dish_sale" 
                                            onClick={(event) => event.stopPropagation()}
                                            >{product.product_size}</div>
                                            <Button
                                            onClick={(event) => event.stopPropagation()}
                                            className="like_view_btn"
                                            style={{left: "36px"}}>
                                                <Badge badgeContent={product.product_likes} color="primary">
                                                    <Checkbox 
                                                    icon={<FavoriteBorder style={{color: "white"} }/> }
                                                    id={product._id}
                                                    checkedIcon={<Favorite style={{color: "red"}}/>}
                                                    onClick={targetLikeProduct}
                                                    checked={
                                                        product?.me_liked && product?.me_liked[0]?.my_favorite 
                                                        ? true : false}
                                                    />
                                                

                                                    

                                                </Badge>
                                            </Button>
                                            <Button
                                            onClick={(e) => {
                                                props.onAdd(product);
                                                e.stopPropagation();
                                            }} 
                                            className="view_btn">
                                                <img src="/icons/shopping_cart.svg" alt=""
                                                style={{display: "flex"}}/>
                                            </Button>
                                            <Button 
                                            onClick={(event) => event.stopPropagation()}
                                            className="like_view_btn"
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

                        <Stack className="bottom_box"
                        style={{ marginTop: "35px"}}>
                            <Pagination
                        count={
                          targetProductSearchObj.page >= 3 ? targetProductSearchObj.page + 1 : 3
                        }
                        page={targetProductSearchObj.page}
                        renderItem={(item) => (
                            <PaginationItem 
                            components={{
                                previous: ArrowBackIcon,
                                next:ArrowForwardIcon,
                            }} {...item}
                            color={"secondary"} />
                        )} 
                        onChange={handlePaginationChange}
                        />
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
                    <Box className={"category_title"}>Feedbacks</Box>
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

        </div>
    )
}