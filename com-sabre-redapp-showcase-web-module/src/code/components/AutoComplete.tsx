import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface AutoCompleteProps {
    //type: "text" | "number";
    name:string;
    title:string;
    value:string;
    placeHolder:string;
    handleChange?:(e) => void;
    options : Array<{key:string,value:string}>;
}
export class AutoComplete extends React.Component<AutoCompleteProps,{}> {

    renderAcItems(): JSX.Element {
        return (
            <ul id="autocomplete" className={'dropdown-menu ac-'.concat(this.props.name)}>
                {this.props.options.map(opt=>{
                    return (
                        <li value={opt.key} onClick={this.props.handleChange}><a href="#">{opt.value}</a></li>
                    );
                })}
            </ul>
        );
    }
    render(): JSX.Element {
        return (
        <div className="form-group">
            <label className="form-label" htmlFor={this.props.name}>{this.props.title}</label>
            {/*<div className="dropdown" >
                <input 
                    type="text" 
                    id={this.props.name}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder={this.props.placeHolder} 
                    className="form-control dropdown-toggle"
                    data-toggle="dropdown" 
                />
                {this.props.options.length>0?this.renderAcItems():null}
            </div>*/}
            <input 
                list={"ac".concat(this.props.name)}
                name = {this.props.name}
                id = {this.props.name}
                className = "form-control"
            />
            <datalist
                id = {"ac".concat(this.props.name)}>
                  {this.props.options.map(opt=>{
                    return (
                    <option value={opt.key}>{opt.value}</option>
                    );
                })}
              
            </datalist>
        </div>
        );
    }

}