import { IWorkflowExtensionHelper } from "./IWorkflowExtensionHelper";
import { CommandMessageEndReservationRq , CommandMessageEndReservationRs} from "sabre-ngv-pos-cdm/commsg";
import { CommandMessageAirShoppingInputRq, ExtPointAirShoppingInputRqDataResult } from "sabre-ngv-pos-cdm/airshoppingInput";
import { ExtPointResult, ExtPointStatus, ExtPointDataResult } from "sabre-ngv-pos-cdm/extensionPoint";
import { BeforeEndCommandExtension } from "sabre-ngv-extensionPoints/extensions/BeforeEndCommandExtension";
import { AbstractObjectOptions } from "sabre-ngv-app/app/AbstractObjectOptions";
import { AbstractMixin } from "sabre-ngv-app/app/AbstractMixin";
import { LifetimeBindingOptions } from "sabre-ngv-app/app/LifetimeBindingOptions";
import { DismissOptions } from "sabre-ngv-app/app/DismissOptions";
import { AbstractService } from "sabre-ngv-app/app/services/impl/AbstractService";
import { getService } from "../Context";
import {LayerService} from "sabre-ngv-core/services/LayerService";
import { WorkflowExtensionView } from "../views/popUps/WorkflowExtensionView";
import { ExtPointQueuePlaceRqDataResult } from 'sabre-ngv-pos-cdm/queueplace';
import { CommandMessageQueuePlaceRq } from 'sabre-ngv-pos-cdm/queueplace';
import { CommFoundHelper } from "./CommFoundHelper";
import { IAreaService } from "sabre-ngv-app/app/services/impl/IAreaService";



export class WorkflowExtensionHelper extends AbstractService {
    static SERVICE_NAME = "com-sabre-redapp-showcase-web-module-workflow-extension-helper";
/*
    async genericHandle(rq:WorkflowExtensionModel): Promise<WorkflowExtensionModel> {
        
        return new Promise((resolve)=>{
            rq.resolveMethod = resolve;
            getService(LayerService).showInModal(new WorkflowExtensionView({model:rq}),{title:"Workflow extension point available",actions:[{className:'app.common.views.Button',caption:'CANCEL',actionName:'cancel',type:'secondary'} as any,{className:'app.common.views.Button',caption:'CONTINUE',actionName:'continue',type:'success'} as any]});
        });
    }

    async onPnrEndBeforeEndCommand(rq: CommandMessageEndReservationRq | null ): Promise<ExtPointResult> {
        console.log("beofree end",rq);
        let xtModel = new WorkflowExtensionModel('dynamo.pnr.end','beforeEndCommand',rq);
        //xtModel.dataModel = rq;
        if(rq && rq.EndReservationRq && rq.EndReservationRq.RetrievePNR==false){
            console.log('nao queria dar retireve');
            rq.EndReservationRq.RetrievePNR=true;
        }

        
        //let rsHandle = await this.genericHandle(xtModel);
        //console.log("hanlde rs",rsHandle);
        //return {Status:rsHandle.flowStatus};

        let qcChecl = await getService(CommFoundHelper).validateQC(["ACK1","ACK2"]);
        if(qcChecl==true){
            return {Status:'CONTINUE'};
        }else{
            getService(IAreaService).showBanner("Warning","Cannot end the PNR, quality control check was not performed","Before end extension");
            return {Status:'ABORT'};
        }
    }
    async onPnrEndAfterEndCommand(rs: CommandMessageEndReservationRs | null): Promise<ExtPointResult> {
        let xtModel = new WorkflowExtensionModel('dynamo.pnr.end','afterEndCommand',rs);
        //xtModel.dataModel = (rs);
        //xtModel.extensionPointID = ('beforeEndCommand');
        //xtModel.flowID = 'dynamo.pnr.end';
 
        let rsHandle = await this.genericHandle(xtModel);
        console.log("handlere",rsHandle);
        return {Status:rsHandle.flowStatus};
    }
    async onBeforeAirShoppingInput(rq: CommandMessageAirShoppingInputRq): Promise<ExtPointAirShoppingInputRqDataResult> {
        let xtModel = new WorkflowExtensionModel('dynamo.air.lowfareshopping','beforeAirShoppingInput',rq);
        //xtModel.dataModel = (rs);
        //xtModel.extensionPointID = ('beforeEndCommand');
        //xtModel.flowID = 'dynamo.pnr.end';
 
        let rsHandle = await this.genericHandle(xtModel);
        console.log("handlere",rsHandle);
        return {Status:rsHandle.flowStatus};    
    }
    async onBeforeQueuePlace(rq: CommandMessageQueuePlaceRq): Promise<ExtPointQueuePlaceRqDataResult> {
        let xtModel = new WorkflowExtensionModel('dynamo.queue.place','beforeQueuePlace',rq);
        let rsHandle = await this.genericHandle(xtModel);
        console.log("handlere",rsHandle);
        return {Status:rsHandle.flowStatus};    
        
    }
*/
}
/*,
    "dynamo.pnr.end:afterEndCommand": [
      {
        "services": [
          "com-sabre-redapp-showcase-web-module-workflow-extension-helper"
        ]
      }
    ],
    "dynamo.queue.place:beforeQueuePlace": [
      {
        "services": [
          "com-sabre-redapp-showcase-web-module-workflow-extension-helper"
        ]
      }
    ],
    "dynamo.airshopping.input:beforeAirShoppingInput": [
      {
        "services": [
          "com-sabre-redapp-showcase-web-module-workflow-extension-helper"
        ]
      }
    ]*/