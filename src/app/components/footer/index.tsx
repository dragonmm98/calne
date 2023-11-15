import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Footer() {
    return (
        <div className="footer_config">
        <Container>
            <Stack className="main_footer_container">
                <Stack flexDirection={"row"} style={{height: "242px"}}>
                    <Stack className="info" flexDirection={"column"}>
                        <Box>
                            <img src="/icons/papays-footer.svg" alt=""/>
                        </Box>
                        <Box className="main_text">
                            Lorem ipsum dolor sit amet consectetur adipisicing  illum ipsa labore delectus aut magnam maiores architecto ipsam asperiores officiis!
                        </Box>
                        <Stack className= "contact_links">
                            <Box>
                                <img src="/icons/facebook.svg"  alt=""/>
                            </Box>
                            <Box>
                            <img src="/icons/youtube.svg"  alt=""/>
                            </Box>
                            <Box>
                            <img src="/icons/instagram.svg"  alt=""/>
                              </Box>
                            <Box>
                            <img src="/icons/twitter.svg"  alt=""/>
                             </Box>
                        </Stack>
                    </Stack>
                    <Stack className="parts">
                      <Box className="part_subject">Bo'limlar</Box>
                      <Box className="divider"></Box>
                      <Box className="target">Bosh Sahifa Oshxona Jamiyat Yordam</Box>
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
                    Copyright Papays 2023, All rights reserved
                </Box>
            </Stack>
        </Container>
     </div>
);
}