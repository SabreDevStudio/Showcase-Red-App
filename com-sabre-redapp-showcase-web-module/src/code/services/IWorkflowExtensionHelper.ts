import { BeforeAirShoppingInputExtension } from "sabre-ngv-extensionPoints/extensions/BeforeAirShoppingInputExtension";
import { BeforeEndCommandExtension } from "sabre-ngv-extensionPoints/extensions/BeforeEndCommandExtension";
import { CommandMessageAirShoppingInputRq } from "sabre-ngv-pos-cdm/airshoppingInput";
import { CommandMessageEndReservationRq } from "sabre-ngv-pos-cdm/commsg";
import { BeforeAirShoppingHandler } from "./xtpoints/BeforeAirShoppingHandler";

export interface IWorkflowExtensionHelper extends BeforeAirShoppingHandler {
 
    onPnrEndBeforeEndCommand(rq: CommandMessageEndReservationRq): Promise<import("sabre-ngv-pos-cdm/extensionPoint").ExtPointResult> ;

    onBeforeAirShoppingInput(rq: CommandMessageAirShoppingInputRq): Promise<import("sabre-ngv-pos-cdm/airshoppingInput").ExtPointAirShoppingInputRqDataResult> ;
    

}