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