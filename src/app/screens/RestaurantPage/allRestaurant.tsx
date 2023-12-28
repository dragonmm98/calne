import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
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


const order_list = Array.from(Array(8).keys());

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

  useEffect(() => {
   
  }, []);
    return (
        <div className="all_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems="center">
                    
                    <Box className="fill_search_box">
                        <Box className="fill_box">
                            <a>Best</a>
                            <a>Famous</a>
                            <a>Trend</a>
                            <a>New One</a>
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
                            {order_list.map((ele) => {
                                return (
                            <Card
                            variant="outlined"
                            sx={{
                                minHeight: 410,
                                minWidth: 290,
                                mx: "17px",
                                my:"20px",
                            }}>
                                <CardOverflow>
                                    <AspectRatio ratio={"1"}>
                                     <img src="/restaurant/blackbear.jpg" alt=""/>
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
                                        style={{fill: "white"}}
                                        />
                                  </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize:"md", mt: 2}}>
                                  Black Bear Restaurant
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb:2}}>
                                  <Link 
                                  href=""
                                  startDecorator={<LocationOnRoundedIcon/>}
                                  textColor="neutral.700">
                                    New York city street
                                  </Link>
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb:0}}>
                                  <Link 
                                  href=""
                                  startDecorator={<CallIcon/>}
                                  textColor="neutral.700">
                                    998939260101
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
                                  1000{""}
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
                                        <div>500</div>
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
                        count={3}
                        page={1}
                        renderItem={(item) => (
                            <PaginationItem 
                            components={{
                                previous: ArrowBackIcon,
                                next:ArrowForwardIcon,
                            }} {...item}
                            color={"secondary"} />
                        )} 
                        />
                        <img className="line_img_two" src="/icons/burchak.svg"/>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}