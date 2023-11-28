import React from "react";
import  CloudDownloadIcon  from "@mui/icons-material/CloudDownload";
import { Box, Button, Stack } from "@mui/material";


export function MySettings (props:any) {
    return (
        <Stack className={"my_settings_page"}>
            <Box className={"member_media_frame"}>
              <img
              src="/icons/default_user.svg"
              className="mb_image"
              style={{borderRadius: "50%"}}
              width={"100px"}
              height={"100px"}
              />
              <div className="media_change_box">
                <span>Rasm Yuklash</span>
                <p>JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
                <div className="up_del_box">
                    <Button component="label" style={{minWidth: "0"}}>
                      <CloudDownloadIcon/>
                      <input type={"file"} hidden/>
                    </Button>
                </div>
              </div>
            </Box>

            <Box className={"input_frame"}>
                <div className="long_input">
                    <label className="spec_label">Ism</label>
                    <input
                    className="spec_input mb_nick"
                    type={"text"}
                    placeholder="User Name"
                    name="mb_nick"
                    />
                    </div> 
            </Box>

            <Box className={"input_frame1"}>
                <Box className="short_input">
                <label className="spec_label">Telefon Raqam</label>
                <input
                    className="spec_input mb_phone"
                    type={"text"}
                    placeholder="User Phone"
                    name="mb_phone"
                    />
                </Box>
                <div className="short_input">
                <label className="spec_label">Manzil</label>
                <input 
                     style={{marginLeft: "15px"}}
                    className="spec_input mb_address"
                    type={"text"}
                    placeholder="User Address"
                    name="mb_address"
                    />
                </div>
            </Box>

            <Box className={"input_frame"}>
            <div className="long_input">
                    <label className="spec_label">Ma'lumot</label>
                    <textarea
                    className={"spec_textarea mb_description"}
                    placeholder="User Description"
                    name="mb_description"
                    />
                    </div> 
                  </Box>

                  <Box display={"flex"} justifyContent={"flex-end"} sx={{mt: "25px"}}>
                      <Button variant="contained">Saqlash</Button>
                  </Box>
           </Stack>
    );
}