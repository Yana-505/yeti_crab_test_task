import React, {Component} from "react";
import {Dialog} from "../Dialog/Dialog";
import './RequestCreationDialog.css';

/**
 * Форма для создания заявок
 */
export class RequestCreationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const response = await fetch("http://localhost:3010/requests", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        this.props.onAdd(json);
        form.reset();
    }

    render() {
        return (
            <Dialog visible={this.props.visible} onClose={this.props.onClose}>
                <h1>Создание завки</h1>
                <form className="NewRequest" onSubmit={this.handleClick}>
                    <label className="form-label">Номер заявки <input name="number" type="text" placeholder="Введите номер заявки"/></label>
                    <label className="form-label">Дата заявки <input name="date" type="date" placeholder="Введите дату заявки"/></label>
                    <label className="form-label">Время заявки <input name="time" type="time" placeholder="Введите время заявки"/></label>
                    <label className="form-label">Название фирмы клиента <input name="CompanyName" type="text" placeholder="Введите название фирмы клиента"/></label>
                    <label className="form-label">ФИО перевозчика <input name="FIOCarrier" type="text" placeholder="Введите ФИО перевозчика"/></label>
                    <label className="form-label">Телефон перевозчика <input name="TelephoneCarrier" type="text" placeholder="Введите телефон перевозчика"/></label>
                    <label className="form-label">Коментарий <input name="comment" type="text" placeholder="Введите коментарий заявки"/></label>
                    <label className="form-label">ATI код <input name="ATICode" type="text" placeholder="Введите ATI код"/></label>
                    <input type="submit" value="Создать заявку"/>
                </form>
            </Dialog>
        )
    }
}