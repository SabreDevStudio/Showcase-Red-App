import {AbstractService} from "sabre-ngv-app/app/services/impl/AbstractService"
import {getService} from "../Context";
import {ICommandMessageService} from "sabre-ngv-commsg/services/ICommandMessageService";
import {CommandMessageBasicRs,CommandMessageRq} from "sabre-ngv-pos-cdm/commsg";

import {ISoapApiService} from "sabre-ngv-communication/interfaces/ISoapApiService";
import { SoapRs } from "sabre-ngv-communication/interfaces/SoapRs";
import { SoapRq } from "sabre-ngv-communication/interfaces/SoapRq";

import {RestApiService} from "sabre-ngv-communication/services/RestApiService";
import { RestResponse } from "sabre-ngv-communication/interfaces/RestResponse";
import { RestRq } from "sabre-ngv-communication/interfaces/RestRq";

import { IReservationService } from "sabre-ngv-reservation/services/IReservationService";
import { CommandMessageReservationRs } from "sabre-ngv-pos-cdm/reservation";

import { PnrPublicService } from "sabre-ngv-app/app/services/impl/PnrPublicService";

import { AgentProfileService } from "sabre-ngv-app/app/services/impl/AgentProfileService";

/*
* class CommFoundHelper, utiility methods to consume main Communication Foundation APIs
*
*/
export class CommFoundHelper extends AbstractService {
    static SERVICE_NAME = "com-sabre-redapp-showcase-web-module-service-commfound";

    public xmlPayloads = {
        "ElementName":
        '{XmlContent}',
        
        "PersonName":
        '<PersonName>' +
        '<GivenName>{GivenName}</GivenName>'+
        '<Surname>{Surname}</Surname>'+
        '</PersonName>',

        "ContactNumber":
        '<ContactNumber LocationCode="FSG" NameNumber="1.1" Phone="817-555-1212" PhoneUseType="H"/>',

        "ContactNumbers":
        '<ContactNumbers>'+
        '{ContactNumber}'+
        '</ContactNumbers>',

        "CustomerIdentifier":
        '<CustomerIdentifier>{CustomerIdentifier}</CustomerIdentifier>',

        "CustomerInfo":
        '<CustomerInfo>' +
        '{ContactNumbers}' +
        '{CustomerIdentifier}' +
        '{Email}'+
        '{PersonName}' +
        '</CustomerInfo>',

        "Email":
        '<Email Address="WEBSERVICES.SUPPORT@SABRE.COM" LanguageOverride="O" NameNumber="1.1" ShortText="ABC123" Type="CC"/>',

        "Address":
        '<Address>'+
        '<AddressLine>{AddressLine}</AddressLine>'+
        '<CityName>{CityName}</CityName>' +
        '<CountryCode>{CountryCode}</CountryCode>' +
        '<PostalCode>{PostalCode}</PostalCode>' +
        '<StateCountyProv StateCode="{StateCode}"/>' +
        '<StreetNmbr>{StreetNmbr}</StreetNmbr>' +
        '</Address>',

        "AddressSabre":
        '        <Address>'+
        '            <AddressLine>SABRE TRAVEL</AddressLine>'+
        '            <CityName>SOUTHLAKE</CityName>' +
        '            <CountryCode>US</CountryCode>' +
        '            <PostalCode>76092</PostalCode>' +
        '            <StateCountyProv StateCode="TX"/>' +
        '            <StreetNmbr>3150 SABRE DRIVE</StreetNmbr>' +
        '        </Address>',

        "AgencyInfo":
        '<AgencyInfo>' +
        '{Address}'+
        '</AgencyInfo>',

        "TravelItineraryAddInfoRQ":
        '<TravelItineraryAddInfoRQ>' +    
        '{AgencyInfo}' +
        '{CustomerInfo}' +
        '</TravelItineraryAddInfoRQ>',

        "AddRemarkRQ" : 
        '<AddRemarkRQ>'
        +'<RemarkInfo>{Remark}'
        +'</RemarkInfo>'
        +'</AddRemarkRQ>',
    
        "Remark" : 
        '<Remark Type="General">'
		+'<Text>'
        +'{Text}'
		+'</Text>'
        +'</Remark>',

        "SpecialReqDetails" : 
        '<SpecialReqDetails>'
        +'{AddRemarkRQ}'
        +'</SpecialReqDetails>',


        "PassengerDetailsRQ" :
        '<PassengerDetailsRQ xmlns="http://services.sabre.com/sp/pd/v3_4" version="3.4.0" ignoreOnError="true" haltOnError="true">' +
        '{MiscSegmentSellRQ}' +
        '{SpecialReqDetails}' +
        '{TravelItineraryAddInfoRQ}' +
        '</PassengerDetailsRQ>',

        "MiscSegmentSellRQ":
        '<MiscSegmentSellRQ>'+
        '<MiscSegment DepartureDateTime="12-21" InsertAfter="0" NumberInParty="1" Status="GK" Type="OTH">'+
        '<OriginLocation LocationCode="FSG"/>'+
        '<Text>TEST</Text>'+
        '<VendorPrefs>'+
        '<Airline Code="XX"/>'+
        '</VendorPrefs>'+
        '</MiscSegment>'+
        '</MiscSegmentSellRQ>',

        "FOP_Remark":
        '<FOP_Remark>'+
        '<CC_Info Suppress="false">'+
        '<PaymentCard Code="VI" ExpireDate="2021-12" Number="4444333322221111" />'+
        '</CC_Info>'+
        '</FOP_Remark>',

        "SabreCommandLLSRQ" : 
        '<SabreCommandLLSRQ xmlns="http://webservices.sabre.com/sabreXML/2003/07" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" TimeStamp="2014-03-04T14:00:00" Version="1.8.1">'
		+'<Request Output="SCREEN" CDATA="true">'
		+	'<HostCommand>{HostCommand}</HostCommand>'
		+'</Request>'
        +'</SabreCommandLLSRQ>'


    }

