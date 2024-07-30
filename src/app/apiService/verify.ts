import Cookies from "universal-cookie";
import { serverApi } from "../../lib/config";

const cookies = new Cookies();
let member_data: any = null;

if (cookies.get("access_token")) {
    const memberDataJson: any = localStorage.getItem("member_data") 
    ? localStorage.getItem("member_data") : null;
    member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
        member_data.mb_image = member_data.mb_image 
        ? `${serverApi}/${member_data.mb_image}` 
        : "/dealers/cardealer.jpg";
    }
} else {
    localStorage.removeItem("member_data");
}

console.log("===verify");
console.log(member_data);


export const verifiedMemberData = member_data ? member_data : null;
