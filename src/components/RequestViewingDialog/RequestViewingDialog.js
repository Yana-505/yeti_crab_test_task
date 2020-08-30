import React, {Component} from "react";
import {Dialog} from "../Dialog/Dialog";
import './RequestViewingDialog.css'

export class RequestViewingDialog extends Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const id = this.props.request._id
        fetch(`http://localhost:3010/requests/${id}`,{
            method: "DELETE"
        })
        this.props.onDelete(id);
    }

    render() {
        return(
            <Dialog visible={this.props.visible} onClose={this.props.onClose}>
                <h1>Просмотр завки</h1>
                <div className="NewRequest" >
                    <div className="data-prop">Номер заявки: <span className="data-field">{this.props.request.number}</span></div>
                    <div className="data-prop">Дата заявки: <span className="data-field">{this.props.request.date}</span></div>
                    <div className="data-prop">Время заявки: <span className="data-field">{this.props.request.time}</span></div>
                    <div className="data-prop">Название фирмы клиента: <span className="data-field">{this.props.request.CompanyName}</span></div>
                    <div className="data-prop">ФИО перевозчика: <span className="data-field">{this.props.request.FIOCarrier}</span></div>
                    <div className="data-prop">Телефон перевозчика: <span className="data-field">{this.props.request.TelephoneCarrier}</span></div>
                    <div className="data-prop">Коментарий: <span className="data-field">{this.props.request.comment}</span></div>
                    <div className="data-prop">ATI код: <span className="data-field">{this.props.request.ATICode}</span></div>
                    <button onClick={this.handleClick}>Удалить заявку</button>
                </div>
            </Dialog>
        )
    }

}