import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Pagination, PaginationItem, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SettingsIcon from "@mui/icons-material/Settings";
import  FacebookIcon  from "@mui/icons-material/Facebook";
import  InstagramIcon  from "@mui/icons-material/Instagram";
import  TelegramIcon  from "@mui/icons-material/Telegram";
import  YoutubeIcon  from "@mui/icons-material/YouTube";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySetting";

export function VisitMyPage(props: any) {
    /** INITIALIZATIONS **/
    const [value,setValue] = useState("1");
    /** HANDLERS**/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
  
        const handlePaginationChange = (event: any, value: number) => {
            console.log(value);
        };

    
    
    return (
         <div className="my_page">
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px"}}>
               <Stack className="my_page_frame">
                <TabContext value={value}>
                    <Stack className="my_page_left">
                        <Box display={"flex"} flexDirection={"column"}>
                            <TabPanel value="1">
                                <Box className={"menu_name"}>Mening Maqolalarim</Box>
                                <Box className={"menu_content"}>
                                     <MemberPosts/>
                                     <Stack
                                     sx={{my: "40px"}}
                                     direction="row"
                                     alignItems={"center"}
                                     justifyContent={"center"}>
                                        <Box className="bottom_box">
                                        <Pagination
                                  count={3}
                                  page={1}
                                  renderItem={(item) => (
                                    <PaginationItem
                                    style={{color: "white"}}
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                    />
                                  )} 
                                  />
                                  </Box>
                                 </Stack>
                                </Box>
                                </TabPanel>
                                
                                <TabPanel value="2">
                                    <Box className={"menu_name"}>Followers</Box>
                                    <Box className={"menu_content"}>
                                     <MemberFollowers actions_enabled={true}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value="3">
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing actions_enabled={true}/>
    
                                    </Box>
                                </TabPanel>

                                <TabPanel value="4">
                                    <Box className={"menu_name"}>Maqola Yozish</Box>
                                    <Box className={"write_content"}>
    
                                    </Box>
                                </TabPanel>

                                <TabPanel value="5">
                                    <Box className={"menu_name"}>Tanlangan Maqola</Box>
                                    <Box className={"menu_content"}>
    
                                    </Box>
                                </TabPanel>

                                <TabPanel value="6">
                                    <Box className={"menu_name"}>My Setting</Box>
                                    <Box className={"menu_content"}>
                                      <MySettings/>
                                    </Box>
                                </TabPanel>
                        </Box>
                        </Stack>

                        <Stack className="my_page_right"> 
                           <Box className={"order_info_box"}>
                            <a onClick={() => setValue("6")} className={"settings_btn"}> 
                            <SettingsIcon/>
                            </a>
                            <Box 
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            >
                                <div className="order_user_img">
                                <img src="/icons/default_user.svg" alt=""
                        className="order_user_avatar"/>
                        <img className="avatar_1" src="/icons/user1.svg" alt=""/>
                         </div>
                         <span className="Ismoilov-Akmaljon">
                                Ismoilov Akmaljon
                               </span>
                            <span className="Foydalanuvchi">
                                    Foydalanuvchi
                             </span> 
                            </Box>
                            <Box className={"user_media_box"}>
                                <FacebookIcon/>
                                <InstagramIcon/>
                                <TelegramIcon/>
                                <YoutubeIcon/>
                            </Box>
                            <Box className={"user_media_box"}>
                                <p className="follows">Followers 2</p>
                                <p className="follows">Following 2</p>
                            </Box>
                            <p> Qo'shimcha ma;lumot kiritlmagan</p>
                            <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            sx={{mt: "10px"}}
                            >
                                <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                >
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"4"}
                                    component={(e) => (
                                        <Button
                                        variant="contained"
                                        onClick={() => setValue{"4"}}
                                        > 
                                        Maqola Yozish
                                        </Button>
                                    )}
                                    />               
                                </TabList>
                            </Box>
                           </Box>

                           <Box className="my_page_menu">
                           <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                >
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"1"}
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue{"1"}}
                                        > 
                                        <img src="/icons/post.svg" alt=""/>
                                        <span>Maqolalarim</span>
                                        </div>
                                    )}
                                    />
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"2"}
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue{"2"}}
                                        > 
                                        <img src="/icons/followers.svg" alt=""/>
                                        <span>Followers</span>
                                        </div>
                                    )}
                                    />
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"3"}
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue{"3"}}
                                        > 
                                        <img src="/icons/following.svg" alt=""/>
                                        <span>Following</span>
                                        </div>
                                    )}
                                    />                                     
                                </TabList>
                           </Box>
                        </Stack>

                </TabContext>
               </Stack>
            </Container>
         </div>
    );
}