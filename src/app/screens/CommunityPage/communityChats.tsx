
import { Avatar, Box, Stack } from "@mui/material";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import { verifiedMemberData } from "../../apiService/verify";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { RippleBadge } from "../../MaterialTheme/styled";

const NewMessage = (data: any) => {
    console.log(data.new_message);
    if (data.new_message.mb_id == verifiedMemberData?._id) {
     return (
        <Box
            flexDirection={"row"}
            style={{display: "flex", justifyContent:"flex-end", marginLeft: "10px"}}
            sx={{m: "10px 0px"}}
            >
            <div className="msg_right">{data.new_message.msg}</div>
        </Box>
     );
    } else {
        return (
            <Box
            flexDirection={"row"}
            style={{display: "flex",justifyContent:"flex-start"}}
            sx={{m: "10px 0px"}}
            >
            <Avatar 
            alt={data.new_message.mb_nick} 
            src={data.new_message.mb_image}/>
             <div className="msg_left">{data.new_message.msg}</div>
             </Box>
        );
    }
}


export function CommunityChats() {
    //** INITIALIZATIONS **/
    const [messagesList, setMessagesList] = useState([]);
    const socket = useContext(SocketContext)
    const [onlineUsers, setOnlineUsers] = useState<number>(0);
    const textInput:any = useRef(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        socket.connect(); 
        socket?.on("connect", function () {
            console.log("CLIENT: connected");
        })

        socket?.on("newMsg", (new_message: ChatMessage) => {
            messagesList.push(
                // @ts-ignore
                <NewMessage new_message={new_message} key={messagesList.length}/>
            );
            setMessagesList([...messagesList]);
            console.log("CLIENT: new message");
        })
        
        socket?.on("greetMsg", (msg: ChatGreetMsg) => {
            console.log("CLIENT: greet message");
            messagesList.push(
            //@ts-ignore
             <p 
             style={{
                color: "white",
                textAlign: "center",
                fontSize: "large",
                fontFamily: "sans-serif",
             }}>
                {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
             </p>
            );
            setMessagesList([...messagesList]);
        })

        socket?.on("infoMsg", (msg: ChatInfoMsg) => {
            console.log("CLIENT: info message");
            setOnlineUsers(msg.total);
        });

        return () => {
            socket.disconnect();
        };
      
    }, [socket])

    //*** HANDLERS***/
const getInputMessageHandler =  useCallback((e: any) => {
  const text = e.target.value;
  setMessage(text)
},
  [message],
)
const getKeyHandler = (e: any) => {
    try {
        if (e.key == "Enter") {
            assert.ok(message, Definer.input_err4);
            onClickHandler();
        }
    } catch (err:any) {
        sweetErrorHandling(err).then()
    }
}

    const onClickHandler = () => {
        try {
            if(!verifiedMemberData) {
                textInput.current.value = ""
            sweetFailureProvider("Please Login First", true);
            return false;
            }
            textInput.current.value = "";
            assert.ok(message,Definer.input_err4);

            const mb_image_url = verifiedMemberData?.mb_image ? 
            verifiedMemberData?.mb_image : "/auth/default_user.svg"

            socket.emit("createMsg", {
                msg: message,
                mb_id: verifiedMemberData?._id,
                mb_nick: verifiedMemberData?.mb_nick,
                mb_image: mb_image_url,
            });
            setMessage("")

        } catch (err:any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }  
    };


    return (
        <Stack className="chat_frame">
         <Box className={"chat_top"}>
            <div>Live Chat</div> 
            <RippleBadge 
            style={{margin: "-30px 0 0 20px"}}
            badgeContent={onlineUsers}/>
            </Box>
         <Box className={"chat_content"}>
            <Box className={"chat_main"}>
                <Box
                flexDirection={"row"}
                style={{display: "flex"}}
                sx={{m: "10px 0px"}}
                >
                    <div className="msg_left">Welcome to Live Chat</div>
                </Box>

                {messagesList}
            
                </Box>
                </Box>
                  <Box className={"chat_bott"}>
                    <input
                    ref={textInput}
                    type={"text"}
                    name={"message"}
                    className={"msg_input"}
                    placeholder={"Send message"}
                    onChange={getInputMessageHandler}
                    onKeyDown={getKeyHandler}
                    />
                    <button className="send_msg_btn"
                    onClick={onClickHandler}
                    onKeyDown={getKeyHandler}>
                        <SendIcon style={{color: "#fff"}}/>
                    </button>
                  </Box>
             </Stack>
    );
}     