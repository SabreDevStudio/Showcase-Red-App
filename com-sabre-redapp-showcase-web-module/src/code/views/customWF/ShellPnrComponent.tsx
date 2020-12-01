import * as React from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { availableForms } from "../cmdHelper/gdsData/CommFoundComponents";
import { AbstractModel } from "sabre-ngv-app/app/AbstractModel";
import { AutoComplete } from "../../components/AutoComplete";
import { Form } from "../../components/Form";
import { ModalForm } from "../../components/ModalForm";
import { Button } from "../../components/Button";
import { getService } from "../../Context";
import { CommFoundHelper } from "../../services/CommFoundHelper";
import {LayerService} from "sabre-ngv-core/services/LayerService";
import { IAreaService } from "sabre-ngv-app/app/services/impl/IAreaService";


const eventBus: AbstractModel = new AbstractModel();
export interface OwnProps {
    currentView?: availableForms;
    availableViews?: availableForms;
    setViewChange?: (selectedView:availableForms) => () => void;
    commandChange?: (cmd:any) => void;
}
export interface OwnState {
    passengerName:string;
    passengerSurname:string;
    travelType: string;
    destinationac : string;
}
export class ShellPnrComponent extends React.Component<OwnProps,OwnState> {

    constructor(e) {
        super(e);
        this.handleChange = this.handleChange.bind(this);
        //this.renderContent = this.renderContent.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.closeLayer = this.closeLayer.bind(this);
        this.createPNR = this.createPNR.bind(this);
    }

    cfHelper: CommFoundHelper = getService(CommFoundHelper);

    state : OwnState = {
        passengerName:"",
        passengerSurname:"",
        travelType: "",
        destinationac : ""

    };
    private closePopovers = (): void => {
        eventBus.triggerOnEventBus('hide-popovers', 'novice-menu')
    }
    closeLayer = (): void => {
        getService(LayerService).clearLayer(33);
    }



    handleChange(e) : void {
        console.log("handle change",e);
        var a = e.target.name;
        var v = e.target.value;
        this.setState({[a]: v});
        console.log("handle change",e,a,v,this.state);
        
        

    }

    createPNR() : void {
        var pl ='<TravelItineraryAddInfoRQ Version="2.2.0" xmlns="http://webservices.sabre.com/sabreXML/2011/10" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +    
        '        <AgencyInfo>' +
        '        <Address>'+
        '            <AddressLine>SABRE TRAVEL</AddressLine>'+
        '            <CityName>SOUTHLAKE</CityName>' +
        '            <CountryCode>US</CountryCode>' +
        '            <PostalCode>76092</PostalCode>' +
        '            <StateCountyProv StateCode="TX"/>' +
        '            <StreetNmbr>3150 SABRE DRIVE</StreetNmbr>' +
        '        </Address>'+
        '    </AgencyInfo>' +
        '            <CustomerInfo>' +
        '                <CustomerIdentifier>CST'+ this.state.travelType +'2020</CustomerIdentifier>' +
        '                <PersonName>' +
        '                    <GivenName>'+ this.state.passengerName +'</GivenName>'+
        '                    <Surname>'+ this.state.passengerSurname +'</Surname>'+
        '                </PersonName>'+
        '            </CustomerInfo>'+
        '</TravelItineraryAddInfoRQ>';

        var pl1 = this.cfHelper.getXmlPayload(
            "PassengerDetailsRQ",
            {
                "MiscSegmentSellRQ":this.cfHelper.getXmlPayload("MiscSegmentSellRQ",{

                }),
                "SpecialReqDetails":this.cfHelper.getXmlPayload("SpecialReqDetails",{
                    "AddRemarkRQ": this.cfHelper.getXmlPayload("AddRemarkRQ",{
                        "Remark": ()=>{
                            let strRmk = "";
                            strRmk = strRmk.concat(this.cfHelper.getXmlPayload("FOP_Remark",{}))

                            for(let i=0;i<10;i++){
                                strRmk = strRmk.concat(this.cfHelper.getXmlPayload("Remark",{
                                    "Text":"RMK"+i.toString()
                                }));
                            }
                            return strRmk;
                        }
                    })

                }),
                "TravelItineraryAddInfoRQ": this.cfHelper.getXmlPayload("TravelItineraryAddInfoRQ",{
                    "AgencyInfo": this.cfHelper.getXmlPayload("AgencyInfo",{
                        "Address" : this.cfHelper.getXmlPayload("AddressSabre",null)
                    }) ,
                    "CustomerInfo": this.cfHelper.getXmlPayload("CustomerInfo",{
                        "ContactNumbers": this.cfHelper.getXmlPayload("ContactNumbers",{
                            "ContactNumber": this.cfHelper.getXmlPayload("ContactNumber",null)
                        }),
                        "CustomerIdentifier": this.cfHelper.getXmlPayload("CustomerIdentifier",{"CustomerIdentifier":"CST"+this.state.travelType+"2020"}),
                        "Email":this.cfHelper.getXmlPayload("Email",null),
                        "PersonName":this.cfHelper.getXmlPayload("PersonName",{
                            "GivenName": this.state.passengerName,
                            "Surname": this.state.passengerSurname
                        })
                    })
                })
            }
        );
        console.log(pl1);
        getService(CommFoundHelper).sendSWSRequest(
            {action:"PassengerDetailsRQ",
            payload:pl1,authTokenType:'SESSION'}
        ).then((res)=>{
            console.log("PassengerDetailsRS", res);

            if(res.errorCode!==undefined && res.errorCode!==null) {
                getService(IAreaService).showBanner('Error',("ERROR CODE : ").concat(res.errorCode),"Custom Workflow");
                getService(CommFoundHelper).refreshTipSummary();
                this.closeLayer();
            }else{ 
                console.log(this.cfHelper.getXmlPayload("SabreCommandLLSRQ",{
                    "HostCommand": "FNBTS-95TB/205/11-TDBANK"
                }));
                getService(CommFoundHelper).sendSWSRequest(
                    {
                        action:"SabreCommandLLSRQ",
                        payload: this.cfHelper.getXmlPayload("SabreCommandLLSRQ",{
                            "HostCommand": "FNBTS-95TB/205/11-TDBANK"
                        }),
                        authTokenType:'SESSION'
                    }
                ).then((res)=>{
                    getService(CommFoundHelper).refreshTipSummary();
                    this.closeLayer();
                    getService(IAreaService).showBanner('Success',"PNR DATA CREATED","Custom Workflow");

                })
            }
        });   
    }

    renderButtons(): JSX.Element[] {
        return ([
            <Button name="btnCancel" type="cancel" title="Cancel" handleClick={this.closeLayer}></Button>,
            <Button name="btnExecute"  type="primary" title="Execute" handleClick={this.createPNR}></Button>
        ]);
    }

    render() : JSX.Element {
         return (
            <ModalForm name="modalF" title="CREATE PNR" buttons={this.renderButtons()} content={null}>
                <div className="form-group">
                    <Input type="text" name="passengerName" title="Name" value={this.state.passengerName} placeHolder="enter passenger name" handleChange={this.handleChange} />
                    <Input type="text" name="passengerSurname" title="Surname" value={this.state.passengerSurname} placeHolder="enter passenger surname" handleChange={this.handleChange} />
                    <Select name="travelType" title="Travel Type" value={this.state.travelType} handleChange={this.handleChange} placeHolder="Select on option" options={[{"key":"BIZ","value":"Business"},{"key":"LEI","value":"Leisure"},{"key":"OTH","value":"Other"}]}/>
                </div>
            </ModalForm>
        );
    }

}