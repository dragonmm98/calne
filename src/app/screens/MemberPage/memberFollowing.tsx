import { Avatar, Box, Button, ButtonBase, Stack } from "@mui/material";
import React from "react";

const following = [
    {mb_nick: "Ravshan"},
    {mb_nick: "ulgbek"},
    {mb_nick: "Temur"},
];

export function MemberFollowing (props: any) {
    return (
        <Stack>
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
                                height: "85%",
                            }}>
                                <span className="username_txt">USER</span>
                                <span className="name_txt">{following.mb_nick}</span>
                            </div>

                            {props.actions_enabled && (
                             
                                <Button
                                variant="contained"
                                startIcon={
                                    <img src="" alt=""
                                    style={{width: "40px", marginLeft: "16px"}}
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