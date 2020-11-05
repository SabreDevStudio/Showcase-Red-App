import * as React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ModalForm } from "../../components/ModalForm";
import { PopoverForm } from "../../components/PopoverForm";
import { getService } from "../../Context";
import { CommFoundHelper } from "../../services/CommFoundHelper";
import {LayerService} from "sabre-ngv-core/services/LayerService";

export interface AfterSellPopoverProps {

    handleClose?: () => void;
    navigation?: JSX.Element;
}

export interface AfterSellPopoverState {
    phoneNbr:string;
    ttl:string;
}
export class AfterSellPopover extends React.Component<AfterSellPopoverProps,AfterSellPopoverState> {

    constructor(e) {
        super(e);
        this.handleChange = this.handleChange.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
    }

    state : AfterSellPopoverState = {
        phoneNbr:"9SAO31461500",
        ttl:"7TAW/"
    }
    closeLayer = (): void => {
        getService(LayerService).clearLayer(33);
    }
    handleChange(e) : void {
        this.setState({[e.target.name]:e.target.value});
    }
    handleExecute() :void {
        let cf = getService(CommFoundHelper);
        cf.sendCommandMessage(this.state.phoneNbr,true,true)
            .then((res)=>{
                cf.sendCommandMessage(this.state.ttl,false,false).then(
                    (res)=>{
                        cf.refreshTipSummary();
                        this.closeLayer();
                    }
                );
            });

    }

    renderButtons(): JSX.Element[] {
        return(
            [<Button name="btnCancel" type="cancel" title="Cancel" handleClick={this.closeLayer}/>,<Button name="btnExecute" type="primary" title="Execute" handleClick={this.handleExecute}/>]
        );
    }
    render(): JSX.Element {
        return (
            <ModalForm name="" title="AFTER SELL" content={null} buttons={this.renderButtons()}>
                <Input type="text" name="phoneNbr" title="Agent Phone" placeHolder="enter phone number"  value={this.state.phoneNbr} handleChange={this.handleChange}/>
                <Input type="text" name="ttl" title="Ticket Time Limit" placeHolder="enter ticket time limit"  value={this.state.ttl} handleChange={this.handleChange}/>

            </ModalForm>
        );
    }

}