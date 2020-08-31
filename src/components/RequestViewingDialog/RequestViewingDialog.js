import React, {Component} from "react";
import {Dialog} from "../Dialog/Dialog";
import './RequestViewingDialog.css'

export class RequestViewingDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            editingRequest: {}
        }
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleClickDelete(){
        const id = this.props.request._id
        fetch(`http://localhost:3010/requests/${id}`, {
            method: "DELETE"
        })
        this.props.onDelete(id);
    }

    handleClickEdit(){
        this.setState({
            isEdit: true,
            editingRequest: this.props.request
        })
        console.log(this.state.isEdit)
    }

    handleClose(){
        this.props.onClose()
        this.setState({
            isEdit: false
        })
    }

    handleInputChange(event){
        event.preventDefault();

        const name = event.target.name
        const value = event.target.value

        const r = this.state.editingRequest;
        r[name] = value

        this.setState({
            editingRequest: r
        })
    }

    async handleClickSave(event){
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const id = this.props.request._id;

        const response = await fetch(`http://localhost:3010/requests/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const json = await response.json();
        this.props.onEdit(json);
        form.reset();
        this.setState({
            isEdit: false
        })
        this.props.onClose()
    }

    render() {
        return (
            <Dialog visible={this.props.visible} onClose={this.handleClose}>
                <div className={`view-request ${this.state.isEdit ? 'hide' : ''}`}>
                    <h1>Просмотр завки</h1>
                    <div >
                        <div className="data-prop">Номер заявки: <span className="data-field">{this.props.request.number}</span></div>
                        <div className="data-prop">Дата заявки: <span className="data-field">{this.props.request.date}</span></div>
                        <div className="data-prop">Время заявки: <span className="data-field">{this.props.request.time}</span></div>
                        <div className="data-prop">Название фирмы клиента: <span className="data-field">{this.props.request.CompanyName}</span></div>
                        <div className="data-prop">ФИО перевозчика: <span className="data-field">{this.props.request.FIOCarrier}</span></div>
                        <div className="data-prop">Телефон перевозчика: <span className="data-field">{this.props.request.TelephoneCarrier}</span></div>
                        <div className="data-prop">Коментарий: <span className="data-field">{this.props.request.comment}</span></div>
                        <div className="data-prop">ATI код: <span className="data-field">{this.props.request.ATICode}</span></div>
                    </div>
                    <button onClick={this.handleClickDelete}>Удалить заявку</button>
                    <button onClick={this.handleClickEdit}>Редактировать заявку</button>
                </div>
                <div className={`view-request ${!this.state.isEdit ? 'hide' : ''}`}>
                    <h1>Измениение заявки</h1>
                    <form className="NewRequest" onSubmit={this.handleClickSave}>
                        <div className="data-prop">Номер заявки: <span className="data-field">{this.props.request.number}</span></div>
                        <label className="form-label">Дата заявки <input name="date" type="date" placeholder="Введите дату заявки"
                        value={this.state.editingRequest.date} onChange={this.handleInputChange}/></label>
                        <label className="form-label">Время заявки <input name="time" type="time" placeholder="Введите время заявки"
                        value={this.state.editingRequest.time} onChange={this.handleInputChange}/></label>
                        <label className="form-label">Название фирмы клиента <input name="CompanyName" type="text" placeholder="Введите название фирмы клиента"
                        value={this.state.editingRequest.CompanyName} onChange={this.handleInputChange}/></label>
                        <label className="form-label">ФИО перевозчика <input name="FIOCarrier" type="text" placeholder="Введите ФИО перевозчика"
                        value={this.state.editingRequest.FIOCarrier} onChange={this.handleInputChange}/></label>
                        <label className="form-label">Телефон перевозчика <input name="TelephoneCarrier" type="text" placeholder="Введите телефон перевозчика"
                        value={this.state.editingRequest.TelephoneCarrier} onChange={this.handleInputChange}/></label>
                        <label className="form-label">Коментарий <input name="comment" type="text" placeholder="Введите коментарий заявки"
                        value={this.state.editingRequest.comment} onChange={this.handleInputChange}/></label>
                        <label className="form-label">ATI код <input name="ATICode" type="text" placeholder="Введите ATI код"
                        value={this.state.editingRequest.ATICode} onChange={this.handleInputChange}/></label>
                        <input type="submit" value="Сохранить изменения"/>
                    </form>
                </div>
            </Dialog>
        )
    }

}