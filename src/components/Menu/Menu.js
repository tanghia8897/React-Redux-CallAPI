import React, { Component } from 'react';
import { Link, Route} from 'react-router-dom';

const Menus = [
    {
        name:"Trang Chủ",
        to:"/",
        exact:true
    },
    {
        name:"Quản Lý Sản Phẩm",
        to:"/product-list",
        exact:false
    }
]
const MenuLink = ({label,to,activeOnlyWhenExact})=>{
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={(match)=>{
                var active = match ? 'active' : '';
                return (
                    <li className={`nav-item ${active}`}>
                        {/* <a className="nav-link active" >Trang Chủ</a> */}
                        <Link to={to} className="nav-link">
                            {label}
                        </Link>
                    </li>
                );
            }}
        />
    );
}
class Menu extends Component {
    showMenu = (Menus)=>{
        var result=null;
        if(Menus.length > 0){
            result = Menus.map((menu,index)=>{
                return(
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            })
        }
        return result;
    }
    render() {
        return (
            <ul className="nav justify-content-center|justify-content-end navbar-default">
                <a className="navbar-brand">CALL API</a>
                {/* <li className="nav-item">
                    <a className="nav-link active" >Trang Chủ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" >Quản Lý Sản Phẩm</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" >Disabled link</a>
                </li> */}
                {this.showMenu(Menus)}
            </ul>
        );
    }
}

export default Menu;