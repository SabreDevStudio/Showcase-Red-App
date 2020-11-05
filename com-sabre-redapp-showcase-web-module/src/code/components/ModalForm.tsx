import * as React from "react";
import { getService } from "../Context";
//import { availableForms, OwnState } from "./CommFoundComponents";
import {LayerService} from "sabre-ngv-core/services/LayerService";

export interface ModalFormProps {
    name:string;
    title:string;
    content:JSX.Element;
    buttons:JSX.Element[];
}
export class ModalForm extends React.Component<ModalFormProps,{}> {

    handleClose(): void {
        getService(LayerService).clearLayer(33);
    }

    render(): JSX.Element {
        return (
           <div className="react-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                           <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="panel-title">{this.props.title}</h3>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            {this.props.buttons}
                        </div>
                    </div>
                </div>
           </div>
        );
    }

}