import * as React from "react";
import { AutoComplete } from "../../../components/AutoComplete";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { InputGroup } from "../../../components/InputGroup";
import { Payload } from "../../../components/Payload";
import { PopoverForm } from "../../../components/PopoverForm";
import { getService } from "../../../Context";
import { CommFoundHelper } from "../../../services/CommFoundHelper";
import { Variables } from "../../../services/Variables";
import { XmlTools } from "../../../util/XmlTools";

export interface SOAPServicePopoverProps {

    handleClose?: () => void;
    navigation?: JSX.Element;
}

export interface SOAPServicePopoverState {
    actionCode:string;
    payload:string;
    response:any;
    rsfilter:string;
    shouldParse:boolean;
}

export class SOAPServicePopover extends React.Component<SOAPServicePopoverProps,SOAPServicePopoverState> {
/*
    renderNav(): JSX.Element {
        return (
        <div className="navigation">
        <ul className="nav nav-pills tabs-left">
            <li className={this.props.currentView==availableForms.commandService?"active":"xp-context"}>
                <a href="#" className="tab" onClick={this.props.setViewChange(availableForms.commandService)}>Command Service</a>
            </li>
            <li className={this.props.currentView==availableForms.restAPI?"active":"xp-context"}>
                <a href="#" className="tab" onClick={this.props.setViewChange(availableForms.restAPI)}>SHEL PNR</a>
            </li>
        </ul>
        </div>
        );
    }
*/
    constructor(e) {
        super(e);
        this.handleChange = this.handleChange.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
        this.getPrettyParsedXML = this.getPrettyParsedXML.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.getSearchData = this.getSearchData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    private actions = [{key:"1",value:"first"},{key:"2",value:"second"},{key:"3",value:"third"}]
    private payloads = {
        "QueueAccessLLSRQ" : 
        '<QueueAccessRQ Version="2.0.9" xmlns="http://webservices.sabre.com/sabreXML/2011/10" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        +'<QueueIdentifier Number="{QIN}" PseudoCityCode="{PCC}"/>'
        +'<Navigation Action="{NAVACT}"/>'
        +'</QueueAccessRQ>',
    
        "SabreCommandLLSRQ" : 
        '<SabreCommandLLSRQ xmlns="http://webservices.sabre.com/sabreXML/2003/07" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" TimeStamp="2014-03-04T14:00:00" Version="1.8.1">'
		+'<Request Output="SCREEN" CDATA="true">'
		+	'<HostCommand></HostCommand>'
		+'</Request>'
        +'</SabreCommandLLSRQ>',
        
        "GetReservationRQ":
 '       <GetReservationRQ xmlns="http://webservices.sabre.com/pnrbuilder/v1_19" Version="1.19.0" EchoToken="">'+
'            <RequestType>Stateful</RequestType>'+
'        </GetReservationRQ>'
    };

    state : SOAPServicePopoverState = {
        actionCode:"",
        payload:"",
        response:"",
        rsfilter:"",
        shouldParse:false
    }
    handleChange(e) : void {
        //if(e.target.name==="actionCode" && this.payloads[e.target.value]!=null){
        //}else{
        this.setState({[e.target.name]:e.target.value});
        //}
    }
    handleCheck(e?) : void {
        console.log("checkou",e,e.target.checked);
        this.setState({shouldParse:e.target.checked});
    }
    handleSelect(e):void {
        console.log("selected autocomplete item",e);
        this.setState({actionCode:e.key,payload:new XmlTools().prettifyXml(this.payloads[e.key])});
    }
    handleExecute() :void {
        console.log("will execute",this.state.actionCode,this.state.payload);
        getService(CommFoundHelper).sendSWSRequest(
            {action:this.state.actionCode,
            payload:this.state.payload,
            authTokenType:'SESSION'})
        .then(
            (res)=>{
                this.setState(
                    {response:res.errorCode?JSON.stringify(res,null,2):res.value}
                )
            }
        );

    }

    getPrettyParsedXML() : string {
        let rs:string ="";
        let parsedRs:string="";
        let xm:XmlTools=new XmlTools();
        if(!_.isEmpty(this.state.response)){
            if(!_.isEmpty(this.state.rsfilter) && this.state.shouldParse==true){
                try{
                    let res = xm.runXPath(this.state.rsfilter,xm.stringToXml(this.state.response))
                    var node = null;
                    var resHTML = "<XPathResult>";
                    console.log("resXPath",res);
                    if(res){

                        if(res.resultType==4){
                            while(node = res.iterateNext()) {
                                console.log("ite",node);
                                if(node.nodeType==1){
                                    resHTML = resHTML.concat(node.outerHTML);
                                }else{
                                    resHTML = resHTML.concat(node.nodeValue);
                                }
                                //console.log("ite",node, node.localName, node.outerHTML);
                            }
                        }else{
                            resHTML = resHTML.concat(res.stringValue);
                        }
                    }
                    resHTML = resHTML.concat("</XPathResult>");
                    parsedRs = resHTML;
                }catch(ex){
                    parsedRs = "Error evaluating Xpath expression";
                }

            }else{
                parsedRs = this.state.response;
            }

            rs = xm.prettifyXml(parsedRs);

        } else {
            rs = "no data."
        }
        return rs;
    }

    getSearchData(filter): Promise<any>{
        return new Promise((resolve,reject)=>{
            resolve(this.actions.filter((elm)=>{return elm.key.toString().concat(" ").concat(elm.value.toString()).indexOf(filter)>=0?true:false}));
        });
    }

    renderButtons(): JSX.Element[] {
        return(
            [<Button name="btnCancel" type="cancel" title="Cancel" handleClick={this.props.handleClose}/>,<Button name="btnExecute" type="primary" title="Execute" handleClick={this.handleExecute}/>]
        );
    }

    getData(filter):Promise<Array<{key:string,value:string}>> {
        
        return new Promise((resolve,reject)=>{
            getService(Variables).getFromJson("soapPayloads")
            .then((res)=>{
                const filtered = res.filter(
                    (item) => item.value.toLowerCase().indexOf(filter.toLowerCase()) > -1
                );
                resolve(filtered);
            })
            .catch((err)=>{
                reject(err)
            })
        });
    }

    render(): JSX.Element {
        return (
            <PopoverForm name="" title="" content={null} buttons={this.renderButtons()} navigation={this.props.navigation}>
                <AutoComplete fetchOptions={this.getData} handleSelect={this.handleSelect} name="srchAction" title="Action Code" placeHolder="search Sabre SOAP API service payload..." />

                <Input type="textarea" rows={10} name="payload" title="XML Request" placeHolder="enter Service Request payload (XML content)"  value={this.state.payload} handleChange={this.handleChange}/>
                <Payload type="xml" name="plData" title="XML Response" value={this.getPrettyParsedXML()} />
                <InputGroup componentType="check" componentValue={this.state.shouldParse} groupPosition="prepend" name="rsfilter" title="Parse response" placeHolder="enter a XPATH expression" value={this.state.rsfilter} handleChange={this.handleChange} handleClick={this.handleCheck} />
            </PopoverForm>
        );
    }

}
//                 <Input type="textarea" rows={10} name="response" title="XML Response" placeHolder="Service Response payload (XML content)"  value={this.getPrettyParsedXML()} handleChange={this.handleChange}/>
//                <Input type="text" name="rsfilter" title="Parse response" placeHolder="enter a XPATH expression" value={this.state.rsfilter} handleChange={this.handleChange}/>
