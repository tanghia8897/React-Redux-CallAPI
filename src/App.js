import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import { Route,Switch, BrowserRouter as Router} from 'react-router-dom';
import routes from './routes';


class App extends Component {
   
    render() {
        return (
            <Router>
                <div className="App">
                    <Menu />
                    <div className="container">
                        <div className="row">

                            {this.showContentMenu(routes)} 
                        </div>
                    </div>
                </div>  
            </Router>
        );
    }
    showContentMenu = (routes)=>{
        var result = null;
        if(routes.length > 0){
            result = routes.map((route,index)=>{
                return (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                )
            })
            return <Switch>{result}</Switch>;
        }
    }
}

export default App;
