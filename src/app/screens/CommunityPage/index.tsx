import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Stack, Tab } from "@mui/material";
import React, { useState } from "react";
import "../../../css/community.css";
import { CommunityChats } from "./communityChats";
import { TargetArticles } from "./targetArticles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const targetBoArticles = [1,2,3,4];

export function CommunityPage(props: any){
    /***INZITIZALIZATIONS ***/
    const [value,setValue] = useState("1");

    /** Handlers**/
    const handleChange = (event:React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    const handlePaginationChange = (event: any, value: number) => {
        console.log(value);
    };

    return(
        <div className="community_page">
        <div className="community_frame">
            <Container sx={{mt: "50px", mb: "50px"}}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                   <CommunityChats />
                   <Stack 
                   className="community_all_frame"
                   inputMode={"text"}
                   style={{border: "1px solid #fff"}}
                   >
                    <TabContext value={value}>
                        <Box className={"article_tabs"}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList
                                // value={value}
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                style={{borderColor: "blue"}}
                                >
                                    <Tab sx={{color: "white"}} label="Barcha Maqolalar" value={"1"}/>
                                    <Tab sx={{color: "white"}} label="Mashxurlar" value={"2"}/>
                                    <Tab sx={{color: "white"}} label="Oshxona Baholar" value={"3"}/>
                                    <Tab sx={{color: "white"}} label="Hikoyalar" value={"4"}/>
                                </TabList>
                                </Box>
                                </Box>
                                
                                <Box className={"article_main"}>
                                    <TabPanel value="1">
                                        <TargetArticles targetBoArticles={[1,2]}/>
                                       </TabPanel>
                                    <TabPanel value="2">
                                    <TargetArticles targetBoArticles={[1]} />
                                    </TabPanel>
                                    <TabPanel value="3">
                                    <TargetArticles targetBoArticles={[1,2,3]}/>
                                    </TabPanel>
                                    <TabPanel value="4">
                                    <TargetArticles targetBoArticles={[1,2,3,4]}/>
                                    </TabPanel>
                                </Box>

                                <Box className={"article_bott"}>
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
                                  )} onChange={handlePaginationChange}/>
                                </Box>
                                </TabContext>
                    </Stack>
                </Stack>
            </Container>
        </div>
        </div>
        
    );
}