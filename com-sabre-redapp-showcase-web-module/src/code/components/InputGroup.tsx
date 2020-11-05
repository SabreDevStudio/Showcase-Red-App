import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface InputGroupProps {
    groupPosition: "prepend" | "append";
    componentType: "button" | "check";
    componentValue: any;
    name:string;
    title:string;
    value:string;
    placeHolder:string;
    handleChange?:(e) => void;
    handleClick?:(e?) => void;
}
export class InputGroup extends React.Component<InputGroupProps,{}> {

    renderControl(position:string, ctrl:JSX.Element): JSX.Element {
        return(
        <div className={('input-group-btn input-group-'.concat(position))}>
            
            {ctrl}

        </div>
        );
    }

    componentButton() : JSX.Element {
        return (
            <button className="btn btn-outline-secondary" type="button" id={("btn-").concat(this.props.name)} onClick={this.props.handleClick}>
                {this.props.componentValue}
            </button>
        );
    }


    componentCheck() : JSX.Element {
        return (
            <div className="input-group-text">
                <input type="checkbox" aria-label={("check ").concat(this.props.title)} id={("chk-").concat(this.props.name)} onChange={this.props.handleClick}/>
            </div>
        );
    }

    render(): JSX.Element {
        return (
       <div className="form-group">
            <label className="form-label" htmlFor={this.props.name}>{this.props.title}</label>
            <div className="input-group">
                {this.props.groupPosition=="prepend"?this.renderControl(this.props.groupPosition,this.props.componentType=="button"?this.componentButton():this.componentCheck()):null}
                <input 
                    type="text" 
                    id={this.props.name}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder={this.props.placeHolder} 
                    className="form-control" 
                />
                {this.props.groupPosition=="append"?this.renderControl(this.props.groupPosition,this.props.componentType=="button"?this.componentButton():this.componentCheck()):null}
            </div>

        </div>
        );
    }

}