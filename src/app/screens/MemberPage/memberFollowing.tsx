import { Avatar, Box, Button, Stack } from "@mui/material";
import React from "react";

const following = [
    {mb_nick: "Ravshan"},
    {mb_nick: "ulgbek"},
    {mb_nick: "Temur"},
];

export function MemberFollowing (props: any) {
    return (
        <Stack style={{gap: "15px", marginTop: "15px"}}>
            {following.map((following) => {
                const image_url = "/icons/default_user.svg";
                return (
                    <Box className={"follow_box"}>
                        <Avatar alt="" src={image_url} sx={{width: 89, height: 89}}/>
                            <div 
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85px",
                            }}>
                                <span className="username_txt">USER</span>
                                <span className="name_txt">{following.mb_nick}</span>
                            </div>

                            {props.actions_enabled && (
                             
                                <Button
                                variant="contained"
                                startIcon={
                                    <img src="/icons/followicon.svg" alt=""
                                    style={{width: "39px", marginLeft: "15px"}}
                                    />
                                }
                                className={"follow_cancel_btn"}
                                >
                                  Bekor Qilish
                                </Button>
                            )}
                    </Box>
                );
            })}
        </Stack>
    );
}