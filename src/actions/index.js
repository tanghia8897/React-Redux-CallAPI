import * as Types from './../constants/ActionTypes';
import axios from 'axios';

export const actFetchProductsRequest = ()=>dispatch=>{
    axios
        .get('http://localhost:3000/products')
        .then(res=>dispatch({
            type:Types.FETCH_PRODUCTS,
            products: res.data
        }))
        .catch(err=>console.log('loi'));
}
export const actFetchProducts = (products)=>{
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}