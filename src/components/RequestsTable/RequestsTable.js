import React, {Component} from "react";
import './RequestTable.css'
import {RequestCreationDialog} from "../RequestCreatoinDialog/RequestCreationDialog";

export class RequestsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            newRequest: false
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.newRequestClick = this.newRequestClick.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:3010/requests", {
            method: "GET"
        })
            .then(response => {
                // debugger;
                return response.json();
            })
            .then(result => {
                // debugger;
                this.setState({data: result});
            })
            .catch(e => {
                console.error(e);
            });
    }

    handleAdd(newRequest){
        this.setState({
            data: [...this.state.data, newRequest],
            newRequest: false
        });
    }

    newRequestClick(){
        this.setState({
            newRequest: true
        });
    }

    render() {
        return (
            <div className="RequestsAll">
                <h1>Таблица заявок</h1>
                <button className="newRequest" onClick={this.newRequestClick}>Создать заявку</button>
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
                            <tr key={e._id}>
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
                <div className={`creature-request ${this.state.newRequest ? 'creature-request-choice' : ''}`}>
                    <RequestCreationDialog onAdd={this.handleAdd}/>
                </div>
            </div>
        );
    }
}