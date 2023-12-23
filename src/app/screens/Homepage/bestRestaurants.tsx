import React from "react";
import { Favorite } from "@mui/icons-material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CallIcon from '@mui/icons-material/Call';
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from "@mui/joy";
import { Box,  Button,  Container,  Stack } from "@mui/material";

//Redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {retrievebestRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../../lib/config";

//Redux Selector
const bestRestaurantRetriever = createSelector(retrievebestRestaurants,
  (bestRestaurants)=>({
      bestRestaurants,
  })
);

export function BestRestaurants () {
  //***INITIALIZATIONS ***/
  const {bestRestaurants} = useSelector(bestRestaurantRetriever);
    return (
        <div className="best_restaurant_frame">
            <img 
            src={"icons/bestres.svg"}
            alt=""
            style={{position: "absolute", left:"6%", transform:"rotate(0deg)"}} 
            />
              
            <Container sx={{paddingTop:"153px"}}>
                <Stack flexDirection={"column"} alignItems='center'>
                    <Box className="category_title">Zo'r Restaurantlar</Box>
                    <Stack sx={{mt:"43px"}} flexDirection="row">
                  
                  {bestRestaurants.map((ele: Restaurant) => {
                        const image_path= `${serverApi}/${ele.mb_image}`;

                    return(
                      <CssVarsProvider>
                      <Card variant="outlined" sx={{
                               minHeight: '483px', 
                               minWidth: '320px',
                               mr: "35px" , 
                              cursor:"pointer" }}>
                                  <CardOverflow>
                                      <AspectRatio ratio={"1"}>
                                          <img src={image_path} alt=""/>
                                      </AspectRatio>
                                      <IconButton 
                                      aria-label="Like minimal photography"
                                      size="md"
                                      variant="solid"
                                      color="neutral"
                                      sx={{
                                      position: "absolute",
                                      zIndex: 2,
                                      borderRadius: "50%",
                                      right: "1rem",
                                      bottom: 0,
                                      transform: "translateY(50%)",
                                      color: "rgba (0,0,0, .4)"
                                      }}>
                                    <Favorite style={{fill:"white"}}/>
                                  </IconButton>
                                  </CardOverflow>
                                  <Typography level="h2" sx={{fontSize: "md", mt:2}}>
                                   {ele.mb_nick} Restaurant
                                  </Typography>
                                  <Typography level="body-md" sx={{mt:0.5, mb:2}}> 
                                     <Link 
                                     href="" 
                                     startDecorator={<LocationOnRoundedIcon />}
                                    textColor="neutral.700">
                                     {ele.mb_address}
                             </Link>
                            </Typography>
                            <Typography level="body-md" sx={{mt:0.5, mb:2}}>
                              <Link 
                              href=""
                              startDecorator={<CallIcon />}
                              textColor="neutral.700">
                                 {ele.mb_phone}
                              </Link>
                            </Typography>
                            <CardOverflow variant="soft"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              py: 1.5,
              px: "var(--Card-padding)",
              borderTop: "1px solid",
              borderColor: "neutral.outlinedBorder",
              bgcolor: "background.level1" }}>
             
             <Typography level="body-md"
             sx={{
              fontWeight: "md",
              color: "text.secondary",
              alignItems: "center",
              display: "flex"
             }}> {ele.mb_views}
             <VisibilityIcon sx={{fontSize:20, marginLeft: "5px"}}/>
             </Typography>
             <Box sx={{width: 2, bgcolor: "divider"}}/>
             <Typography level="body-md" sx={{
              fontWeight: "md",
              color: "text.secondary",
              alignItems: "center",
              display: "flex"
             }}>
              <div>{ele.mb_likes}</div>
              <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
             </Typography>
            </CardOverflow>
                                  </Card>
                    
                      </CssVarsProvider>
                    );
                  })}
                  </Stack>
              
               

                    <Stack 
                    flexDirection={"row"}
                    justifyContent="flex-end"
                    style={{width:"100%", marginTop:"16px"}} 
                    >
                        <Button style={{background:"#1976d2", color: "white"}}>
                            Barchasini Ko'rish
                    </Button>
                     </Stack>
                </Stack>
                </Container>
        </div>
    );
}