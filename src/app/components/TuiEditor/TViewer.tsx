import React, { useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Stack } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import { serverApi } from "../../../lib/config";


const TViewer = (props: any) => {
    const editorRef = useRef();
    console.log(props.chosenSingleBoArticle.art_image)
    const image_path = props.chosenSingleBoArticle.art_image ? `${serverApi}/${props.chosenSingleBoArticle.art_image}` 
    :  "/community/xasbulla.webp";

    return (
      
        <Stack
        style={{width: "100%", height:"100%"}} 
        sx={{background: "white", mt: "20px", borderRadius: "10px"}}>
            <Box sx={{mt: "10px"}}>
                <Viewer
                // @ts-ignore
                ref={editorRef}
                initialValue={""}
                height={"600px"} 
               /> 
               <h3 style={{marginLeft: "75px", marginBottom: "18px"}}>{props.chosenSingleBoArticle?.art_content}</h3>
               
               <img src={image_path} alt=""
               style={{width: "335px", height: "425px", marginLeft: "19px"}}/>

            </Box>
        </Stack>
    );
}
export default TViewer;
