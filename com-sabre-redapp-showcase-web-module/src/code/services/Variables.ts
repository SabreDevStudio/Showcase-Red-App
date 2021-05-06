import { context, getService } from "../Context";
import { CommFoundHelper } from "./CommFoundHelper";
import {AbstractService} from "sabre-ngv-app/app/services/impl/AbstractService"

export class Variables extends AbstractService {

    static SERVICE_NAME = "com-sabre-redapp-showcase-web-module-service-variables";

    private jsContent=null;

    private jsGlobals={};

    readAssetFile(filename:string):Promise<any> {
        let modUrl = context.getModule().getManifest().url.concat("/assets/").concat(filename);
        return new Promise((resolve,reject)=>{
            getService(CommFoundHelper).sendExternalHttpRequest({
                httpMethod:"GET",
                url: modUrl
            })
            .then((result)=>{resolve(result.body)})
            .catch((err)=>{reject(err.toString())})
        });
    }

    getFromJson(path:string):Promise<any> {
        return new Promise((resolve,reject)=>{
            if(_.isUndefined(this.jsContent) || _.isNull(this.jsContent)){
                this.readAssetFile("jsDb.json")
                .then((result)=>{
                    this.jsContent = result;
                    resolve(this.jsContent[path]);
                })
            }else{
                resolve(this.jsContent[path]);
            }
        });
    }

    async getFromJsonAsync(path:string) {
        //(async()=>{
        let res = await this.getFromJson(path);
        console.log(res);
        return res;
        //    console.log(res);
         //   return res;
        //})()
        //console.log("ended");
    }

    getGlobal(key:string):any {
        return this.jsGlobals[key];
    }

    setGlobal(key:string,value) {
        this.jsGlobals[key] = value;
    }

}