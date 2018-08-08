import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {actFetchProducts} from './../../actions/index';
class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[]
        }
    }
    onDelete = (id)=>{
        var {products} = this.state;
        axios({
            method:'DELETE',
            url: `http://localhost:3000/products/${id}`,
            data:""
        }).then(res=>{
            var index = this.findIndex(products,id);
            if(window.confirm(`Bạn có muốn xóa ${products[index].name} ra khỏi danh sách !!!`)){//lúc này data trên server đã được xóa,bây giờ ta xóa dl 
                                                //trong mảng tại client rồi render lại trang là xong.
               
                products.splice(index,1);
                this.setState({products:products});
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    findIndex = (products,id)=>{
        var result;
        if(products.length > 0){
            products.forEach((product,index) => {
                if(product.id === id){
                    result = index;
                }
            });
        }
        return result;
    }

    componentDidMount() {
        axios({
            method:"GET",
            url:"http://localhost:3000/products",
            data:""
        }).then(res=>{
            this.props.fetchAllProducts(res.data);
        }).catch(res=>console.log("Looir"));
    }
    
    showProduct = products=>{
        var result=null;
        if(products.length > 0){
            result = products.map((product,index)=>{
                return(
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
            return result;
        }
    }
    
    render() {
        var {products}=this.props;
        console.log(products);
        return (
            <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12 mt-4">
                <Link to="/product/add" className="btn btn-info mb-2">
                    Them san pham
                </Link>
                <ProductList>
                    {this.showProduct(products)}
                </ProductList>
            </div> 
        );
    }
}

const mapStateToProps = state=>{
    return {
        products:state.products
    }
}

const mapDispatchToProps = (dispatch,props)=>{
    return {
        fetchAllProducts : (products)=>{
            dispatch(actFetchProducts(products))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListPage);