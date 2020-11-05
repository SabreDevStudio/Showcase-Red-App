import AbstractBootstrapPopoverButton  from "sabre-ngv-UIComponents/commandHelperButton/components/AbstractBootstrapPopoverButton";
import { ChildComponentContent } from "sabre-ngv-UIComponents/commandHelperButton/interfaces/ChildComponentContent";
import StatelessComponent  from "sabre-ngv-UIComponents/baseComponent/components/StatelessComponent";
import StatefulComponent  from "sabre-ngv-UIComponents/baseComponent/components/StatefulComponent";

import { AbstractViewOptions } from "sabre-ngv-app/app/AbstractViewOptions";
import { CommFoundComponents } from "./CommFoundComponents";

import { Initial } from "sabre-ngv-core/decorators/classes/Initial";

@Initial(
    {
        caption: '<i class="fa fa-cloud"></i><span>GDS Data</span>'
    }
)
export default class CommFoundButton extends AbstractBootstrapPopoverButton {
    initialize(options: AbstractViewOptions): void {
        super.initialize(options);
    }

    private content = new StatelessComponent(
        {
            componentName: 'CommFoundButton',
            rootReactComponent : CommFoundComponents
        }
    );

    protected getContent(): ChildComponentContent {
        return this.content;
        //throw new Error("Method not implemented.");
    }

}