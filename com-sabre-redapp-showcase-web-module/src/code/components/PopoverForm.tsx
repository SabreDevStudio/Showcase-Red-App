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
        return (
        <div className='com-sabre-redapp-showcase-web-module popover-wrapper'>
            {this.props.navigation}
            <div className="content content-scroll">
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