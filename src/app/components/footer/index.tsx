import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Footer() {
    return (
        <div className="footer_config">
        <Container>
            <Stack className="main_footer_container" >
                <Stack flexDirection={"row"} style={{height: "242px"}}>
                    <Stack className="info" flexDirection={"column"}>
                        <Box>
                            <img src="/icons/papays-footer.svg" alt=""/>
                        </Box>
                        <Box className="main_text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quasi id et temporibus numquam inventore incidunt, adipisci fugiat obcaecati illum ipsa labore delectus aut magnam maiores architecto ipsam asperiores officiis!
                        </Box>
                        <Stack className="contact_links">
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
                    <Stack></Stack>
                    <Stack>3</Stack>
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