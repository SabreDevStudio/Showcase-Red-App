
/*************************************/
/* Version: 5.6.1                    */
/* Auto-generated file.              */
/* Do not modify it.                 */
/* You may remove it.                */
/* You may commit it.                */
/* You may push it.                  */
/* Remove it if module name changed. */
/* tslint:disable                    */
/*************************************/

import {Main} from './Main';
import {IModuleManifest} from 'sabre-ngv-core/modules/IModuleManifest';
import {context} from './Context';

export default class Module_com_sabre_redapp_showcase_web_module extends Main {
    constructor(manifest: IModuleManifest) {
        super(manifest);
        context.setModule(this);
    }
}