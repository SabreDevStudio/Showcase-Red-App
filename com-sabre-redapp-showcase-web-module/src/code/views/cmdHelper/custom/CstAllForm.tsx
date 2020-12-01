import * as React from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { InputGroup } from "../../../components/InputGroup";
import { PopoverForm } from "../../../components/PopoverForm";
import { Select } from "../../../components/Select";
import { getService } from "../../../Context";
import { CommFoundHelper } from "../../../services/CommFoundHelper";
import { XmlTools } from "../../../util/XmlTools";
import { ReservationRs } from "sabre-ngv-pos-cdm/reservation";
import { Checkbox } from "../../../components/Checkbox";

import { IAreaService } from "sabre-ngv-app/app/services/impl/IAreaService";
import { Payload } from "../../../components/Payload";


export interface CstAllFormProps {

    handleClose?: () => void;
    navigation?: JSX.Element;
    pnrData?: ReservationRs;
}

export interface CstAllFormState {
    travelType:string;
    ackStage:boolean;
}

export class CstAllForm extends React.Component<CstAllFormProps,CstAllFormState> {

    constructor(e) {
        super(e);
        this.handleChange = this.handleChange.bind(this);
        this.handleExecute = this.handleExecute.bind(this);    
        this.handleAck = this.handleAck.bind(this);    
    }

    private payloads = {
        "AddRemarkRQ" : 
        '<AddRemarkRQ xmlns="http://webservices.sabre.com/sabreXML/2011/10" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ReturnHostCommand="false" TimeStamp="2015-11-30T14:15:00-06:00" Version="2.1.1">'
        +'<RemarkInfo>{Remarks}'
        +'</RemarkInfo>'
        +'</AddRemarkRQ>',
    
        "Remark" : 
        '<Remark Type="General">'
		+'<Text>'
        +'{Text}'
		+'</Text>'
        +'</Remark>'

    };

    state : CstAllFormState = {
        travelType:null,
        ackStage:false
    }

    componentDidMount(): void {
        if(this.props.pnrData && this.readAckStatus(this.props.pnrData,"ACK1")){
            this.setState({
                ackStage:true
            });
        }
    }

    private readAckStatus(res:ReservationRs,stringToSearch:string): boolean {
        if(res && res.Remarks){
            if(res.Remarks.Remark.find(rmk => rmk.Text.indexOf(stringToSearch) >= 0 )){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    handleChange(e) : void {
        this.setState({[e.target.name]:e.target.value});
    }
    handleAck(e) : void {
        this.setState({ackStage:!this.state.ackStage});
    }
    handleExecute() :void {
        let hundredRmks = "";
        for(let i=0;i<100;i++){
            hundredRmks = hundredRmks.concat(this.payloads.Remark.replace("{Text}","REMARK".concat(i.toString())))
        }
        let pl = this.payloads.AddRemarkRQ.replace("{Remarks}",this.payloads.Remark.replace("{Text}","ACK1"+this.state.travelType).concat(hundredRmks));
        getService(CommFoundHelper).sendSWSRequest(
            {action:"AddRemarkLLSRQ",
            payload:pl,
            authTokenType:'SESSION'})
        .then(
            (res)=>{
                getService(CommFoundHelper).refreshTipSummary();
                this.props.handleClose();
                if(res.errorCode!==undefined && res.errorCode!==null) {
                    getService(IAreaService).showBanner('Error',("ERROR CODE : ").concat(res.errorCode),"Custom Helper");
                }else{ 
                    getService(IAreaService).showBanner('Success',"PNR DATA ACKNOWLEDGE","Custom Helper");
                }
            }
        );

    }

    renderButtons(): JSX.Element[] {
        return(
            [<Button name="btnCancel" type="cancel" title="Cancel" handleClick={this.props.handleClose}/>,<Button name="btnExecute" type="primary" title="Execute" disabled={this.readAckStatus(this.props.pnrData,"ACK1") || this.state.ackStage==false} handleClick={this.handleExecute}/>]
        );
    }
    render(): JSX.Element {
        return (
            <PopoverForm name="" title="" content={null} buttons={this.renderButtons()} navigation={this.props.navigation}>
                <Payload type="json" name="plData" title="Reservation data" value={JSON.stringify(this.props.pnrData.Passengers)} />
                <Checkbox name="ackStage" title="acknowledge information" handleChange={this.handleAck} value={this.state.ackStage} placeHolder="" disabled={this.readAckStatus(this.props.pnrData,"ACK1")} />
            </PopoverForm>
        );
    }

}