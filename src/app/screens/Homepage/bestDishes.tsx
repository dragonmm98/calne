import { MonetizationOn } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function BestDishes () {
    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems="center" sx={{marginTop: "72px"}}>
                <Box className="category_title">Trend Dishes</Box>
                <Stack sx={{marginTop: "43px"}} flexDirection="row">
                    <Box className="dish_box">

                        <Stack className="dish_img" 
                        sx={{backgroundImage:`url("https://cdn.tasteatlas.com//images/toplistarticles/08c818739e4b48ce96d319c16f4cc0ca.jpg?mw=1300")`}}>
                        <div className="dish_sale">normal size</div>
                        <div className="view_btn">Batafsil ko'rish
                          <img 
                          src={"/icons/arrowright.svg"}
                          style={{marginLeft: "9px"}}/>
                        </div>
                        </Stack>
                        <Stack className="dish_desc">
                            <span className="dish_title_text">Chicken Mayo</span>
                            <span className="dish_desc_text">
                                <MonetizationOn/>
                                11
                                </span>
                        </Stack>
                    </Box>
                    <Box className="dish_box">

                        <Stack className="dish_img" 
                        sx={{backgroundImage:`url("https://cdn.tasteatlas.com//images/toplistarticles/08c818739e4b48ce96d319c16f4cc0ca.jpg?mw=1300")`}}>
                        <div className="dish_sale">normal size</div>
                        <div className="view_btn">Batafsil ko'rish
                          <img 
                          src={"/icons/arrowright.svg"}
                          style={{marginLeft: "9px"}}/>
                        </div>
                        </Stack>
                        <Stack className="dish_desc">
                            <span className="dish_title_text">Chicken Mayo</span>
                            <span className="dish_desc_text">
                                <MonetizationOn/>
                                11
                                </span>
                        </Stack>
                    </Box>
                    <Box className="dish_box">

                        <Stack className="dish_img" 
                        sx={{backgroundImage:`url("https://cdn.tasteatlas.com//images/toplistarticles/08c818739e4b48ce96d319c16f4cc0ca.jpg?mw=1300")`}}>
                        <div className="dish_sale">normal size</div>
                        <div className="view_btn">Batafsil ko'rish
                          <img 
                          src={"/icons/arrowright.svg"}
                          style={{marginLeft: "9px"}}/>
                        </div>
                        </Stack>
                        <Stack className="dish_desc">
                            <span className="dish_title_text">Chicken Mayo</span>
                            <span className="dish_desc_text">
                                <MonetizationOn/>
                                11
                                </span>
                        </Stack>
                    </Box>
                    <Box className="dish_box">

                        <Stack className="dish_img" 
                        sx={{backgroundImage:`url("https://cdn.tasteatlas.com//images/toplistarticles/08c818739e4b48ce96d319c16f4cc0ca.jpg?mw=1300")`}}>
                        <div className="dish_sale">normal size</div>
                        <div className="view_btn">Batafsil ko'rish
                          <img 
                          src={"/icons/arrowright.svg"}
                          style={{marginLeft: "9px"}}/>
                        </div>
                        </Stack>
                        <Stack className="dish_desc">
                            <span className="dish_title_text">Chicken Mayo</span>
                            <span className="dish_desc_text">
                                <MonetizationOn/>
                                11
                                </span>
                        </Stack>
                    </Box>
                </Stack>
                </Stack>
                
            </Container>
        </div>
    )
}