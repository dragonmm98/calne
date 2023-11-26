
import { Avatar, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";


export function CommunityChats() {
    //** INITIALIZATIONS **/
    const [messagesList, setMessagesList] = useState([]);

    return (
        <Stack className="chat_frame">
         <Box className={"chat_top"}>Jonli Muloqot</Box>
         <Box className={"chat_content"}>
            <Box className={"chat_main"}>
                <Box
                flexDirection={"row"}
                style={{display: "flex"}}
                sx={{m: "10px 0px"}}
                >
                    <div className="msg_left">Bu yer jonli muloqot</div>
                </Box>
                <Box
                flexDirection={"row"}
                style={{display: "flex"}}
                sx={{m: "10px 0px"}}
                >
                 <div className="msg_right">bu sizning habaringiz</div>
                </Box>
                <Box
                flexDirection={"row"}
                style={{display: "flex"}}
                sx={{m: "10px 0px"}}
                >
                <Avatar alt="Alex" src="/community/cute_girl.jpg"/>
                 <div className="msg_left">Bu Yerda Boshqalarni habari</div>
                </Box>
                </Box>
                </Box>
                  <Box className={"chat_bott"}>
                    <input
                    type={"text"}
                    name={"message"}
                    className={"msg_input"}
                    placeholder={"Send message"}
                    />
                    <button className="send_msg_btn">
                        <SendIcon style={{color: "#fff"}}/>
                    </button>
                  </Box>
             </Stack>
    );
}     