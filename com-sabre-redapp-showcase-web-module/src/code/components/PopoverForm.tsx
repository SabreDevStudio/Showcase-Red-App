import * as React from "react";
import { getService } from "../Context";
//import { availableForms, OwnState } from "./CommFoundComponents";
import {LayerService} from "sabre-ngv-core/services/LayerService";

export interface PopoverFormProps {
    name:string;
    title:string;
    content:JSX.Element;
    buttons:JSX.Element[];
    navigation?:JSX.Element;
}
export class PopoverForm extends React.Component<PopoverFormProps,{}> {

    handleClose(): void {
        getService(LayerService).clearLayer(33);
    }

    render(): JSX.Element {
        /* {
            <div class="popover {{parentPopoverClass}}" role="tooltip">
            <div class="arrow"></div>
            <h3 class="popover-title"></h3>
            <div class="popover-content {{extraContentClass}}"></div>
            </div>
        }*/
        return (
        <div className='com-sabre-redapp-showcase-web-module popover-wrapper'>
            {this.props.navigation}
            <div className="content content-scroll" style={{maxWidth:'80%'}}>
                {this.props.children}
            </div>
            <div className="tab-action-buttons">
                <div className="action-buttons">
                {this.props.buttons}
                </div>
            </div> 
        </div>
        );
    }



}