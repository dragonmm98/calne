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
import {  retrieveComment, retrieveTargetProducts } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenRestaurants, setComment, setRandomRestaurants, setTargetProducts } from "./slice";
import { CarSearchObj } from "../../../types/others";
import ProductApiService from "../../apiService/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiService/memberApiService";
import {Comment, CommentInput, SearchCommentObj} from "../../../types/comment"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CommunityApiService from "../../apiService/communityApiService";
import ChatBot from "../../components/chatbot/chat";
import { useMediaQuery } from "react-responsive";
//Redux Selector
  
  const targetProductsRetriever = createSelector(retrieveTargetProducts,
    (targetProducts)=>({
        targetProducts,
    })
  );
  const commentRetriever = createSelector(retrieveComment,
    (comment)=>({
        comment,
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
    setComment: (data:Comment[])=>
    dispach(setComment(data)),
  });

  


export function Cars (props:any) {

    //*** INITIALIZATIONS***/
    let {dealer_id} = useParams<{dealer_id:string }>();

  const refs: any = useRef([]);
  const history = useHistory();
  const [searchCommentObj, setSearchCommentObj] = useState<SearchCommentObj>({
    comment_types: "product",
    page:1,
    limit: 20,
})
const [commentWriteData,setCommentWriteData] = useState<CommentInput> ({
  comment_description: "",
  comment_types: "product"
})


  const {setTargetProducts,setComment} = 
  actionDispatch(useDispatch());
  const {targetProducts} = useSelector(targetProductsRetriever);
  const {comment} = useSelector(commentRetriever);

  const [chosenRestaurantId, setChosenRestaurantId] = useState<string>(dealer_id);
  const [targetProductSearchObj, setTargetProductSearchObj] = useState<CarSearchObj>({
    page: 1,
    limit: 8,
    order: "createdAt",
    product_size: ""
  });


  const [productRebuild, setproductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    

    const commentService = new CommunityApiService();
    commentService.getChosenComment(searchCommentObj).then((data) => 
    setComment(data))
    .catch((err) => console.log(err))

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

 //comment mecanism 
 const ChangeDescriptionHandler = (e:any) => {
    commentWriteData.comment_description = e.target.value;
    setCommentWriteData({...commentWriteData})
   }
  
   const handleWriteCommentButton = async () => {
    try {
      assert.ok(commentWriteData.comment_description !== '',
      Definer.input_err1)
  
      const communityApiService = new CommunityApiService();
      await communityApiService.createComment(commentWriteData);
      await sweetTopSmallSuccessAlert('Comment submitted successfully')
      commentWriteData.comment_description = '' 
      setproductRebuild(new Date())
    } catch (err) {
      console.log (`ERROR ::: handleWriteCommentButton ${err}`)
      sweetErrorHandling(err).then();
    }
   };

    
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

  const isDesktopOrLaptop = useMediaQuery({minDeviceWidth:1104})
  const isMobile = useMediaQuery({maxWidth: 1104});

    return (
        <div className="single_cars">
         {isDesktopOrLaptop && 
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
            </Container>}

            <div className="review_for_restaurant">
            {isDesktopOrLaptop && 
                <Container
                sx={{mt: "15px"}}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                    <Box className={"category_title"}>Comments</Box>
                  {/* Comment Box */}
         
                
                  <TableContainer component={Paper} 
                  sx={{mt: "15px", borderRadius: "1%", borderTop: "4mm ridge rgba(211, 220, 50, .6)", width: "100%", maxHeight: "370px",  overflow: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="table_title" 
          >
            <TableCell
            style={{color: "black", lineHeight: "10px", fontSize: "30px"}}>Member name</TableCell>
            <TableCell align="right"
             style={{color: "black", lineHeight: "10px", fontSize: "30px"}}>Description</TableCell>
            <TableCell align="right"
            style={{color: "black", lineHeight: "10px", fontSize: "30px"}}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comment?.map((data: Comment) => (
            <TableRow
              key={data._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"
              style={{color: "black", lineHeight: "5px", fontSize: "20px", fontWeight: "bold"}}>
                {data.members_data.mb_nick}
              </TableCell>
              <TableCell align="right">{data.comment_description}</TableCell>
              {/* @ts-ignore */}
              <TableCell align="right"
              style={{color: "black", lineHeight: "10px", fontSize: "15px"}}>
             {new Date(data.createdAt).toLocaleString('en-US', {
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
               hour: '2-digit',
               minute: '2-digit',
               hour12: false
  })}
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              
                </Container> }
                {isDesktopOrLaptop && 
                <Stack className={'leave-review-config'}>
                <Box className={"category_title"}> Write Comment</Box>
									<textarea
                  placeholder="Only Product based comments"
                  value={commentWriteData.comment_description}
                  onChange={ChangeDescriptionHandler}
									></textarea>
									<Box className={'submit-btn'} component={'div'}>
										<Button
											className={'submit-review'}
											
											
										>
											    <div className="button_comment">
                        <Button variant="contained"
                        onClick={handleWriteCommentButton}
                        >Submit</Button>
                      </div>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
												<g clipPath="url(#clip0_6975_3642)">
													<path
														d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
														fill="#181A20"
													/>
												</g>
												<defs>
													<clipPath id="clip0_6975_3642">
														<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
													</clipPath>
												</defs>
											</svg>
										</Button>
									</Box>
								</Stack>}
                <ChatBot/>
             </div>
        {isMobile && <div style={{ backgroundColor: "white"}}>Mobile Page is under development</div>}
           
        </div>
    )
}