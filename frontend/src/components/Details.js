import Axios from 'axios';
import React, { Component } from 'react';
import Slider from './Slider';
import Global from '../Global';
import { DataGrid } from '@material-ui/data-grid';

class Details extends Component {

    state = {
        login: {},
        userData: [],
        app: null,
        status: null
    }

    componentWillMount() {

        this.setState({
            login: this.props.location.state.login,
            app: this.props.location.state.app,
            userData: [],
            status: 'success'
        });

    }

    componentDidMount() {
        var email = 'contacto@tuten.cl';
        var url = Global.url;

        Axios.get(url + email + '/bookings', {
            headers: {
                'adminemail': this.state.login.email,
                'token': this.state.login.sessionTokenBck,
                'app': this.state.app
            },
            params: {
                current: true
            }
        })
            .then(res => {

                var dataFormat = [];

                for (var i = 0; i < res.data.length; i++) {
                    dataFormat.push({
                        bookingId: res.data[i].bookingId,
                        bookingTime: res.data[i].bookingTime,
                        bookingPrice: res.data[i].bookingPrice,
                        streetAddress: res.data[i].locationId.streetAddress,
                        firstName: res.data[i].tutenUserClient.firstName,
                        lastName: res.data[i].tutenUserClient.lastName
                    });
                }

                this.setState({
                    userData: dataFormat,
                    status: 'success'
                });
                console.log(this.state.userData);
            })
            .catch(err => {
                alert(err);
                this.setState({
                    status: 'Error'
                });
            });

    }



    render() {

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'bookingId', headerName: 'Booking Id', width: 100 },
            { field: 'customer', headerName: 'Cliente', width: 200 },
            { field: 'bookingTime', headerName: 'Fecha', width: 170 },
            {
                field: 'streetAddress',
                headerName: 'Dirección',
                sortable: false,
                width: 585,
            },
            {
                field: 'price',
                headerName: 'Precio',
                type: 'number',
                width: 100,
            }
        ];

        var rows = [];
            
        for (var i = 0; i < this.state.userData.length; i++) {
                rows.push({
                    id: i,
                    bookingId: this.state.userData[i].bookingId,
                    customer: this.state.userData[i].firstName +' '+ this.state.userData[i].lastName,
                    bookingTime: this.state.userData[i].bookingTime,
                    streetAddress: this.state.userData[i].streetAddress,
                    price: this.state.userData[i].bookingPrice
                });
        }

        return (
            <div id="details">
                <Slider
                    title="BOOKINGS"
                />
                <div className="center">
                    <div id="content">

                        <h2 className="subheader">CLIENTES</h2>

                        <div id="data-grid" style={{ height: 400, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Details;