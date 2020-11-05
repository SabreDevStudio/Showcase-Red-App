import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface InputProps {
    type: "text" | "number" | "textarea";
    name:string;
    title:string;
    value:string;
    placeHolder:string;
    handleChange?:(e) => void;
    rows?:number;
    cols?:number;
}
export class Input extends React.Component<InputProps,{}> {

    render(): JSX.Element {
        return (
        <div className="form-group">
            <label className="form-label" htmlFor={this.props.name}>{this.props.title}</label>
            {
                this.props.type === "textarea"?
                <textarea 
                id={this.props.name}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.handleChange}
                rows={this.props.rows}
                cols={this.props.cols}
                className="form-control">
                    
                </textarea>
                :
                <input 
                type={this.props.type} 
                id={this.props.name}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.handleChange}
                placeholder={this.props.placeHolder} 
                className="form-control" 
                />
            }

        </div>
        );
    }

}