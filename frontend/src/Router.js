import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Details from './components/Details';
import Header from './components/Header';
import Footer from './components/Footer';
import Formulario from './components/Formulario';

class Router extends Component {
    render() {

        return (
            <BrowserRouter>

                <Header />

                <Switch>
                    <Route exact path="/" component={Formulario} />
                    <Route exact path="/login" component={Formulario} />
                    <Route exact path="/details" component={Details}/>
                </Switch>

                <Footer />
            
            </BrowserRouter>
        );
    }
}

export default Router;