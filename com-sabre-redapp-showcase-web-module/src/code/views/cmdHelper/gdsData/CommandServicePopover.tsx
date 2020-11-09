import * as React from "react";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { Input } from "../../../components/Input";
import { Payload } from "../../../components/Payload";
import { PopoverForm } from "../../../components/PopoverForm";
import { getService } from "../../../Context";
import { CommFoundHelper } from "../../../services/CommFoundHelper";

export interface CommandServicePopoverProps {

    handleClose?: () => void;
    navigation?: JSX.Element;
}

export interface CommandServicePopoverState {
    formatToExecute:string;
    showRq:boolean;
    showRs:boolean;
    cmdResponse:any;
}
export class CommandServicePopover extends React.Component<CommandServicePopoverProps,CommandServicePopoverState> {

    constructor(e) {
        super(e);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
    }

    state : CommandServicePopoverState = {
        formatToExecute:"",
        showRq:true,
        showRs:true,
        cmdResponse:null
    }
    handleChange(e) : void {
        this.setState({[e.target.name]:e.target.value});
    }
    handleCheck(e) : void {
        this.setState({[e.target.name]:!this.state[e.target.name]});
    }
    handleExecute() :void {
        getService(CommFoundHelper)
            .sendCommandMessage(
                this.state.formatToExecute,
                this.state.showRq,
                this.state.showRs
            ).then(
                (res)=>{

                    if(this.state.showRs || this.state.showRs){
                        this.props.handleClose();
                    }else{
                        this.setState({cmdResponse:res});
                    }
                    
                }
            );

    }

    renderButtons(): JSX.Element[] {
        return(
            [<Button name="btnCancel" title="Cancel" type="cancel" handleClick={this.props.handleClose}/>,<Button name="btnExecute" title="Execute" type="primary" handleClick={this.handleExecute}/>]
        );
    }
    render(): JSX.Element {
        return (
            <PopoverForm name="" title="" content={null} buttons={this.renderButtons()} navigation={this.props.navigation}>
                <Input type="text" name="formatToExecute" title="Format" placeHolder="enter Sabre GDS Format"  value={this.state.formatToExecute} handleChange={this.handleChange}/>
                <Checkbox disabled={false} name="showRq" title="Show Command" placeHolder="to show or not"  value={this.state.showRq} handleChange={this.handleCheck}/>
                <Checkbox disabled={false} name="showRs" title="Show Response" placeHolder="to show or not"  value={this.state.showRs} handleChange={this.handleCheck}/>
                {this.state.cmdResponse!=null?
                    <Payload name="plResult" type="json" value={JSON.stringify(this.state.cmdResponse)} title="Response payload" />:
                    null
                }
            </PopoverForm>
        );
    }

}