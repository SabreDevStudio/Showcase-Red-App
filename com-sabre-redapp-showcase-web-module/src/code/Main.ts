import {Module} from 'sabre-ngv-core/modules/Module';
import { registerService, getService } from './Context';
import { CommFoundHelper } from './services/CommFoundHelper';
import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService';
import {RedAppSidePanelConfig} from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import {RedAppSidePanelButton} from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import {LayerService} from "sabre-ngv-core/services/LayerService";
import { NudgeConfig } from "sabre-ngv-xp/configs/NudgeConfig";
import { NgvNudgeEntry } from "sabre-ngv-xp/interfaces/NgvNudgeEntry";
import { NudgeView } from './views/popUps/NudgeView';
import { WidgetXPConfig } from "sabre-ngv-xp/configs/WidgetXPConfig";
import CmdHelperButton from './views/cmdHelper/custom/CmdHelperButton';
import CommFoundButton from './views/cmdHelper/gdsData/CommFoundButton';
import { ShellPnrComponent } from './views/customWF/ShellPnrComponent';
import { AfterSellPopover } from './views/customWF/AfterSellPopover';
import { BeforeEndHandler } from './services/xtpoints/BeforeEndHandler';
import { Variables } from './services/Variables';

export class Main extends Module {

    init(): void {
        super.init();
        // module initialization
        this.setupNudge();

        //services to back the Module operation
        registerService(CommFoundHelper);
        registerService(BeforeEndHandler);
        registerService(Variables);

        //side panel contributions
        const sidePanelConfig = new RedAppSidePanelConfig([
            new RedAppSidePanelButton('CREATE A PNR', 'btn btn-secondary side-panel-button', () => this.showPNRShellPopup()),
            new RedAppSidePanelButton('AFTER SELL', 'btn btn-secondary side-panel-button', () => this.showAfterSellPopup()),
        ]);
        getService(ExtensionPointService).addConfig("redAppSidePanel", sidePanelConfig);

        //command helper toolbar contribution
        getService(ExtensionPointService).addConfig('novice-buttons', new WidgetXPConfig(CommFoundButton,-1000));
        getService(ExtensionPointService).addConfig('novice-buttons', new WidgetXPConfig(CmdHelperButton,-1000));

    }

    private showPNRShellPopup():void {
        getService(LayerService).showOnLayer(ShellPnrComponent,{display:'areaView',position:33});
    }
    private showAfterSellPopup():void {
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