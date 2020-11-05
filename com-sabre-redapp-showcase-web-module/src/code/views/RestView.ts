import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {Template} from "sabre-ngv-core/decorators/classes/view/Template";
import {AbstractActionOptions} from "sabre-ngv-app/app/common/views/AbstractActionOptions";
import {AuthTokenType} from "sabre-ngv-app/app/services/impl/AuthTokenType";
import {HttpMethod} from "sabre-ngv-app/app/services/impl/HttpMethod";
import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";
import { CommFoundHelper } from "../services/CommFoundHelper";
import { getService } from "../Context";
//import {RestModel} from "../model/RestModel";

@Template('com-sabre-redapp-showcase-web-module:RestView')
export class RestView extends AbstractView<AbstractModel> {

    initialize(options: AbstractActionOptions) {
        super.initialize(options);
    }

    selfSubmitModalAction(): void {

        const url: string = this.$('.url-field').find('.url').val();
        const httpMethod: HttpMethod = this.$('.httpMethod-field').find('.httpMethod').val();
        const authTokenType: AuthTokenType = this.$('.authTokenType-field').find('.authTokenType').val();
        const payload: string = this.$('.payload-field').find('.payload').val();
        const headers: string = this.$('.headers-field').find('.headers').val();

        this.$('.response').val("");
        
        const restApi: CommFoundHelper = getService(CommFoundHelper);

        restApi.sendRestRequest({
            httpMethod: httpMethod,
            url: url,
            authTokenType: authTokenType,
            payload: payload,
            headers: headers
        }).then((response) => {
                console.log(response.status, response.body);
                this.$('.response').val(JSON.stringify(response));
            })
            .catch((error) => {
                console.log(error.status, error.body);
                this.$('.response').val(JSON.stringify(error));
            })
    }
}
