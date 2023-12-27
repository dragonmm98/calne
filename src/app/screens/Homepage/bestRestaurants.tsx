import React, { useRef } from "react";
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
import { useHistory } from "react-router-dom";
import assert from "assert";
import MemberApiService from "../../apiService/memberApiService";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

//Redux Selector
const bestRestaurantRetriever = createSelector(retrievebestRestaurants,
  (bestRestaurants)=>({
      bestRestaurants,
  })
);

export function BestRestaurants () {
  //***INITIALIZATIONS ***/
  const history = useHistory();
  const {bestRestaurants} = useSelector(bestRestaurantRetriever);

  const refs: any = useRef([]);


  //*****HANDLERS ******/
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`);
  };

  const goRestaurantsHandler = () => history.push("/restaurant")

  const targetLikeBest = async (e:any, id:string) => {
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
                      <Card onClick={() => chosenRestaurantHandler(ele._id)}
                      variant="outlined" 
                      sx={{
                               minHeight: '483px', 
                               minWidth: '320px',
                               mr: "35px" , 
                              cursor:"pointer" }}>
                                  <CardOverflow>
                                      <AspectRatio ratio={"1"}>
                                          <img src={image_path} alt=""/>
                                      </AspectRatio>
                                      <IconButton 
                                      onClick={(e) => {e.stopPropagation()}}
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
                                    <Favorite 
                                    onClick={(e) => targetLikeBest(e, ele._id) }  
                                    style={{fill:
                                    ele?.me_liked && ele?.me_liked[0]?.my_favorite ? "red" : "white"}}/>
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
              <div
               ref={(element) => (refs.current[ele._id] = element)}>
                {ele.mb_likes}</div>
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