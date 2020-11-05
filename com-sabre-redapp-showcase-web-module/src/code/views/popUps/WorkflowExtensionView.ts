import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {Template} from "sabre-ngv-core/decorators/classes/view/Template";
import {AbstractActionOptions} from "sabre-ngv-app/app/common/views/AbstractActionOptions";
import {AuthTokenType} from "sabre-ngv-app/app/services/impl/AuthTokenType";
import {HttpMethod} from "sabre-ngv-app/app/services/impl/HttpMethod";
import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";
import { CommFoundHelper } from "../../services/CommFoundHelper";
import { getService } from "../../Context";
//import {RestModel} from "../model/RestModel";
import { NgvNudgeEntry } from "sabre-ngv-xp/interfaces/NgvNudgeEntry";
//import { WorkflowExtensionModel } from "../../services/xtpoints/WorkflowExtensionModel";

@Template('com-sabre-redapp-showcase-web-module:WorkflowExtensionView')
export class WorkflowExtensionView extends AbstractView<any> {
/*
    initialize(options: AbstractActionOptions) {
        super.initialize(options);

        if(options instanceof WorkflowExtensionModel){
            this.setModel(options);
            console.log("view iniitialized",this.getModel());
        }
        this.on('close-action',this._onCancelAction);
        this.on('cancel-action',this._onCancelAction);
        this.on('finalize',this._onCancelAction);
        this.on('continue-action',this._onContinueAction);
    }

    _onCancelAction(){
        this.getModel().flowStatus = 'ABORT'
        let resolveMethod = this.getModel().resolveMethod;
        console.log("vai cancelar",resolveMethod);
        if(resolveMethod){
            resolveMethod(this.getModel());
        }
        this.triggerOnEventBus('close-modal');
        
    }

    _onContinueAction(){
        this.getModel().flowStatus = 'CONTINUE';
        let resolveMethod = this.getModel().resolveMethod;
        if(resolveMethod){
            resolveMethod(this.getModel());
        }
        this.triggerOnEventBus('close-modal');
        
    }
    */
}
