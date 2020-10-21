import Axios from 'axios';
import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom';
import Slider from './Slider';
import Global from '../Global';


class Formulario extends Component {

    userRef = React.createRef();
    passwordRef = React.createRef();
    appRef = React.createRef();

    state = {
        login: {},
        app: null,
        status: null
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'El campo es requerido'
            }
        });
    }

    changeState = () => {
        var app = '';

        if (this.appRef.current.checked) {
            app = this.appRef.current.value;
        }

        this.setState({
            login: {
                user: this.userRef.current.value,
                password: this.passwordRef.current.value,
                app: app
            }
        });
    }

    recibirFormulario = (e) => {
        e.preventDefault();

        var url = Global.url;

        this.changeState();

        if (this.validator.allValid()) {

            Axios.put(url + this.state.login.user, {}, {
                headers: {
                    'password': this.state.login.password,
                    'app': this.state.login.app
                }
            })
                .then(res => {
                    this.setState({
                        login: res.data,
                        status: 'success',
                        app: this.state.login.app
                    });
                    console.log(this.state);
                })
                .catch(err => {
                    alert(err);
                    this.setState({
                        status: 'Error'
                    });
                });

        } else {

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to={{
                pathname: "/details",
                search: "",
                state: this.state,
                app: this.state.login.app
            }}
            />
        }

        return (
            <div id="formulario">
                <Slider
                    title="LOGIN"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Iniciar Sesion</h1>

                        {/*  Crear formulario */}
                        <form className="mid-form" onSubmit={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="user">User:</label>
                                <input type="text" name="user" ref={this.userRef} onChange={this.changeState} />

                                {this.validator.message('user', this.state.login.user, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" ref={this.passwordRef} onChange={this.changeState} />

                                {this.validator.message('password', this.state.login.password, 'required')}
                            </div>

                            <div className="form-group radiobuttons">
                                <input type="checkbox" name="app" value="APP_BCK" ref={this.appRef} onChange={this.changeState} />APP_BCK

                                {this.validator.message('app', this.state.login.app, 'required')}
                            </div>

                            {/* LIMPIAR FLOTADOS */}
                            <div className="clearfix"></div>

                            <input type="submit" value="Ingresar" className="btn btn-success" />
                        </form>
                    </div>
                </div> {/* END DIV CENTER */}
            </div>
        );
    }
}

export default Formulario;