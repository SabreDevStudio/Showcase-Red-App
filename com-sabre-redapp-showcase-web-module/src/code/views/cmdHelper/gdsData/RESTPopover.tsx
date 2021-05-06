import * as React from "react";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { Input } from "../../../components/Input";
import { InputGroup } from "../../../components/InputGroup";
import { Payload } from "../../../components/Payload";
import { PopoverForm } from "../../../components/PopoverForm";
import { Select } from "../../../components/Select";
import { getService } from "../../../Context";
import { CommFoundHelper } from "../../../services/CommFoundHelper";
import { XmlTools } from "../../../util/XmlTools";

export interface RESTServicePopoverProps {

    handleClose?: () => void;
    navigation?: JSX.Element;
}

export interface RESTServicePopoverState {
    url:string;
    httpMethod:'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' ;
    authTokenType:'SESSIONLESS' | 'SESSION';
    payload:string;
    headers:string;
    response:any;
    shouldParse:boolean;
    isExternal:boolean;
}

export class RESTServicePopover extends React.Component<RESTServicePopoverProps,RESTServicePopoverState> {
    constructor(e) {
        super(e);
        this.handleChange = this.handleChange.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
 //       this.getPrettyParsedXML = this.getPrettyParsedXML.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleIsExt = this.handleIsExt.bind(this);
    }
    private payloads = {
        "/v1/lists/utilities/geocode/locations" : 
        '[{"GeoCodeRQ": {"PlaceById": {"Id": "DFW","BrowseCategory": {"name": "AIR"}}}}]',
        "/v1/lists/carriers/destinations" : 
        '?origin={AIRPORT}&airlinecode={AIRLINE}&departuredate=2020-12-12'

    };

    state : RESTServicePopoverState = {
        url:null,
        httpMethod:"POST",
        authTokenType:"SESSION",
        payload:null,
        headers:null,
        response:null,
        shouldParse:false,
        isExternal:false
    }
    handleChange(e) : void {
        if(e.target.name==="url" && this.payloads[e.target.value]!=null){
            this.setState({[e.target.name]:e.target.value,payload:this.payloads[e.target.value]});
        }else{
            this.setState({[e.target.name]:e.target.value});
        }
    }
    handleCheck(e?) : void {
        this.setState({shouldParse:e.target.checked});
    }
    handleIsExt(e) : void {
        this.setState({isExternal:e.target.checked});
    }
    handleExecute() :void {
        if(!this.state.isExternal){
            getService(CommFoundHelper).sendRestRequest({
                httpMethod: this.state.httpMethod,
                url: this.state.url,
                authTokenType: this.state.authTokenType,
                payload: this.state.payload,
                headers: this.state.headers
            }).then(
                (res)=>{
                    if(res && res.body){
                        this.setState({response:res.body});                        
                    }else{
                        this.setState({response:res});
                    }
                }
            );
        }else{
            getService(CommFoundHelper).sendExternalHttpRequest({
                httpMethod:this.state.httpMethod,
                url: this.state.url,
                authTokenType: this.state.authTokenType,
                payload: this.state.payload,
                headers: this.state.headers
            }).then(

            )
        }
    }

    renderButtons(): JSX.Element[] {
        return(
            [<Button name="btnCancel" type="cancel" title="Cancel" handleClick={this.props.handleClose}/>,<Button name="btnExecute" type="primary" title="Execute" handleClick={this.handleExecute}/>]
        );
    }
    render(): JSX.Element {
        return (
            <PopoverForm name="" title="" content={null} buttons={this.renderButtons()} navigation={this.props.navigation}>
                <Input type="text" name="url" title="Service endpoint" placeHolder="enter Sabre REST API endpoint"  value={this.state.url} handleChange={this.handleChange}/>
                <Select name="httpMethod" title="Method" value={this.state.httpMethod} handleChange={this.handleChange} placeHolder="Select an option" options={[{"key":"GET","value":"Get"},{"key":"POST","value":"Post"}]}/>
                <Input type="textarea" rows={10} name="payload" title="JSON Request" placeHolder="enter Service Request payload (XML content)"  value={this.state.payload} handleChange={this.handleChange}/>
                <Payload type="json" name="plData" title="JSON Response" value={JSON.stringify(this.state.response)} />
                <Checkbox name="isExt" title="external" handleChange={this.handleIsExt} value={this.state.isExternal} placeHolder="" />
            </PopoverForm>
        );
    }

}
//                <InputGroup componentType="check" componentValue={this.state.shouldParse} groupPosition="prepend" name="rsfilter" title="Parse response" placeHolder="enter a XPATH expression" value={this.state.rsfilter} handleChange={this.handleChange} handleClick={this.handleCheck} />
