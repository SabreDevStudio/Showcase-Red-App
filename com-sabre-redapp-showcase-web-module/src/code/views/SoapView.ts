import {getService} from "../Context";
import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";
import {AbstractActionOptions} from "sabre-ngv-app/app/common/views/AbstractActionOptions";
import {Template} from "sabre-ngv-core/decorators/classes/view/Template";
import { CommFoundHelper } from "../services/CommFoundHelper";
import { XmlTools } from "../util/XmlTools";

@Template('com-sabre-redapp-showcase-web-module:SoapView')
export class SoapView extends AbstractView<AbstractModel> {

    static payloads = {
        "QueueAccessLLSRQ" : 
        '<QueueAccessRQ Version="2.0.9" xmlns="http://webservices.sabre.com/sabreXML/2011/10" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        +'<QueueIdentifier Number="{QIN}" PseudoCityCode="{PCC}"/>'
        +'<Navigation Action="{NAVACT}"/>'
        +'</QueueAccessRQ>',
    
        "SabreCommandLLSRQ" : 
        '<SabreCommandLLSRQ xmlns="http://webservices.sabre.com/sabreXML/2003/07" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" TimeStamp="2014-03-04T14:00:00" Version="1.8.1">'
		+'<Request Output="{OUTPUT}" CDATA="true">'
		+	'<HostCommand>{COMMAND}</HostCommand>'
		+'</Request>'
	    +'</SabreCommandLLSRQ>'
    };

    initialize(options: AbstractActionOptions) {
        super.initialize(options);

        this.addDomEvents(
            {
                'change input.action' : 'changeActionCode',
                'click .btnParse' : 'parseXML'
            }
        );

        this.getModel().set("payloads", SoapView.payloads);
    }


    private parseXML(selector: JQueryEventObject): any {

        //console.log("will parse", selector);
        let pl = this.$('.response').val();
        let qry = this.$('.xPath').val();
        
        let res = new XmlTools().runXPath(qry, new XmlTools().stringToXml(pl));
        //console.log("parse result", res);
        var node = null;
        var resHTML = "";
        while(node = res.iterateNext()) {
            resHTML = resHTML.concat(node.outerHTML);
            //console.log("ite",node, node.localName, node.outerHTML);
        }
        this.$('.parse-result').val(new XmlTools().prettifyXml(resHTML));

        return res;    
    }



    private changeActionCode(selector: JQueryEventObject): void {

        console.log("event on action", selector);
        let action = this.$('.action-field').find('.action').val();
        if(SoapView.payloads[action]!=null){
            let pl = SoapView.payloads[action];
            this.$('.payload').val(new XmlTools().prettifyXml(pl));
        }
    }

    selfSubmitModalAction(): void {

        const action: string = this.$('.action-field').find('.action').val();
        const authTokenType: any = this.$('.authTokenType-field').find('.authTokenType').val();
        const timeout: number = this.$('.timeout-field').find('.timeout').val();
        const payload: string = this.$('.payload-field').find('.payload').val();

        this.$('.response').val("");

        const soapApi: CommFoundHelper = getService(CommFoundHelper);


        soapApi.sendSWSRequest({
            action,
            payload,
            authTokenType,
            timeout
        }).then((response) => {
            const responseValue =
                response.errorCode ? JSON.stringify(response, null, 2) : response.value;

            this.$('.response').val(new XmlTools().prettifyXml(responseValue));
        })
        .catch((error) => {
            this.$('.response').val(error);
        })
    }
}
