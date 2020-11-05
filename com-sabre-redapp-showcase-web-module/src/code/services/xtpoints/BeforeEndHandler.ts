
import { CommandMessageEndReservationRq , CommandMessageEndReservationRs} from "sabre-ngv-pos-cdm/commsg";
import { ExtPointResult, ExtPointStatus, ExtPointDataResult } from "sabre-ngv-pos-cdm/extensionPoint";
import { BeforeEndCommandExtension } from "sabre-ngv-extensionPoints/extensions/BeforeEndCommandExtension";
import { getService } from "../../Context";
import { IAreaService } from "sabre-ngv-app/app/services/impl/IAreaService";
import { CommFoundHelper } from "../CommFoundHelper";
import { CommandMessageReservationRs, ReservationRs } from "sabre-ngv-pos-cdm/reservation";



export class BeforeEndHandler extends BeforeEndCommandExtension {
    static SERVICE_NAME = "BeforeEndHandler";

    private readAckStatus(res:ReservationRs,stringToSearch:string): boolean {
      if(res && res.Remarks && res.Remarks.Remark){
          if(res.Remarks.Remark.find(rmk => rmk.Text.indexOf(stringToSearch) >= 0 )){
              return true;
          }else{
              return false;
          }
      }else{
          return false;
      }
    }

    onPnrEndBeforeEndCommand(rq: CommandMessageEndReservationRq | null): Promise<ExtPointResult> {

      return new Promise<ExtPointResult>(
        (resolve,reject)=>{
          getService(CommFoundHelper).getReservation().then((res)=>{

              if(res && res.Status && res.Status.Success==true){
                  if(!_.isUndefined(res.Data)){
                    if(this.readAckStatus(res.Data,"ACK1")&&this.readAckStatus(res.Data,"ACK2")){
                      resolve({Status:'CONTINUE'});
                    }else{
                      getService(IAreaService).showBanner("Warning","Cannot end the PNR, quality control check was not performed","Before end extension");
                      resolve({Status:'ABORT'});
                    }
                  }
              }else{
                resolve({Status:'CONTINUE'});
              }
          })
        }
      );
    }
}