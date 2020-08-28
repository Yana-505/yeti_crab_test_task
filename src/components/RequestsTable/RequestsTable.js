import React, {Component} from "react";
import './RequestTable.css'

export class RequestsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isFetching: true,
            error: null
        }
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
                this.setState({data: result, isFetching: false});
            })
            .catch(e => {
                console.error(e);
            });
    }

    render() {
        return (
            <div className="RequestsAll">
                <h1>Таблица заявок</h1>
                <button className="newRequest">Создать заявку</button>
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
                            <tr>
                                <td>{e.number}</td>
                                <td>{e.CompanyName}</td>
                                <td>{e.FIOCarrier}</td>
                                <td>{e.TelephoneCarrier}</td>
                                <td>{e.comment}</td>
                                <td><a href=''>https://ati.su/firms/{e.ATICode}/info</a></td>
                            </tr>
                        )
                    }
                </table>
            </div>
        );
    }
}