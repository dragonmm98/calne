import { Box, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation,Pagination} from "swiper";
// Redux
import {useDispatch,useSelector} from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setEvents } from "../../screens/Homepage/slice";
import {retrieveEvents} from "../../screens/Homepage/selector"
import CommunityApiService from "../../apiService/communityApiService";
import {Event} from "../../../types/events"
import { serverApi } from "../../../lib/config";

SwiperCore.use([Autoplay, Navigation, Pagination]);



// Redux slice

const actionDispatch = (dispach: Dispatch) => ({
    setEvents: (data: Event[]) => dispach(setEvents(data)),
});

// Redux Selector
const eventRetriever = createSelector(
    retrieveEvents,
    (events)=> ({
        events
    })
);

export function Events () {

// Initialize 
const {setEvents} = actionDispatch(useDispatch());
const {events} = useSelector(eventRetriever)
  
useEffect(() => {
    const eventService = new CommunityApiService();
    eventService.getChosenEvents().then((data) => 
    setEvents(data))
    .catch((err) => console.log(err))
}, [])

    const gevents =[
        {
            title:"Welcome to Black Beer",
            desc: "New Taste, New style, New Dish",
            author: "Jeff Bezos",
            date: "2023.11.18",
            location: "New York City",
            img: "/restaurant/mamares.jpg",
        },
        {
            title: "Big Sale in our Resto",
            desc: "only weekends for pizza lovers",
            author: "JackMA Resto",
            location: "New York city 16th street",
            img: "/restaurant/mamares.jpg",
        },
        {
            title: "Feel real taste with us",
            desc: "Use promocode and get 50% discount",
            author: "Chicken Mansion",
            date: "2023.11.26",
            location: "New York 16th street",
            img: "/restaurant/mamares.jpg"

        },
        {
            title: "New Foods in Our city",
            desc: "Be the part of our bright future",
            author: "New York 16th street",
            date: "2023.11.26",
            location: "New York 16th street",
            img: "/restaurant/mamares.jpg"   
        },
    ];
    return (
        <div className="events_frame">
            <Container sx={{overflow: "hidden"}}>
                <Stack className="events_main">
                    <Box className="events_text">
                        <span className="category_title">Site events</span>
                    </Box>
                    <Box className="prev_next_frame">
                        <img 
                        src="/icons/arrow-right.svg" 
                        className="swiper-button-prev" alt=""
                        style={{transform:"rotate(180deg)"}}/>
                        <div className="dot_frame_pagination swiper-pagination"></div>
                        <img 
                        src="/icons/arrow-left.svg" 
                        className="swiper-button-next"
                        style={{transform:"rotate(180deg)"}} alt=""/>
                    </Box>
                    <Swiper 
                    className={"events_info swiper-wrapper"}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={30}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}
                    pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}>
                        {events.map((ele: Event) =>{
                             const image_path = ele?.event_image ? `${serverApi}/${ele.event_image}` : "/community/xasbulla.webp";
                            return (
                                <SwiperSlide className="events_info_frame">
                                <div className="events_img">
                                    <img src={image_path} className="events_img" alt=""/>
                                </div>
                                <Box className="events_desc">
                                    <Box className="events_bott">
                                    <Box className="bott_left">
                                        <div className="event_title_speaker">
                                            <strong>{ele.event_description}</strong>
                                            <div className="event_organizator">
                                                <img src="/icons/speaker.svg"
                                                alt=""
                                                style={{width:"20px", marginRight:"10px"}}/>
                                                <p className="spec_text_author">{ele.event_name}</p>
                                            </div>
                                        </div>
                                        <p
                                        className="text_desc"
                                        style={{marginTop:"10px"}}>
                                           {""}
                                           {ele.event_description}{""}
                                        </p>
                                        <div 
                                        className="bott_info"
                                        style={{marginTop:"10px"}}>
                                            <div className="bott_info_main">
                                                <img
                                                src="/icons/calendar.svg"
                                                alt=""
                                                style={{marginRight:"10px"}}/>
                                                {ele.event_description}
                                            </div>
                                            <div className="bott_info_main">
                                                <img
                                                src="/icons/location.svg"
                                                alt=""
                                                style={{marginRight: "10px"}}/>
                                                gg
                                            </div>
                                        </div>
                                    </Box>
                                    </Box>
                                </Box>
                                </SwiperSlide>
                            );
                        })}

                    </Swiper>
                </Stack>
            </Container>
        </div>
    )
}