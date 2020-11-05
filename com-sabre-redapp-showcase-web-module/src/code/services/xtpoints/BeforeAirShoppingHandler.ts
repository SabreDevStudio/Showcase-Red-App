//make necessary imports and dependencies
import { BeforeAirShoppingInputExtension } from "sabre-ngv-extensionPoints/extensions/BeforeAirShoppingInputExtension";
import { CommandMessageAirShoppingInputRq,ExtPointAirShoppingInputRqDataResult } from "sabre-ngv-pos-cdm/airshoppingInput";
//Each workflow extension point has it specific Sevice Class and method, as well for the exposed data model
export class BeforeAirShoppingHandler extends  BeforeAirShoppingInputExtension{
    static SERVICE_NAME="BeforeAirShoppingHandler";
    async onBeforeAirShoppingInput(rq: CommandMessageAirShoppingInputRq): Promise<ExtPointAirShoppingInputRqDataResult> {
        console.log("Workflow extension handled : ", rq );
        //developr should pass through the request, modified or not, and control flow execution by the Status field (ABORT|CONTINUE)
        return {
            Data: rq,
            Status: "CONTINUE"
        }
    }
}