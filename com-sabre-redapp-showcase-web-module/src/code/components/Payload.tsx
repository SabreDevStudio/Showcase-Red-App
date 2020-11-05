import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface PayloadProps {
    type: "json" | "xml";
    name:string;
    title:string;
    value:string;
    handleChange?:(e) => void;
    rows?:number;
    cols?:number;
}
export class Payload extends React.Component<PayloadProps,{}> {

    render(): JSX.Element {
        return (
        <div className="form-group">
            <label className="form-label" htmlFor={this.props.name}>{this.props.title}</label>
            <pre id={this.props.name} style={{maxHeight:'200px',minHeight:'200px'}}>{this.props.value}</pre>
        
        </div>
        );
    }

}