import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProductItem extends Component {
    onDeleteClick = (id)=>{
        this.props.onDelete(id);
    }
    render() {
        const {product,index} = this.props;
        var productName = product.status ? 'Còn hàng' : 'Hết hàng';
        var productClass = product.status ? 'warning' : 'default';
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name} </td>
                <td>{product.price} $</td>
                <td>
                    <span className={`label label-${productClass}`}>
                        {productName}
                    </span>
                </td>
                <td>
                    <Link to={`/product/${product.id}/edit`} className="btn btn-success">
                        Sửa
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={()=>this.onDeleteClick(product.id)}>
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default ProductItem;