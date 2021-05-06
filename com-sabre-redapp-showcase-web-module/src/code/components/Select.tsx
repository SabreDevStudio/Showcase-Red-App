import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface SelectProps {
    name:string;
    title:string;
    value?:any;
    placeHolder?:string;
    handleChange?:(e) => void;
    options?: any;
    fetchOptions? : Promise<any>;
}
export class Select extends React.Component<SelectProps,{options:[{key:string,value:string}]}> {

    constructor(props) {
        super(props);
        this.state = {
            options:null
        }
    }

    componentWillMount() {
        console.log("propos",this.props.fetchOptions,this.props.options);
        if(!_.isUndefined(this.props.fetchOptions)){
            console.log("has fecthoptions");

            this.props.fetchOptions.then(res=>{
                console.log("thenres",res)
                this.setState({options:res});
            })
        }
        if(!_.isUndefined(this.props.options)){
            console.log("has options");
            this.setState({options:this.props.options});
            
        }

    }

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
                {this.state.options && this.state.options.map(opt=>{
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