import React, {Component} from "react";
import './RequestTable.css'
import {RequestCreationDialog} from "../RequestCreatoinDialog/RequestCreationDialog.js";

export class RequestsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            creationDialogVisible: false
        }
        this.handleAddNewRequest = this.handleAddNewRequest.bind(this);
        this.handleCreationDialogOpen = this.handleCreationDialogOpen.bind(this)
        this.handleCreationDialogClose = this.handleCreationDialogClose.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3010/requests", {
            method: "GET"
        })
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch(e => console.error(e));
    }

    handleCreationDialogClose(){
        this.setState({
            creationDialogVisible: false
        })
    };

    handleAddNewRequest(newRequest){
        this.setState({
            data: [...this.state.data, newRequest],
            creationDialogVisible: false
        });
    };

    handleCreationDialogOpen(){
        this.setState({
            creationDialogVisible: true
        });
    };

    render() {
        return (
            <div className="RequestsAll">
                <h1>Таблица заявок</h1>
                <button className="newRequest" onClick={this.handleCreationDialogOpen}>Создать заявку</button>
                <table className="RequestsTable">
                    <tr>
                        <th>Номер заявки</th>
                        <th>Название фирмы клиента</th>
                        <th>ФИО перевозчика</th>
                        <th>Контактный телефон перевозчика</th>
                        <th>Коментарий</th>
                        <th>ATI код</th>
                    </tr>
                    {
                        this.state.data.map(e =>
                            <tr key={e._id} onClick={this.viewingRequest}>
                                <td>{e.number}</td>
                                <td>{e.CompanyName}</td>
                                <td>{e.FIOCarrier}</td>
                                <td>{e.TelephoneCarrier}</td>
                                <td>{e.comment}</td>
                                <td><a href={`https://ati.su/firms/${e.ATICode}/info`}>https://ati.su/firms/{e.ATICode}/info</a></td>
                            </tr>
                        )
                    }
                </table>
                <RequestCreationDialog onAdd={this.handleAddNewRequest} visible={this.state.creationDialogVisible} onClose={this.handleCreationDialogClose} />
            </div>
        );
    }
}