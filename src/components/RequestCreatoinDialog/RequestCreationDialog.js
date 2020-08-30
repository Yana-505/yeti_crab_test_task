import React, {Component} from "react";
import {Dialog} from "../Dialog/Dialog";

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
            <Dialog>
                <h1>Создание завки</h1>
                <form className="NewRequest" onSubmit={this.handleClick}>
                    <p>Номер заявки <input name="number" type="text" placeholder="Введите номер заявки"/></p>
                    <p>Дата заявки <input name="date" type="date" placeholder="Введите дату заявки"/></p>
                    <p>Время заявки <input name="time" type="time" placeholder="Введите время заявки"/></p>
                    <p>Название фирмы клиента <input name="CompanyName" type="text" placeholder="Введите название фирмы клиента"/></p>
                    <p>ФИО перевозчика <input name="FIOCarrier" type="text" placeholder="Введите ФИО перевозчика"/></p>
                    <p>Телефон перевозчика <input name="TelephoneCarrier" type="text" placeholder="Введите телефон перевозчика"/></p>
                    <p>Коментарий <input name="comment" type="text" placeholder="Введите коментарий заявки"/></p>
                    <p>ATI код <input name="ATICode" type="text" placeholder="Введите ATI код"/></p>
                    <input type="submit" value="Создать заявку"/>
                </form>
            </Dialog>
        )
    }
}