    getXmlPayload(name:string, values:any): string {
        let retVal = null;
        if(this.xmlPayloads[name]){
            let tmpVar = this.xmlPayloads[name];
            tmpVar = tmpVar.replace(
                /(([\{])(.+?)(\}))/g, 
                (strFound,p1,p2,p3,p4,offset,astring) => {
                    //p3 return the variable name between {varName}
                    //console.log("found variable token",strFound,values[p3],typeof(values[p3]),p1,p2,p3,p4,offset,astring);
                    if(_.isNull(values)) return "";
                    if(values[p3] && typeof(values[p3])=='string')
                    {
                        return values[p3];
                    }else if(typeof(values[p3])=='function'){
                        return values[p3]();
                    }else{
                        return "";
                    }
                }
            );
            retVal = tmpVar;
        }
        return retVal;
    }
    /*
    * Helper method to consume ICommandMessageService
    * ICommandMessageService, allows to send requests on the CommandFlow supports different Classes of payloads, from simple CommandMessageRQ, which is equivalent of Sabre GDS Format typed when under Manual Command flow, up to specialized dat
    * buildDependencies :
    * { "sabre-ngv-pos-cdm" : "*", "sabre-ngv-commsg": "*" }
    * main method :
    */
    sendCommandMessage(payload: string, showRq:boolean, showRs:boolean): Promise<CommandMessageBasicRs> {
        //get reference to the service
        const iCmdMsgService = getService(ICommandMessageService);
        //call send method with payload
        return iCmdMsgService.send({
            rq: payload,
            showRq: showRq,
            showRs: showRs
        });
    }


    /*
    * Helper method to consume XML/SOAP Sabre APIs
    * Allow easy acess to Sabre GDS Platform, the APIs
    * buildDependencies :
    * { "sabre-ngv-pos-cdm" : "*", "sabre-ngv-commsg": "*" }
    * main method :
    */
    sendSWSRequest(request: SoapRq): Promise<SoapRs> {
        //get reference to the service
        const iSWSService = getService(ISoapApiService);
        //call send method with payload
        return iSWSService.callSws(request);
    }


    /*
    * Helper method to consume RestApiService
    * Helper method to consume REST/JSON Sabre APIs
    * Allow easy acess to Sabre GDS Platform, the APIs 
    * buildDependencies :
    * { "sabre-ngv-communication": "*" }
    * main method :
    */
    sendRestRequest(request: RestRq): Promise<RestResponse> {
        //get reference to the service
        const iRestService = getService(RestApiService);
        //call send method with payload
        return iRestService.send(request);
    }

    /*
    * Helper method to consume HttpWebRequest
    * 
    * buildDependencies :
    * { "sabre-ngv-communication": "*" }
    */
    sendExternalHttpRequest(request: RestRq, options?, contentType?): Promise<RestResponse> {
        //get reference to the service
        const iRestService = getService(RestApiService);
        //call send method with payload
        return iRestService.sendExternal(request, options, contentType);
    }

    getReservation() : Promise<CommandMessageReservationRs> {
        return getService(IReservationService).getReservation();
    }


    refreshTipSummary() : void {
        getService(PnrPublicService).refreshData();

    }

    getAgentProfileService() : AgentProfileService {
        return getService(AgentProfileService);
    }
}