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
//*****REDUX *****/
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { retrieveTargetRestaurants } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "./slice";
import RestaurantApiService from "../../apiService/restaurantApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiService/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";


// const order_list = Array.from(Array(8).keys());

//Redux Selector
const targetRestaurantRetriever = createSelector(retrieveTargetRestaurants,
  (targetRestaurants)=>({
      targetRestaurants,
  })
);

//Redux Slice
const actionDispatch = (dispach: Dispatch) => ({
  setTargetRestaurants: (data:Restaurant[]) => dispach(setTargetRestaurants(data)),
});


export function AllRestaurant() {
  ///Initializations**//
  const {setTargetRestaurants} = actionDispatch(useDispatch());
  const {targetRestaurants} = useSelector(targetRestaurantRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page:1, 
    limit: 8,
    order:"mb_point",
  });
 
  const history = useHistory();
  const refs: any = useRef([]);
  

  useEffect(() => {
   const restaurantService = new RestaurantApiService();
   restaurantService.getRestaurants(targetSearchObject)
   .then( data => setTargetRestaurants(data))
   .catch((err) => console.log(err));
  }, [targetSearchObject]);

  //*** HANDLERS***/
  const searchHandler = (category:string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({...targetSearchObject});
  }
  
  const chosenRestaurantHandler = (id:string) => {
    history.push(`/restaurant/${id}`);
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

    return (
        <div className="all_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems="center">
                    
                    <Box className="fill_search_box">
                        <Box className="fill_box" style={{cursor: "pointer"}}>
                            <a onClick={() => searchHandler("mb_point")}>Best</a>
                            <a onClick={() => searchHandler("mb_views")}>Famous</a>
                            <a onClick={() => searchHandler("mb_likes")}>Trend</a>
                            <a onClick={() => searchHandler("createdAt")}>New One</a>
                        </Box>
                        <Box className="search_big_box">
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
                        </Box>
                    </Box>

                    
                    <Stack className="all_res_box">
                        <CssVarsProvider>
                            {targetRestaurants.map((ele: Restaurant) => {
                              const image_path = `${serverApi}/${ele.mb_image}`
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
                                     <img src={image_path} alt=""/>
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
                                  {ele.mb_nick} Restaurant
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
            </Container>
        </div>
    )
}