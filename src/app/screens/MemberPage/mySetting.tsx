import React, { useState } from "react";
import  CloudDownloadIcon  from "@mui/icons-material/CloudDownload";
import { Box, Button, Stack } from "@mui/material";
import { verifiedMemberData } from "../../apiService/verify";
import { MemberUpdateData } from "../../../types/user";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiService/memberApiService";


export function MySettings (props:any) {
    //***INITIALIZATIONS****/
    const [file,setFile] = useState(verifiedMemberData?.mb_image);
    const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
        mb_nick: "",
        mb_address: "",
        mb_description: "",
        mb_image: "",
        mb_phone: "",
    });
    //**HANDLERS***//

    const changeMemberNickHandler = (e:any) => {
        memberUpdate.mb_nick = e.target.value;
        setMemberUpdate({...memberUpdate})
    }
    const changeMemberPhoneHandler = (e:any) => {
        memberUpdate.mb_phone = e.target.value;
        setMemberUpdate({...memberUpdate})
    }
    const changeMemberAddressHandler = (e:any) => {
        memberUpdate.mb_address = e.target.value;
        setMemberUpdate({...memberUpdate})
    }
    const changeMemberDescriptionHandler = (e:any) => {
        memberUpdate.mb_description = e.target.value;
        setMemberUpdate({...memberUpdate})
    }

    const handleImagePreviewer = (e:any) => {
     try {
        const file = e.target.files[0];
        const fileType = file["type"], 
        validTypes = ["image/jpg", "image/jpeg", "image/png"]
        
        assert.ok(validTypes.includes(fileType) && file, Definer.input_err3);
       
        memberUpdate.mb_image= file;
        setMemberUpdate({...memberUpdate});
        setFile(URL.createObjectURL(file));

     } catch (err) {
        console.log(`ERROR ::: handleIMagePreview ${err}`);
        sweetErrorHandling(err).then();
     }
    };

    const handleSubmitButton = async () => {
        try {
            
            const memberService = new MemberApiService();
           const result = await  memberService.updateMemberData(memberUpdate)
           assert.ok(result, Definer.general_err1);
           await sweetTopSmallSuccessAlert("Modified successfully!", 800, false)
           window.location.reload()
         } catch (err) {
            console.log(`ERROR ::: handleSubmitButton ${err}`);
            sweetErrorHandling(err).then();
         }
    }

    return (
        <Stack className={"my_settings_page"}>
            <Box className={"member_media_frame"}>
              <img
              src={file}
              className="mb_image"
              style={{borderRadius: "50%"}}
              width={"100px"}
              height={"100px"}
              />
              <div className="media_change_box">
                <span>Upload Pictures</span>
                <p>JPG, JPEG, PNG only allowed types!</p>
                <div className="up_del_box">
                    <Button component="label" style={{minWidth: "0"}}
                    onChange={handleImagePreviewer}>
                      <CloudDownloadIcon/>
                      <input type={"file"} hidden/>
                    </Button>
                </div>
              </div>
            </Box>

            <Box className={"input_frame"}>
                <div className="long_input">
                    <label className="spec_label">Name</label>
                    <input
                    className="spec_input mb_nick"
                    type={"text"}
                    placeholder={verifiedMemberData?.mb_nick}
                    name="mb_nick"
                    onChange={changeMemberNickHandler}
                    />
                    </div> 
            </Box>

            <Box className={"input_frame1"}>
                <Box className="short_input">
                <label className="spec_label">Mobile Phone</label>
                <input
                    className="spec_input mb_phone"
                    type={"text"}
                    placeholder={verifiedMemberData?.mb_phone}
                    name="mb_phone"
                    onChange={changeMemberPhoneHandler}
                    />
                </Box>
                <div className="short_input">
                <label className="spec_label">Address</label>
                <input 
                     style={{marginLeft: "15px"}}
                    className="spec_input mb_address"
                    type={"text"}
                    placeholder={verifiedMemberData?.mb_address}
                    name="mb_address"
                    onChange={changeMemberAddressHandler}
                    />
                </div>
            </Box>

            <Box className={"input_frame"}>
            <div className="long_input">
                    <label className="spec_label">Information</label>
                    <textarea
                    className={"spec_textarea mb_description"}
                    placeholder={verifiedMemberData?.mb_description}
                    name="mb_description"
                    onChange={changeMemberDescriptionHandler}
                    />
                    </div> 
                  </Box>

                  <Box display={"flex"} justifyContent={"flex-end"} sx={{mt: "25px"}}>
                      <Button variant="contained"
                      onClick={handleSubmitButton}>Save</Button>
                  </Box>
           </Stack>
    );
}