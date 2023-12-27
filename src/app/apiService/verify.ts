import Cookies from "universal-cookie";

const cookies = new Cookies();
let member_data : any = null;

if (cookies.get("access_token")) {
    const memberDataJSON: any = localStorage.getItem("member_data") 
    ? localStorage.getItem("member_data") : null;
    member_data = memberDataJSON ? JSON.parse(memberDataJSON) : null;
} else {
    localStorage.removeItem("member_data");
}

console.log("===verify");
console.log(member_data);


export const verifyMemberData = member_data ? member_data : null;
