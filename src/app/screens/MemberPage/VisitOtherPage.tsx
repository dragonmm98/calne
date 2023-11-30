import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Pagination, PaginationItem, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import  FacebookIcon  from "@mui/icons-material/Facebook";
import  InstagramIcon  from "@mui/icons-material/Instagram";
import  TelegramIcon  from "@mui/icons-material/Telegram";
import  YoutubeIcon  from "@mui/icons-material/YouTube";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import TViewer from "../../components/TuiEditor/TViewer";

export function VisitOtherPage(props: any) {
    /** INITIALIZATIONS **/
    const [value,setValue] = useState("4");
    /** HANDLERS**/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
      
    return (
         <div className="my_page">
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px"}}>
               <Stack className="my_page_frame">
                <TabContext value={value}>
                    <Stack className="my_page_left">
                        <Box display={"flex"} flexDirection={"column"}>
                            <TabPanel value="1">
                                <Box className={"menu_name"}>Maqolalar</Box>
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
                                
                                <TabPanel value="2" >
                                    <Box className={"menu_name"}>Followers</Box>
                                    <Box className={"menu_content"}>
                                     <MemberFollowers actions_enabled={false}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value="3" >
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing actions_enabled={false}/>
    
                                    </Box>
                                </TabPanel>


                                <TabPanel value="4">
                                    <Box className={"menu_name"}>Tanlangan Maqola</Box>
                                    <Box className={"menu_content"}>
                                      <TViewer/>
                                    </Box>
                                </TabPanel>

                        </Box>
                        </Stack>

                        <Stack className="my_page_right"> 
                           <Box className={"order_info_box"}>
                            
                            <Box 
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            >
                            
                                <div className="order_user_img">
                                <img src="/icons/default_user.svg" alt=""
                        className="order_user_avatar"/>
                        <img  className="avatar_1" src="/icons/user1.svg" alt=""/>
                         </div>
                         <span className="Ismoilov-Akmaljon">
                                Ismoilov Akmaljon
                               </span>
                            <span className="Foydalanuvchi">
                                    Foydalanuvchi
                             </span> 
                            </Box>
                            <Box className={"user_media_box1"}>
                                <FacebookIcon/>
                                <InstagramIcon/>
                                <TelegramIcon/>
                                <YoutubeIcon/>
                            </Box>
                            <Box className={"user_media_box"}>
                                <p className="follows">Followers 10</p>
                                <p className="follows">Following 12</p>
                            </Box>
                            <p> My Name is Ilhom</p>
                            <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            sx={{mt: "10px"}}
                            >
                                <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                >
                                   {true ? (  
                                   <Tab
                                    style={{flexDirection: "column"}}
                                    value={"4"}
                                    component={(e) => (
                                        <Button
                                        style={{backgroundColor: "#f70909b8"}}
                                        className="maqola_btn"
                                        variant="contained"
                                        > 
                                        Bekor Qilish
                                        </Button>
                                    )}
                                    />               
                                   ) : ( 
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"4"}
                                    component={(e) => (
                                        <Button
                                        style={{backgroundColor: "#30945e"}}
                                        className="maqola_btn"
                                        variant="contained"
                                        > 
                                        Follow Qilish
                                        </Button>
                                    )}
                                    />
                                   )}
                                </TabList>
                            </Box>
                           </Box>

                           <Box className="my_page_menu">
                           <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                style={{display: "flex", flexDirection: "column", cursor: "grab"}}
                                >
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"1"}
                                    component={(e) => (
                                        <div
                                        className={`menu_box ${e}`}
                                        onClick={() => setValue("1")}
                                        > 
                                        <img src="/icons/post.svg" alt=""/>
                                        <span>Maqolalari</span>
                                        </div>
                                    )}
                                    />
                                    <Tab
                                    style={{flexDirection: "column"}}
                                    value={"2"}
                                    component={() => (
                                        <div
                                        className={`menu_box ${value}`}
                                        onClick={() => setValue("2")}
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
                                        onClick={() => setValue("3")}
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