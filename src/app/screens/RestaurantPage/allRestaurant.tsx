import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search"
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Favorite } from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import  FavoriteIcon  from "@mui/icons-material/Favorite";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from "@mui/joy";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//*****REDUX *****/
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { retrieveComment, retrieveTargetRestaurants } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setComment, setTargetRestaurants } from "./slice";
import RestaurantApiService from "../../apiService/restaurantApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiService/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import { CommentInput, SearchCommentObj,Comment } from "../../../types/comment";
import CommunityApiService from "../../apiService/communityApiService";


//Redux Selector
const targetRestaurantRetriever = createSelector(retrieveTargetRestaurants,
  (targetRestaurants)=>({
      targetRestaurants,
  })
);
const commentRetriever = createSelector(retrieveComment,
  (comment)=>({
      comment,
  })
);

//Redux Slice
const actionDispatch = (dispach: Dispatch) => ({
  setTargetRestaurants: (data:Restaurant[]) => 
  dispach(setTargetRestaurants(data)),
  setComment: (data:Comment[])=>
  dispach(setComment(data)),
});


export function AllRestaurant() {
  ///Initializations**//
  const {setTargetRestaurants,setComment} = actionDispatch(useDispatch());
  const {targetRestaurants} = useSelector(targetRestaurantRetriever);
  const {comment} = useSelector(commentRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page:1, 
    limit: 8,
    order:"mb_point",
  });
  const [commentWriteData,setCommentWriteData] = useState<CommentInput> ({
    comment_description: "",
    comment_types: "dealer"
  })
  const [searchCommentObj, setSearchCommentObj] = useState<SearchCommentObj>({
    comment_types: "dealer",
    page:1,
    limit: 20,
})

  const history = useHistory();
  const refs: any = useRef([]);
  const [productRebuild, setproductRebuild] = useState<Date>(new Date());

  useEffect(() => {
   const restaurantService = new RestaurantApiService();
   restaurantService.getRestaurants(targetSearchObject)
   .then( data => setTargetRestaurants(data))
   .catch((err) => console.log(err));

   const commentService = new CommunityApiService();
   commentService.getChosenComment(searchCommentObj).then((data) => 
   setComment(data))
   .catch((err) => console.log(err))
   
  }, [targetSearchObject,productRebuild,searchCommentObj]);

  //*** HANDLERS***/
  const searchHandler = (category:string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({...targetSearchObject});
  }
  
  const chosenRestaurantHandler = (id:string) => {
    history.push(`/dealer/${id}`);
  }
  
  const targetLikeHandler = async (e:any, id:string): Promise<void> => {
    try{
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1)

      const member_service = new MemberApiService(),
      like_result:any = await member_service.memberLikeTarget({
        like_ref_id: id, 
        group_type: "member"});
        console.log(like_result)
      assert.ok(like_result, Definer.general_err1);
  

    
      if (like_result.like_status > 0) {
         e.target.style.fill = "red";
         refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
     await sweetTopSmallSuccessAlert("success", 700, false);

    } catch (err:any) {
      console.log("targetLikeTop", err);
      sweetErrorHandling(err).then();
    }
  }

  const handlePaginationChange = (event: any , value: number) => {
    targetSearchObject.page = value; 
    setTargetSearchObject({...targetSearchObject});
  };


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

    return (
        <div className="all_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems="center">
                    
                    <Box className="fill_search_box">
                        <Box className="fill_box" style={{cursor: "pointer"}}>
                            <a onClick={() => searchHandler("mb_point")}>Best</a>
                            <a onClick={() => searchHandler("mb_views")}>Famous</a>
                            <a onClick={() => searchHandler("mb_likes")}>Trend</a>
                            <a onClick={() => searchHandler("createdAt")}>New Comers</a>
                        </Box>
                        {/* <Box className="search_big_box">
                            <form className="search_form" action="" method="">
                           <input
                           type={"search"}
                           className={"searchInput"}
                           name={"resSearch"}
                           placeholder={"Search"}/>
                           <Button
                           className="button_search"
                           variant="contained"
                           endIcon={<SearchIcon/>}>
                            Izlash
                           </Button>
                            </form>
                        </Box> */}
                    </Box>

                    
                    <Stack className="all_res_box">
                        <CssVarsProvider>
                            {targetRestaurants.map((ele: Restaurant) => {
                              const imagePath = ele.mb_image ? `${serverApi}/${ele.mb_image}` : "/restaurant/cardealerdefault.avif";
                                return (
                            <Card
                     onClick={() => chosenRestaurantHandler(ele._id)}
                            variant="outlined"
                            sx={{
                                minHeight: 410,
                                minWidth: 290,
                                mx: "17px",
                                my:"20px",
                                cursor: "pointer",
                            }}>
                                <CardOverflow>
                                    <AspectRatio ratio={"1"}>
                                     <img src={imagePath} alt=""/>
                                    </AspectRatio>
                                    <IconButton
                                     aria-labbel="Like minimal photography"
                                     size="md"
                                     variant="solid"
                                     color="neutral"
                                     onClick={(e) => {
                                        e.stopPropagation();
                                     }}
                                     sx={{
                                        position: "absolute",
                                        zIndex: 2,
                                        borderRadius: "50%",
                                        right: "1rem",
                                        bottom: "-1rem",
                                        transfrom: "translateY(50%)",
                                        color: "rgba (0,0,0,0.4)",
                                     }}
                                     >
                                        <Favorite
                                              onClick={(e) => targetLikeHandler(e, ele._id) }  
                                              style={{fill:
                                                ele?.me_liked && ele?.me_liked[0]?.my_favorite ? "red" : "white"}}
                                        />
                                  </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize:"md", mt: 2}}>
                                  {ele.mb_nick} Dealer
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb:2}}>
                                  <Link 
                                  href=""
                                  startDecorator={<LocationOnRoundedIcon/>}
                                  textColor="neutral.700">
                                    {ele.mb_address}
                                  </Link>
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb:0}}>
                                  <Link 
                                  href=""
                                  startDecorator={<CallIcon/>}
                                  textColor="neutral.700">
                                    {ele.mb_phone}
                                  </Link>
                                </Typography>
                              <CardOverflow
                              variant="soft"
                              sx={{
                                display:"flex",
                                flexDirection: "row",
                                gap: 1.5,
                                py: 1.5,
                                px: "var(--Card-padding)",
                                borderTop: "1px solid",
                                borderColor: "neutral.outlinedBorder",
                                bgcolor: "background.level1",
                              }}
                              >
                                <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: "md",
                                    color: "text.secondary",
                                    alignItems: "center",
                                    display: "flex",
                                }}>
                                  {ele.mb_views}
                                  <VisibilityIcon sx={{fontSize:20, marginLeft:"5px"}}/>
                                </Typography>
                                <Box sx={{width: 2, bgcolor:"divider"}}/>
                                <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: "md",
                                    color: "text.secondary",
                                    alignItems: "center",
                                    display: "flex",
                                    }}
                                    >
                                        <div
                                        ref={(element) => (refs.current[ele._id] = element)}>
                                          {ele.mb_likes}</div>
                                        <FavoriteIcon sx={{fontSize:20, marginLeft: "5px"}}/>
                                </Typography>
                              </CardOverflow>
                            </Card>
                            )})}
                        </CssVarsProvider>
                    </Stack>
                    
                    
                    <Stack className="bottom_box">
                        <img className="line_img" src="/icons/burchak.svg" style={{transform: "rotate(90deg)"}}/>
                        <Pagination
                        count={
                          targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
                        }
                        page={targetSearchObject.page}
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
                        <img className="line_img_two" src="/icons/burchak.svg"/>
                    </Stack>
                </Stack>
                <div className="review_for_restaurant">
                <Container
                sx={{mt: "35px"}}
                style={{
                    display: "flex",
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
              
                </Container> 
                <Stack className={'leave-review-config'}>
                <Box className={"category_title"}> Write Comment</Box>
									<textarea
                  placeholder="Only Dealer based comments"
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
								</Stack>


             </div>
            </Container>
        </div>
    )
}