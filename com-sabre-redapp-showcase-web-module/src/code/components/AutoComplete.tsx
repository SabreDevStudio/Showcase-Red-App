import * as React from "react";
//import { availableForms, OwnState } from "./CommFoundComponents";

export interface AutoCompleteProps {
    //type: "text" | "number";
    name:string;
    title:string;
    value?:string;
    selectedValue?:string;
    placeHolder?:string;
    handleSelect?:(e) => void;
    options? : Array<any>;
    fetchOptions?: (filter) => Promise<any>;
}

export interface AutoCompleteState {
    activeOption:number,
    filteredOptions:Array<any>,
    showOptions: boolean,
    userInput: string
}
export class AutoComplete extends React.Component<AutoCompleteProps,AutoCompleteState> {

    state = {
        activeOption:0,
        filteredOptions:[],
        showOptions:false,
        userInput:''
    }

    onChange = (e) => {
        const inputValue:string = e.currentTarget.value;
        if(!_.isUndefined(this.props.options)){
            //const opts = this.props.options(inputValue);
            const filteredOpts = this.props.options.filter(
                (item) => item.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
            );
            this.setState({
                activeOption:0,
                filteredOptions:filteredOpts,
                showOptions:true,
                userInput:inputValue
            });
        }else if(!_.isUndefined(this.props.fetchOptions)){
            this.props.fetchOptions(inputValue)
            .then((res)=>{
                console.log("fetched",res);
                const filteredOpts = res;

                this.setState({
                    activeOption:0,
                    filteredOptions:filteredOpts,
                    showOptions:true,
                    userInput:inputValue
                });
            })
            .catch(()=>{
                this.setState({
                    activeOption:0,
                    filteredOptions: [],
                    showOptions:false,
                    userInput:inputValue
                });
            })
        }
    }

    onClick = (e) => {
        this.setState({
            activeOption:0,
            filteredOptions: [],
            showOptions:false,
            userInput:e.currentTarget.innerText
        });
        if(!_.isUndefined(this.props.handleSelect)){
            //console.log("clicou",e,e.target,e.target.getAttribute("value"));
            this.props.handleSelect({key:e.currentTarget.getAttribute("value"),value:e.currentTarget.innerText})
        }
    }

    onKeyDown = (e) => {
        const {activeOption, filteredOptions} = this.state;
        if (e.keyCode === 13) {
            
            this.setState({
                activeOption:0,
                showOptions:false,
                userInput: filteredOptions[activeOption].value
            });
            if(!_.isUndefined(this.props.handleSelect)){
                this.props.handleSelect(filteredOptions[activeOption]);
            }
        } else if (e.keyCode === 38) {
            if(activeOption===0){
                return;
            }
            this.setState({
                activeOption: activeOption -1
            });

        } else if (e.keyCode === 40) {
            if(activeOption=== filteredOptions.length -1){
                return;
            }
            this.setState({
                activeOption: activeOption + 1
            });
        }
    }

    render(): JSX.Element {

        const {
            onChange,
            onClick,
            onKeyDown,

            state: {
                activeOption,
                filteredOptions,
                showOptions,
                userInput
            }
        } = this;

        let optionList;
//        let stl =  "position: absolute; visibility: hidden; white-space: pre";
        if(showOptions && userInput){
            if(filteredOptions.length){
                optionList = (
                    <div className="tt-menu tt-open">
                    <ul className="tt-dataset options">
                        {
                            filteredOptions.map((optionName,index) => {
                                let className;
                                if(index === activeOption) {
                                    className="tt-current option-active";
                                }
                                return (
                                    <li value={optionName.key} className={"tt-suggestion tt-selectable ".concat(className)} key={optionName.key} onClick={onClick}>
                                        <strong>({optionName.key})</strong>&nbsp;{optionName.value}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </div>
                )
            }else{
                optionList = (
                    <div className="no-options">
                        <em>no options</em>
                    </div>
                );

            }
        }
        return (
            <div className="form-group">
                <label className="form-label" htmlFor={this.props.name}>{this.props.title}</label>
                <input
                    name={this.props.name}
                    id={this.props.name}
                    type="text"
                    className="form-control tt-input search-box"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                <div className="twitter-typeahead form-group">
                {optionList}
                </div>
            </div>
        );
    }
    
}