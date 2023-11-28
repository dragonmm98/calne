import { Avatar, Box, Button, ButtonBase, Stack } from "@mui/material";
import React from "react";

const followers = [
    {mb_nick: "Jahon", following: true},
    {mb_nick: "Sobir", following: false},
    {mb_nick: "Fozil", following: true},
];

export function MemberFollowers (props: any) {
    return (
        <Stack style={{gap: "15px", marginTop: "15px"}}>
            {followers.map((follower) => {
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
                                <span className="name_txt">{follower.mb_nick}</span>
                            </div>
                            {props.actions_enabled && 
                            (follower.following ? (
                                <Button
                                variant="contained"
                                className="following_already"
                                >
                                  FOLLOWING
                                </Button>
                            ) : (
                            <Button
                            variant={"contained"}
                            startIcon={
                                <img src="/icons/followicon.svg" alt=""
                                style={{width: "30px", height: "28px"}}
                                />
                            }
                            className={"follow_btn"}
                            > 
                            Follow Back
                            </Button>
                              ))}
                    </Box>
                );
            })}
        </Stack>
    );
}