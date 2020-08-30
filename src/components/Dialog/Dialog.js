import React, {Component} from "react";
import './Dialog.css'

export class Dialog extends Component{
    render() {
        return(
            <div className="dialog-wrapper">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}