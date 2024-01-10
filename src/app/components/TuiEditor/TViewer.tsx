import React, { useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Stack } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";


const TViewer = (props: any) => {
    const editorRef = useRef();

    return (
        <Stack sx={{background: "white", mt: "30px", borderRadius: "10px"}}>
            <Box sx={{mt: "40px"}}>
                <Viewer
                // @ts-ignore
                ref={editorRef}
                initialValue={props.chosenSingleBoArticle?.art_subject}
                height={"600px"} 
               /> 
               <h3 style={{marginLeft: "75px", marginBottom: "18px"}}>{props.chosenSingleBoArticle?.art_content}</h3>
               <img src="/community/xasbulla.webp" alt=""
               style={{width: "335px", height: "425px", marginLeft: "19px"}}/>

            </Box>
        </Stack>
    );
}
export default TViewer;

// props.chosenSingleBoArticle?.art_content