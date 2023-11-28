import { Container } from "@mui/system";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
import "../../../css/my_page.css";

export function MembersPage(){
    let member = useRouteMatch();
    return(
        <div className="member_page">
            <Switch>
                <Route path={`${member.path}/other`}>
                    <VisitOtherPage/>
                </Route>
                
                <Route path={`${member.path}`}>
                  <VisitMyPage/>
                </Route>
            </Switch>
        </div>
    );
}