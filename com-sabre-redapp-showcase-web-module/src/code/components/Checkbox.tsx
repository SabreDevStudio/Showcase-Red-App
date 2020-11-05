import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface CheckboxProps {
    name:string;
    title:string;
    value:boolean;
    placeHolder:string;
    handleChange?:(e) => void;
    disabled?:boolean;
}
export class Checkbox extends React.Component<CheckboxProps,{}> {

    render(): JSX.Element {
        return (
        <div className="form-check">
            <input 
                type="checkbox" 
                id={this.props.name}
                name={this.props.name}
                checked={this.props.value}
                disabled={this.props.disabled}
                onChange={this.props.handleChange}
                placeholder={this.props.placeHolder} 
                className="form-check-input" 
            />
            {this.props.title.length>0?
                <label className="form-check-label" htmlFor={this.props.name}>{this.props.title}</label>
            :null}

        </div>
        );
    }

}