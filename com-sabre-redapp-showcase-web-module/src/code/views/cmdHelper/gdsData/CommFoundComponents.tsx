import * as React from 'react';
import { AbstractModel } from "sabre-ngv-app/app/AbstractModel";
import { getService } from '../../../Context';
import { CommFoundHelper } from '../../../services/CommFoundHelper';
import { CommandServicePopover } from './CommandServicePopover';
import {LayerService} from "sabre-ngv-core/services/LayerService";
import { NudgeView } from '../../popUps/NudgeView';
import { ShellPnrComponent } from '../../customWF/ShellPnrComponent';
import { SOAPServicePopover } from './SOAPPopover';
import { RESTServicePopover } from './RESTPopover';
import { CstErrorForm } from '../custom/CstErrorForm';

const eventBus: AbstractModel = new AbstractModel();
export enum availableForms {
    commandService,
    restAPI,
    soapAPI
}

export interface CommFoundState {
    currentView: availableForms;
}

export class CommFoundComponents extends React.Component<{},CommFoundState> {
    constructor(props){
        super(props)
    }

    state: CommFoundState = {
        currentView: availableForms.commandService    
    }

 
    private closePopovers = (): void => {
        eventBus.triggerOnEventBus('hide-popovers', 'novice-menu')
    }


    private handleFormChange = (selectedView:availableForms) => (): void => {
        this.setState({
            currentView: selectedView
        });
    }


    renderForm(): JSX.Element {
        switch (this.state.currentView){
            case availableForms.commandService:
                return(<CommandServicePopover handleClose={this.closePopovers}  navigation={this.renderNavigation()}/>);
            case availableForms.soapAPI:
                return(<SOAPServicePopover handleClose={this.closePopovers}  navigation={this.renderNavigation()}/>);
            case availableForms.restAPI:
                return(<RESTServicePopover handleClose={this.closePopovers}  navigation={this.renderNavigation()}/>);
    
            default:
                return (<CstErrorForm errorData="no form to display" />);
        }
    }

    renderNavigation(): JSX.Element {
        return (
            <div className="navigation">
                <ul className="nav nav-pills tabs-left">
                    <li className={this.state.currentView==availableForms.commandService?"active":"xp-context"}>
                        <a href="#" className="tab" onClick={this.handleFormChange(availableForms.commandService)}>Command Service</a>
                    </li>
                    <li className={this.state.currentView==availableForms.restAPI?"active":"xp-context"}>
                        <a href="#" className="tab" onClick={this.handleFormChange(availableForms.restAPI)}>Sabre REST APIs</a>
                    </li>
                    <li className={this.state.currentView==availableForms.soapAPI?"active":"xp-context"}>
                        <a href="#" className="tab" onClick={this.handleFormChange(availableForms.soapAPI)}>Sabre SOAP APIs</a>
                    </li>
                </ul>
            </div>
        );
       
    }

    render() : JSX.Element {
        return this.renderForm();
    }
}

   /*
    private handleSubmitCommand = (): void => {
        getService(CommFoundHelper).sendCommandMessage("1DFWLAS");
        console.log("LayerService",getService(LayerService).getLayers());
        getService(LayerService).showOnLayer(ShellPnrComponent,{display:'areaView'});
        this.closePopovers();
    }

        public handleCommandChange = (cmd:any) : void => {
        console.log("cmd Changed",cmd);
    }
        renderButtons(): JSX.Element {
        //{Object.keys(obj).forEach(e=>{{e.valueOf}})}
        switch (this.state.currentView){
            case availableForms.commandService:
                return( <div className="action-buttons"><button className="btn cancel-button" onClick={this.closePopovers}>Cancel</button><button className="btn cancel-button" onClick={this.handleSubmitCommand}>Execute</button></div>);
            default:
                return (<div className="action-buttons"><button className="btn cancel-button" onClick={this.closePopovers}>Cancel</button></div>);
        }
    }
    */