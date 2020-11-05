import * as React from 'react';
import { AbstractModel } from "sabre-ngv-app/app/AbstractModel";
import { getService } from '../../../Context';
import { CommFoundHelper } from '../../../services/CommFoundHelper';
import { AfterSellPopover } from '../../customWF/AfterSellPopover';
import { CstAllForm } from './CstAllForm';
import { CstLeisureForm } from './CstLeisureForm';
import { CommandMessageReservationRs, ReservationRs } from "sabre-ngv-pos-cdm/reservation";
import { CstErrorForm } from './CstErrorForm';
import { CstBusinessForm } from './CstBusinessForm';

const eventBus: AbstractModel = new AbstractModel();

export enum CmdHelperForms {
    cstAll,
    cstLeisure,
    cstBusiness
}

export interface CmdHelperState {
    currentView:CmdHelperForms;
    travelType: 'BIZ' | 'LEI' | 'OTH';
    pnrData:ReservationRs;
    errorData:any;

}

export class CmdHelperComponent extends React.Component<{},CmdHelperState> {

    constructor(props){
        super(props)
    }

    state: CmdHelperState = {
        currentView:CmdHelperForms.cstAll,
        travelType:null,
        pnrData:null,
        errorData:"processing reservation data..."
        
    }

    componentDidMount(): void {
        console.log("mounted");
        getService(CommFoundHelper).getReservation().then(
            (res:CommandMessageReservationRs)=>{

                if(res && res.Status && res.Status.Success==true){
                    if(!_.isUndefined(res.Data)){
                        let dk="";
                        if(!_.isUndefined(res.Data.Passengers.DkNumber)){
                            dk = res.Data.Passengers.DkNumber;
                            console.log("has dk",dk);
                        }
                        this.setState({travelType:(dk.indexOf("LEI")>0?'LEI':dk.indexOf("BIZ")>0?'BIZ':dk.indexOf("OTH")>0?'OTH':null), pnrData:res.Data});
                    }
                }else{
                    console.log("error getres",res);
                    this.setState({travelType:null,pnrData:null,errorData:res?res.Status:"no data"});
                }

            }
        );
    }

    private closePopovers = (): void => {
        eventBus.triggerOnEventBus('hide-popovers', 'novice-menu')
    }


    private handleFormChange = (selectedView:CmdHelperForms) => (): void => {
        this.setState({
            currentView: selectedView
        });
    }


    renderForm(): JSX.Element {
        switch (this.state.currentView){
            case CmdHelperForms.cstAll:
                return(<CstAllForm handleClose={this.closePopovers}  navigation={this.renderNavigation()} pnrData={this.state.pnrData}/>);
            case CmdHelperForms.cstBusiness:
                return( <CstBusinessForm handleClose={this.closePopovers}  navigation={this.renderNavigation()} pnrData={this.state.pnrData}/>);
            case CmdHelperForms.cstLeisure:
                return(<CstLeisureForm handleClose={this.closePopovers}  navigation={this.renderNavigation()} pnrData={this.state.pnrData}/>);
            default:
                return (<CstErrorForm handleClose={this.closePopovers} errorData={this.state.errorData}/>);
        }
    }

    renderNavigation(): JSX.Element {
        return (
            <div className="navigation">
                <ul className="nav nav-pills tabs-left">
                    <li className={this.state.currentView==CmdHelperForms.cstAll?"active":"xp-context"}>
                        <a href="#" className="tab" onClick={this.handleFormChange(CmdHelperForms.cstAll)}>All Travelers</a>
                    </li>
                    
                    {this.state.travelType=='LEI'?
                        <li className={this.state.currentView==CmdHelperForms.cstLeisure?"active":"xp-context"}>
                        <a href="#" className="tab" onClick={this.handleFormChange(CmdHelperForms.cstLeisure)}>Leisure Travel</a>
                        </li>
                        :null
                    }

                    {this.state.travelType=='BIZ'?
                        <li className={this.state.currentView==CmdHelperForms.cstBusiness?"active":"xp-context"}>
                            <a href="#" className="tab" onClick={this.handleFormChange(CmdHelperForms.cstBusiness)}>Business Travel</a>
                        </li>
                        :null
                    }
                </ul>
            </div>
        );
       
    }

    render() : JSX.Element {
        if(this.state.pnrData!=null){
            return this.renderForm();
        }else{
            return (
                <CstErrorForm handleClose={this.closePopovers} errorData={this.state.errorData} />
            );
        }
    }
}