import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface FormProps {
    name:string;
    title:string;
    buttons:JSX.Element;
}
export class Form extends React.Component<FormProps,{}> {

    render(): JSX.Element {
        return (
            <div className="popover-wrapper">
                
                <div className="content content-scroll">{this.props.children}</div>
                <div className="tab-action-buttons">{this.props.buttons}</div>
            </div>
        );
    }

}