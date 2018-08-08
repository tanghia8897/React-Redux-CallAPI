import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtName:'',
            txtPrice:'',
            chkbStatus:''
        }
    }
    componentDidMount() {
        var {match}=this.props;
        if(match){
            var id=match.params.id;
            axios({
                method:'GET',
                url: `http://localhost:3000/products/${id}`,
                data:""
            }).then(res=>{
                console.log(res.data);
                this.setState({
                    txtName:res.data.name,
                    txtPrice:res.data.price,
                    chkbStatus:res.data.status
                })
                                                                    
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    
    onChange = e=>{
        var name = e.target.name;
        var value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[name]:value})
    }
    onSubmit = e=>{
        e.preventDefault();
        var productData = {
            name:this.state.txtName, //điền name là giống trong db(tức trong db là name thì trong này phải là name)
            price:this.state.txtPrice,
            status:this.state.chkbStatus
        }
        if(!this.state.id){
            axios({
                method:'POST',
                url: "http://localhost:3000/products",
                data:productData
            }).then(res=>{
                window.alert('thêm thành công');
                window.location='http://localhost:4000/product-list'; //ta có thể dùng location hoặc truyền thêm thằng history
                                                                    //và dùng phương thức push hoặc goBack để redirect
            }).catch(err=>{
                console.log(err);
            })
        }else{
            axios({
                method:'PUT',
                url: `http://localhost:3000/products/${this.state.id}`,
                data:productData
            }).then(res=>{
                window.alert('Sua thành công');
                window.location='http://localhost:4000/product-list'; //ta có thể dùng location hoặc truyền thêm thằng history
                                                    //và dùng phương thức push hoặc goBack để redirect
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    render() {
        
        return (
            <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 pt-4">
                <Link to="/product-list" className="btn btn-light">
                    Go Back
                </Link>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="txtName"
                            value={this.state.txtName}
                            onChange={this.onChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="txtPrice"
                            value={this.state.txtPrice}
                            onChange={this.onChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input 
                                type="checkbox"
                                name="chkbStatus"
                                value={this.state.chkbStatus}
                                onChange={this.onChange} 
                                checked={this.state.chkbStatus}
                            />
                            Còn hàng
                        </label>
                    </div>
                    <button type="submit" className="btn  btn-primary">Lưu</button>
                </form>
            </div>
        );
    }
}

export default ProductActionPage;