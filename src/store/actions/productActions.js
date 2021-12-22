import {FETCH_PRODUCTS} from "../types"

export const fetchProducts = () => async(dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json()
    console.log("DAATA", res)
    console.log("Ress", data)
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}