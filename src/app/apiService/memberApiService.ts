import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Member } from "../../types/user";
import { MemberLiken } from "../../types/others";

class MemberApiService {
private readonly path: string;

constructor () {
    this.path = serverApi;
}

public async loginRequest(login_data: any): Promise<Member> {
    try {
    const result = await axios.post(this.path + "/login", login_data, {
        withCredentials: true,
    });
    console.log("state::", result.data.state);
    assert.ok(result?.data, Definer.general_err1);
    assert.ok(result?.data?.state != "fail", result?.data?.message);

    const member: Member = result.data.data;
    localStorage.setItem("member_data", JSON.stringify(member));
    return member;        
          

    } catch (err: any) {
        console.log(`ERROR::: loginrequest ${err.message}`);
        throw err;
    }
}

public async signupRequest(signup_data: any): Promise<Member> {
    try {
    const result = await axios.post(this.path + "/signup", signup_data, {
        withCredentials: true,
    });
    console.log("state::", result.data.state);
    assert.ok(result?.data, Definer.general_err1);
    assert.ok(result?.data?.state != "fail", result?.data?.message);

    const member: Member = result.data.data;
    localStorage.setItem("member_data", JSON.stringify(member));
    return member;        
          

    } catch (err: any) {
        console.log(`ERROR::: signuprequest ${err.message}`);
        throw err;
    }
}

public async logOutRequest(): Promise<boolean> {
    try {
      const result = await axios.get(this.path+"/logout",{
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", 
      result?.data?.message);
      const logout_result = result.data.state;
    //   localStorage.removeItem("member_data"); //buni ozim qoshganman
      return logout_result == "success";  
          

    } catch (err: any) {
        console.log(`ERROR::: getlogoutrequest ${err.message}`);
        throw err;
    }
}

public async memberLikeTarget(data:any): Promise<MemberLiken> {
    try {
       const url = "/member-liken",
       result = await axios.post(this.path + url, data, {
        withCredentials:true,
       });
       assert.ok(result?.data, Definer.general_err1);
       assert.ok(result?.data?.state != "fail", 
      result?.data?.message);
      
      console.log("state:::", result.data.data);
      const like_result : MemberLiken = result.data.data;
      return like_result;
          
    } catch (err: any) {
        console.log(`ERROR::: memberLikeTarget ${err.message}`);
        throw err;
    }
}

}
export default MemberApiService;