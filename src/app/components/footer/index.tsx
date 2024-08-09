import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <div className="footer_config">
        <Container>
            <Stack className="main_footer_container">
                <Stack flexDirection={"row"} style={{height: "242px"}}>
                    <Stack className="info" flexDirection={"column"}>
                        <Box>
                            <img src="/home/logocar.png" alt="" 
                            style={{width:"80px", height: "60px"}}/>
                        </Box>
                        <Box className="main_text">
                            Lorem ipsum dolor sit amet consectetur adieriores officiis!
                        </Box>
                        <Stack className= "contact_links">
                            <Box>
                            <a href="https://www.facebook.com/">
                                <img src="/icons/facebook.svg"  alt=""/>
                                </a>
                            </Box>
                            <Box>
                            <a href="https://www.youtube.com/">
                            <img src="/icons/youtube.svg"  alt=""/>
                            </a>
                            </Box>
                            <Box>
                            <a href="https://www.instagram.com/">
                            <img src="/icons/instagram.svg"  alt=""/>
                            </a>
                              </Box>
                            <Box>
                            <a href="https://www.twitter.com/">
                            <img src="/icons/twitter.svg"  alt=""/>
                            </a>
                             </Box>
                        </Stack>
                    </Stack>
                    <Stack className="parts">
                      <Box className="part_subject">Categories</Box>
                      <Box className="divider"></Box>
                      <Box className="target">
                      <a href="/"> Home Page</a>
                      <a href="/help">Help Page</a>
                      </Box>
                    </Stack>
                    <Stack className="find_us">
                        <Box className="find">Find Us</Box>
                        <Box className="divider"></Box>
                        <Stack className="details" sx={{mt: "19.36px"}}>
                            <Box className="detail_first">L.</Box>
                            <Box className="detail_second">Uzbekistan</Box>
                        </Stack>
                        <Stack className="details" sx={{mt: "42px"}}>
                        <Box className="detail_first">P.</Box>
                        <Box className="detail_second">+998939260101</Box>
                        </Stack>
                        <Stack className="details" sx={{mt: "9px"}}>
                        <Box className="detail_first">E.</Box>
                        <Box className="detail_second">3d.dragonmm@gmail.com</Box>


                        </Stack>
                    </Stack>
                </Stack>
                <Box className="linear"></Box>
                <Box className="copyrights">
                    Copyright Calne 2024, All rights reserved
                </Box>
            </Stack>
        </Container>
     </div>
);
}