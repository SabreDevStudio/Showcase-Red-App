import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface SelectProps {
    name:string;
    title:string;
    value?:any;
    placeHolder?:string;
    handleChange?:(e) => void;
    options : Array<{key:string,value:string}>;
}
export class Select extends React.Component<SelectProps,{}> {

    render(): JSX.Element {
        return (
        <div className="form-group">
            <label className="form-label" htmlFor={this.props.name}>{this.props.title}</label>
            <select 
                id={this.props.name}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.handleChange}
                className="form-control" 
            >
                <option value="" disabled>{this.props.placeHolder}</option>
                {this.props.options.map(opt=>{
                    return (
                        <option
                            key={opt.key}
                            value={opt.key}
                            label={opt.value}>
                            {opt.value}
                        </option>
                    );
                })

                }
            </select>

        </div>
        );
    }

}