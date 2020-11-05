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

@Template('com-sabre-redapp-showcase-web-module:NudgeView')
export class NudgeView extends AbstractView<AbstractModel> {

    initialize(options: AbstractActionOptions) {
        super.initialize(options);
    }

}
