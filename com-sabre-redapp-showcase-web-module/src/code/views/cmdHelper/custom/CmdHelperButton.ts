import AbstractBootstrapPopoverButton  from "sabre-ngv-UIComponents/commandHelperButton/components/AbstractBootstrapPopoverButton";
import { ChildComponentContent } from "sabre-ngv-UIComponents/commandHelperButton/interfaces/ChildComponentContent";
import StatelessComponent  from "sabre-ngv-UIComponents/baseComponent/components/StatelessComponent";
import StatefulComponent  from "sabre-ngv-UIComponents/baseComponent/components/StatefulComponent";

import { CmdHelperComponent } from "./CmdHelperComponent";

import { Initial } from "sabre-ngv-core/decorators/classes/Initial";

@Initial(
    {
        caption: '<i class="fa fa-magic"></i><span>Custom Helpers</span>'
    }
)

export default class CmdHelperButton extends AbstractBootstrapPopoverButton {
    /*initialize(options: AbstractViewOptions): void {
        super.initialize(options);
    }*/

    private content = new StatelessComponent(
        {
            componentName: 'CmdHelperButton',
            rootReactComponent : CmdHelperComponent
        }
    );

    protected getContent(): ChildComponentContent {
        return this.content;
        //throw new Error("Method not implemented.");
    }

}