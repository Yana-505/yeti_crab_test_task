import React, {Component} from "react";
import './RequestTable.css'
import {RequestCreationDialog} from "../RequestCreatoinDialog/RequestCreationDialog.js";
import {RequestViewingDialog} from "../RequestViewingDialog/RequestViewingDialog";

export class RequestsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedRequest: [],
            creationDialogVisible: false,
            viewDialogVisible: false
        }
        this.handleAddNewRequest = this.handleAddNewRequest.bind(this);
        this.handleCreationDialogOpen = this.handleCreationDialogOpen.bind(this)
        this.handleCreationDialogClose = this.handleCreationDialogClose.bind(this);
        this.handleViewDialogOpen = this.handleViewDialogOpen.bind(this);
        this.handleViewDialogClose = this.handleViewDialogClose.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3010/requests", {
            method: "GET"
        })
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch(e => console.error(e));
    }

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

    handleCreationDialogClose(){
        this.setState({
            creationDialogVisible: false
        })
    };

    handleViewDialogOpen(event){
        const id = event.currentTarget.dataset.id;
        this.setState({
            viewDialogVisible: true
        })

        fetch(`http://localhost:3010/requests/${id}`,{
            method: "GET"
        })
            .then(response => response.json())
            .then(result => this.setState({selectedRequest: result}))
            .catch(e => console.error(e));
    }

    handleViewDialogClose(){
        this.setState({
            viewDialogVisible: false
        })
    }

    handleDeleteRequest(id){
        this.setState({
            viewDialogVisible: false,
            data: this.state.data.filter(request => request._id !== id)
        });
    }

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
                            <tr key={e._id} data-id={e._id} onClick={this.handleViewDialogOpen}>
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
                <RequestViewingDialog onDelete = {this.handleDeleteRequest} request={this.state.selectedRequest} visible={this.state.viewDialogVisible} onClose={this.handleViewDialogClose} />
            </div>
        );
    }
}