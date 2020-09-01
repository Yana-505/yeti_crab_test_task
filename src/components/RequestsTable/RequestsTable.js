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
            viewDialogVisible: false,
            valueSearch: ""
        }
        this.handleAddNewRequest = this.handleAddNewRequest.bind(this);
        this.handleCreationDialogOpen = this.handleCreationDialogOpen.bind(this)
        this.handleCreationDialogClose = this.handleCreationDialogClose.bind(this);
        this.handleViewDialogOpen = this.handleViewDialogOpen.bind(this);
        this.handleViewDialogClose = this.handleViewDialogClose.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
        this.handleEditRequest = this.handleEditRequest.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3010/requests", {
            method: "GET"
        })
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch(e => console.error(e));
    }

    handleAddNewRequest(newRequest) {
        this.setState({
            data: [...this.state.data, newRequest],
            creationDialogVisible: false
        });
    };

    handleEditRequest(editRequest) {
        this.setState({
            data: this.state.data.map(request => {
                if (request._id === editRequest._id) {
                    return editRequest;
                } else {
                    return request;
                }
            })
        });
    }

    handleCreationDialogOpen() {
        this.setState({
            creationDialogVisible: true
        });
    };

    handleCreationDialogClose() {
        this.setState({
            creationDialogVisible: false
        })
    };

    handleViewDialogOpen(event) {
        // если кликнули на ссылку в табл.
        if (event.target.tagName.toUpperCase() === "A")
            return;
        const id = event.currentTarget.dataset.id;
        this.setState({
            viewDialogVisible: true
        })

        fetch(`http://localhost:3010/requests/${id}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(result => this.setState({selectedRequest: result}))
            .catch(e => console.error(e));
    }

    handleViewDialogClose() {
        this.setState({
            viewDialogVisible: false
        })
    }

    handleDeleteRequest(id) {
        this.setState({
            viewDialogVisible: false,
            data: this.state.data.filter(request => request._id !== id)
        });
    }

    handleSearch(event){
        const value = event.target.value
        this.setState({
            valueSearch: value,
        })
        fetch(`http://localhost:3010/requests?q=${value}`,{
            method: "GET"
        })
            .then(response => response.json())
            .then(result => this.setState({data: result}))

    }

    render() {
        return (
            <div className="requests-all">
                <h1>Таблица заявок</h1>
                <button className="new-request" onClick={this.handleCreationDialogOpen}>Создать заявку</button>
                <input className="search-input" placeholder="Поиск заявок" value={this.state.valueSearch} onChange={this.handleSearch}/>
                <table className="requests-table">
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
                            <tr key={e._id} data-id={e._id} onClick={this.handleViewDialogOpen} className="line-request">
                                <td>{e.number}</td>
                                <td>{e.CompanyName}</td>
                                <td>{e.FIOCarrier}</td>
                                <td>{e.TelephoneCarrier}</td>
                                <td>{e.comment}</td>
                                <td><a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://ati.su/firms/${e.ATICode}/info`}>https://ati.su/firms/{e.ATICode}/info</a>
                                </td>
                            </tr>
                        )
                    }
                </table>
                <RequestCreationDialog onAdd={this.handleAddNewRequest} visible={this.state.creationDialogVisible}
                                       onClose={this.handleCreationDialogClose}/>
                <RequestViewingDialog onEdit={this.handleEditRequest} onDelete={this.handleDeleteRequest}
                                      request={this.state.selectedRequest} visible={this.state.viewDialogVisible}
                                      onClose={this.handleViewDialogClose}/>
            </div>
        );
    }
}