import * as React from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { InputGroup } from "../../../components/InputGroup";
import { PopoverForm } from "../../../components/PopoverForm";
import { Select } from "../../../components/Select";
import { getService } from "../../../Context";
import { CommFoundHelper } from "../../../services/CommFoundHelper";
import { XmlTools } from "../../../util/XmlTools";
import { ReservationRs } from "sabre-ngv-pos-cdm/reservation";
import { Checkbox } from "../../../components/Checkbox";


export interface CstErrorFormProps {

    handleClose?: () => void;
    errorData?: any;
    navigation?: JSX.Element;
    pnrData?: ReservationRs;
}

export interface CstErrorFormState {

}

export class CstErrorForm extends React.Component<CstErrorFormProps,CstErrorFormState> {

    constructor(e) {
        super(e);
//        this.handleChange = this.handleChange.bind(this);
//        this.handleExecute = this.handleExecute.bind(this);
//        this.getPrettyParsedXML = this.getPrettyParsedXML.bind(this);
//        this.handleCheck = this.handleCheck.bind(this);
    }

    state : CstErrorFormState = {
    }

    handleChange(e) : void {
    }


    renderButtons(): JSX.Element[] {
        return(
            [<Button name="btnCancel" title="Cancel" handleClick={this.props.handleClose}/>]
        );
    }
    render(): JSX.Element {
        return (
            <PopoverForm name="" title="" content={null} buttons={this.renderButtons()} navigation={this.props.navigation}>
                <div className="form-group">
                    <pre>{JSON.stringify(this.props.errorData)}</pre>
                </div>
            </PopoverForm>
        );
    }

}