import {Module} from 'sabre-ngv-core/modules/Module';
import { registerService, getService } from './Context';
import { CommFoundHelper } from './services/CommFoundHelper';
import { XmlTools } from './util/XmlTools';
import { SoapView } from './views/SoapView';
import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService';
import {RedAppSidePanelConfig} from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import {RedAppSidePanelButton} from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import {LayerService} from "sabre-ngv-core/services/LayerService";
import { RestView } from './views/RestView';
import { NudgeConfig } from "sabre-ngv-xp/configs/NudgeConfig";
import { NgvNudgeEntry } from "sabre-ngv-xp/interfaces/NgvNudgeEntry";
import { NudgeView } from './views/popUps/NudgeView';
import { CmdHelperComponent } from './views/cmdHelper/custom/CmdHelperComponent';
import { WidgetXPConfig } from "sabre-ngv-xp/configs/WidgetXPConfig";
import CmdHelperButton from './views/cmdHelper/custom/CmdHelperButton';
import { WorkflowExtensionHelper } from './services/WorkflowExtensionHelper';
import CommFoundButton from './views/cmdHelper/gdsData/CommFoundButton';
import { ShellPnrComponent } from './views/customWF/ShellPnrComponent';
import { AfterSellPopover } from './views/customWF/AfterSellPopover';
import { BeforeEndHandler } from './services/xtpoints/BeforeEndHandler';
export class Main extends Module {

    init(): void {
        super.init();
        // module initialization
        this.setupNudge();

        //services to back the Module operation
        registerService(CommFoundHelper);
        registerService(BeforeEndHandler);

        //side panel contributions
        const sidePanelConfig = new RedAppSidePanelConfig([
            new RedAppSidePanelButton('CREATE A PNR', 'side-panel-button', () => this.showPNRShellPopup()),
            new RedAppSidePanelButton('AFTER SELL', 'side-panel-button', () => this.showAfterSellPopup()),
        ]);
        getService(ExtensionPointService).addConfig("redAppSidePanel", sidePanelConfig);

        //command helper toolbar contribution
        getService(ExtensionPointService).addConfig('novice-buttons', new WidgetXPConfig(CommFoundButton,-1000));
        getService(ExtensionPointService).addConfig('novice-buttons', new WidgetXPConfig(CmdHelperButton,-1000));

    }

    private showPNRShellPopup():void {
        //console.log("getLayer",getService(LayerService).getLayers());
        getService(LayerService).showOnLayer(ShellPnrComponent,{display:'areaView',position:33});
    }
    private showAfterSellPopup():void {
        //console.log("getLayer",getService(LayerService).getLayers());
        getService(LayerService).showOnLayer(AfterSellPopover,{display:'areaView',position:33});
    }


    private setupNudge():void {
        let xp : ExtensionPointService = getService(ExtensionPointService);
        xp.addConfig(
            'nudge',
            new NudgeConfig('INFO','NUDGE EXTENSION AVAILABLE',[
                {
                    id:'nudgeAction01',
                    label:'more info',
                    action:(entries:NgvNudgeEntry[])=>{
                        getService(LayerService).showInModal(
                            new NudgeView({
                                model: {entries: {entries}, 
                                entriesJSON: JSON.stringify(entries)}}),
                            {title:'Data available for the Nudge Event'},
                            {display:'areaView'}
                        );
                    }
                }], 
                this.nudgeFilter 
            )
        );
    }

    nudgeFilter(entries: NgvNudgeEntry[]):boolean {
        let availableLocations = ["AIR_AVAILABILITY","SHOPPING","HOTEL","CAR","SELL","PRICING"];
        return entries.filter((entry,idx, array)=>{return availableLocations.indexOf(entry.location)>=0}).length>0;
    }





}

       // console.log("sending a command message",getService(CommFoundHelper).sendCommandMessage("1DFWLAS"));

       // console.log("sending a command message",getService(CommFoundHelper).sendCommandMessage("01Y1"));

/*
            let pl = '<Carbon_CalculatorRQ Version="1.3" xmlns="http://webservices.sabre.com/triprecord"><Reservation><Locator></Locator><RequestType>Stateful</RequestType></Reservation></Carbon_CalculatorRQ>';
            let ac = "Carbon_CalculatorRQ";
        console.log("sending a SWS request", 
            getService(CommFoundHelper).sendSWSRequest({action:ac, authTokenType:"SESSION", payload:pl}).then(rs=>{console.log("SWS Response",new XmlTools().prettifyXml(rs.value))})
        );

        let pl1 = '<SabreCommandLLSRQ xmlns="http://webservices.sabre.com/sabreXML/2003/07" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" TimeStamp="2014-03-04T14:00:00" Version="1.8.1"><Request Output="SCREEN" CDATA="true"><HostCommand>*A</HostCommand></Request></SabreCommandLLSRQ>';
    getService(CommFoundHelper).sendSWSRequest({action:"SabreCommandLLSRQ", authTokenType:"SESSION", payload:pl}).then(rs=>{console.log("SWS Response",new XmlTools().prettifyXml(rs.value))})

        console.log("sending a REST API request",
            getService(CommFoundHelper).sendRestRequest({
                httpMethod: "POST",
                url:"/v1/lists/utilities/geocode/locations",
                authTokenType:"SESSIONLESS",
                payload: '[{"GeoCodeRQ":{"PlaceById":{"Id":"DFW","BrowseCategory":{"name":"AIR"}}}}]'
            })
        );

        console.log("sending an HTTP Web request",
            getService(CommFoundHelper).sendExternalHttpRequest({
                httpMethod: "GET",
                url:"https://randomuser.me/api/",
                headers: '{ "Content-Type" : "application/json" }'
            })
        );
        
        
        
    private showCommFoundPopup():void{
        let modalOpts = {
            title:"Sabre APIs - SOAP/XML",
            actions:[
                {
                    className: 'app.common.views.Button',
                    caption: 'Submit',
                    actionName: 'submit-modal',
                    type:'success'
                }
            ]
        }
        getService(LayerService).showInModal(new SoapView(),modalOpts);
    }

    private showRestPopup():void{
        let modalOpts = {
            title:"Sabre APIs - REST/JSON",
            actions:[
                {
                    className: 'app.common.views.Button',
                    caption: 'Submit',
                    actionName: 'submit-modal',
                    type:'success'
                }
            ]
        }
        getService(LayerService).showInModal(new RestView(),modalOpts);
    }

        */