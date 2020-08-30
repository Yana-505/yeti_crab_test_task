import React, {Component} from "react";
import './Dialog.css'
import cancel from './cancel.svg'

export class Dialog extends Component{
    constructor(props) {
        super(props);

        this.handleClickWrapper = this.handleClickWrapper.bind(this);
    }

    handleClickWrapper(e) {
        // target - где произошло событие, currentTarget - где выполняется событие (там, где я его повесила)
        if(e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return(
            <div className={`dialog-wrapper ${this.props.visible ? 'visible' : ''}`} onClick={this.handleClickWrapper}>
                <div className="content">
                    <img src={cancel} onClick={this.props.onClose} className="cancel"/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}