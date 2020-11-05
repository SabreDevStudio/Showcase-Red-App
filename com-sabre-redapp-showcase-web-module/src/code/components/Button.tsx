import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface ButtonProps {
    name:string;
    title:string;
    handleClick?:(e) => void;
    type?: 'primary' | 'secondary' | 'submit' | 'cancel';
    disabled?:boolean;
}
export class Button extends React.Component<ButtonProps,{}> {

    render(): JSX.Element {
        return (
            <button id={this.props.name} type="button" className={"btn".concat(this.props.type=="cancel"?" btn-outline":"").concat(this.props.type!=null?" btn-success":"")} onClick={this.props.handleClick} disabled={this.props.disabled}>
                {this.props.title}
            </button>
        );
    }

}