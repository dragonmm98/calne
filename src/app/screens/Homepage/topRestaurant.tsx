import { Box, Container, Stack } from "@mui/material";
import React, { useRef } from "react";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { CardOverflow, CssVarsProvider, IconButton } from "@mui/joy";
import { Call, Favorite, Visibility } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';

//Redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {retrieveTopRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from "../../../types/user";
//Others
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiService/memberApiService";
import { MemberLiken } from "../../../types/others";
import { useHistory } from "react-router-dom";

//Redux Selector
const topRestaurantRetriever = createSelector(retrieveTopRestaurants,
  (topRestaurants)=>({
      topRestaurants,
  })
);
export function TopRestaurants () {
  //****INITIALIZATIONS ****/
  const history = useHistory();
  const {topRestaurants} = useSelector(topRestaurantRetriever);

  const refs: any = useRef([]);

  //****** HANDLERS*******/

  const chosenRestaurantHandler = (id: string) => {
    history.push(`/dealer/${id}`);
  }


  const targetLikeTop = async (e:any, id:string) => {
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
        <div className="top_restaurant_frame">
            <Container>
                <Stack 
                flexDirection={"column"} 
                alignItems="center"
                sx={{mt:"45px"}}>
                    <Box className="category_title">Top Dealers</Box>
                    <Stack 
                    flexDirection={'row'}
                    sx={{mt:"43px"}}
                    m={"16px"}
                    gap="10px">
                     
                       {topRestaurants.map((ele:Restaurant)=> {
                      const imagePath = ele.mb_image ? `${serverApi}/${ele.mb_image}` : "/restaurant/cardealerdefault.avif";
                        return (
                          <CssVarsProvider key={ele._id}>
                     <Card 
                     onClick={() => chosenRestaurantHandler(ele._id)}
                          sx={{
                         minHeight: '430px', 
                         minWidth: '325px',
                         mr: "35px" , 
                        cursor:"pointer" }}>
      <CardCover>
        <img
          src={imagePath}
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          {ele.mb_nick}
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          {ele.mb_address}
        </Typography>
        <Typography
          startDecorator={<Call />}
          textColor="neutral.300"
        >
          {ele.mb_phone}
        </Typography>
      </CardContent>
      <CardOverflow
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1.5,
        py: 1.5,
        px: "var(--Card-padding)",
        borderTop: "1px solid"

      }}>
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
        bottom: 45,
        transform: "translateY(50%)",
        color: "rgba (0,0,0, .4)"
        }}>
        <Favorite 
        onClick={(e) => targetLikeTop(e, ele._id) }  
        style={{fill:
          ele?.me_liked && ele?.me_liked[0]?.my_favorite ? "red" : "white"}}/>
       </IconButton>
       <Typography level="body-md"
       sx={{
        fontWeight: "md",
        color: "neutral.300",
        alignItems: "center",
        display: "flex"
       }}> {ele.mb_views}
       <VisibilityIcon sx={{fontSize:20, marginLeft: "5px"}}/>
       </Typography>
       <Box sx={{width: 2, bgcolor: "divider"}}/>
       <Typography sx={{
        fontWeight: "md",
        color: "neutral.300",
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
                        )
                       })}
               
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}