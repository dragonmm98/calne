import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { serverApi } from "../../lib/config";
import { ProductSearchObj } from "../../types/others";
import { Product } from "../../types/product";


class ProductApiService {
    private readonly path : string;

    constructor () {
        this.path = serverApi;
}

async getTargetProducts(data:ProductSearchObj ) {
    try {
      const url = "/products",
      result = await axios.post(this.path + url,data,{
        withCredentials: true,
      });
      assert.ok(result, Definer.input_err2);
      console.log ("state:::", result.data.state)
      const products : Product[] = result.data.data;
      return products;
    } catch (err: any) {
        console.log(`ERROR::: getTargetProducts ${err.message}`);
        throw err;
    }
}

}

export default ProductApiService;
