import "../../../css/help.css";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Stack, Tab, Typography } from "@mui/material";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export function HelpPage() {
    //** INITIALZIATION **/
    const [value,setValue] = React.useState("1");
    const history  = useHistory()
    const isDesktopOrLaptop = useMediaQuery({minDeviceWidth:1104})
    const isMobile = useMediaQuery({maxWidth: 1104});

    const FAQ = [
     {
        question: "How to make payment?",
        answer: "You can make payment by using Payme and ClickPay programms"
     } ,
     {
        question: "How to can I order?",
        answer: "You can make order by using order page or Dealers page"
     } ,
     {
        question: "Can we use withour registration",
        answer: "yes you can but you will be only spectator and can't use spceific implements"
     } ,
     {
        question: "How to make payment?",
        answer: "You can make payment by using Payme and ClickPay programms"
     } ,
    
    ];

    const rules = [
           ` You must be registrated before using order, and community page`,
           `After making payment to your order you can't  cancel your payment so, you should
           check your order list before making payment`,
           `While chatting on community chat using abusive and harrasment words are restricted`,
           `You can't spread private advertisment without permission of Admin `,
           `Your actions are under control of Admins , please listen our rules and respect each other`,        
    ];

    //** HANDLERS**/

    const handleChange = (event:React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleButton = () => {
        history.push("/")
    }
    
    
    return(
        
        <div className="help_page"> 
        {isDesktopOrLaptop && 
        <Container maxWidth={"lg"} sx={{mt: "50px", mb: "50px"}}>
            <TabContext value={value}>
                <Box  className="help_menu">
                    <Box sx={{borderBottom: 1, borderColor: "#FFF"}}>
                
                        <TabList 
                        onChange={handleChange}
                         aria-label="lab API tabs example"
                         style={{display: "flex", justifyContent: "space-between",}}
                         >
                            <Tab style={{marginLeft:"183px"}} label="Rules" value={"1"}/>
                            <Tab style={{marginLeft:"230px"}} label="FAQ" value={"2"}/>
                            <Tab style={{marginLeft:"230px"}} label="Letter to Admin" value={"3"}/>
                        </TabList>
                    </Box>
                </Box>
                <Stack className={"help_main_content"}>
                    <TabPanel value="1">
                        <Stack className={"theRules_box"}>
                            <Box className={"theRules_frame"}>
                                {rules.map((ele) => {
                                    return (
                                        <p>{ele}</p>
                                        
                                    )
                                })}
                            </Box>
                        </Stack>
                    </TabPanel>
                    <TabPanel value="2">
                        <Stack className={"accordian_menu"}>
                            {FAQ.map((ele) => {
                                return (
                                    <Accordion sx={{mt: "10px"}}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Typography className="question">{ele.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography className="answer">{ele.answer}</Typography>
                                        </AccordionDetails>
                                       </Accordion>
                                );
                            })}
                        </Stack>
                    </TabPanel>
                    <TabPanel value="3">
                        <Stack className="admin_letter_box">
                            <Stack className="admin_letter_container">
                                <Box className={"admin_letter_frame"}>
                                    <span>Letter to Admins</span>
                                    <p>Fill these boxes in order to send message to Admin {""}
                                        </p>
                                       </Box>
                                       <form
                                       action="#"
                                       method="POST"
                                       className="admin_letter_frame"
                                       >
                                        <div className="admin_input_box">
                                            <label>Name</label>
                                            <input
                                            type={"text"}
                                            name={"mb_nick"}
                                            placeholder={"Name"}
                                            />
                                        </div>
                                        <div className="admin_input_box">
                                            <label>E-mail</label>
                                            <input 
                                            type="text"
                                            name="mb_email"
                                            placeholder="e-mail" 
                                            />
                                        </div>
                                        <div className="admin_input_box">
                                            <label>Message</label>
                                            <textarea
                                            name="mb_msg"
                                            placeholder="Text here" 
                                            ></textarea>
                                        </div>
                                        <Box 
                                        display={"flex"}
                                        justifyContent={"flex-end"}
                                        sx={{mt: "30px"}}
                                        >
                                            <Button type="submit" variant="contained"
                                            onClick={handleButton}>
                                                Send
                                            </Button>
                                        </Box>
                                       </form>
                            </Stack>
                        </Stack>
                    </TabPanel>
                </Stack>
            </TabContext>

        </Container>}
        {isMobile && <div style={{ backgroundColor: "white"}}>Mobile Page is under development</div>}
        </div>

    )
}

