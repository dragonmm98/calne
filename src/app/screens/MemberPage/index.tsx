import React from "react";
import { Route, Switch, useRouteMatch,useLocation } from "react-router-dom";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
import "../../../css/my_page.css";

function useQuery () {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
} 

export function MembersPage(props: any){
    let member = useRouteMatch();
    const query = useQuery();
    const chosen_mb_id: string | null = query.get("mb_id") ?? null;
    const chosen_art_id: string | null = query.get("art_id") ?? null;
  
    return(
        <div className="member_page">
            <Switch>
                <Route path={`${member.path}/other`}>
                    <VisitOtherPage 
                    chosen_mb_id={chosen_mb_id}
                    chosen_art_id={chosen_art_id}/>
                </Route>
                
                <Route path={`${member.path}`}>
                  <VisitMyPage/>
                </Route>
            </Switch>
        </div>
    );
}