# Showcase-Red-App
## Overview
An Red App is part of Sabre Red 360 Platform and Ecosystem, it all about integration with Sabre Red 360 Pos Applications during runtime, and offers possibility to customize user workflows and interface. The supporting pillars for the Red App ecosystem are in its Software Developer Toolkit (SDK), its Marketplace Red App Centre (RAC), as well thousands of Sabre Red 360 Users, or Travel Consultants, worldwide.
### skillset
The Red App SDK its currently based on standards of Web Development, a developer will be in contact with modern Javascript frameworks and Design Patterns (REACT, backbone, Bootstrap CSS/LESS, JQuery, Typescript). Also from Web Services perspectives: XML/JSON, HTTPWebRequest, SOAP / REST APIs... talk Standards please.
## Use cases
The Showcase Red App has been created to support system designers and developers during discovery of SDK features and Services, and bases its examples on the most common scenarios found on the market :
- PNR Shell : Creates a new "Travel Order" or Passenger Name Record on the Travel jargon (PNR from now on).
- After Sell : Custom workflow to be executed after Sales operations are done.
- Read Reservation : Obtain a copy of PNR, compute values based on it`s data. 
- Write PNR Remarks : comonly used for back-office integrations and robotic operations / fullfilment
- Sandbox : use this project to experiment and explorer the customization capabilities using the SDK and Sabre APIs, use this project as an scafold to support proof of concept.
## Build and run the Application
In order to build and run this project, you'll need to download the latest Sabre Red Web SDK and install the Sabre Concierge tool (NodeJS based), you can start here : [Sabre Dev Studio](https://developer.sabre.com/sdks/travel-agency/sabre-red-360/getting-started), we also recomend Visual Studio code as IDE / Code Editor.
Once you have Concierge installed, open a command prompt on the project root folder (the one containing the package.json file) and issue a NGV BUILD command, this operation will install base dependencies using NPM and "compile" the source typescript code into a minified javascript module that could be loaded on the Sabre Red 360 Web App at runtime.
For running and testing your module, you will need to have a Web browser (preferreably Chrome+Chromium Developer tools) and to issue a NGV RUN command on the project root folder, this will create a web server (http://localhost:8080) which will host your module during development stages.
Open browser at srw.cert.sabre.com, click on the Jigsaw icon to the right of the screen, add address of your webmodule host, then hit Apply button, this should load your module and call the init() method of it, you can confirm by searching module name on the console output.

# Support
- [Stack Overflow](http://stackoverflow.com/questions/tagged/sabre "Stack Overflow")
- Need to report an issue/improvement? Use the built-in [issues] (https://github.com/SabreDevStudio/SACS-Java/issues) section
- [Sabre Dev Studio](https://developer.sabre.com/)
## Feedback
```Typescript
    //Thank you !
    do.please() {
        
        go.downloadSDK(
            https://developer.sabre.com/sdks/travel-agency/sabre-red-360
        ).then(
            (Concierge) => {
                git.clone(
                    https://github.com/SabreDevStudio/Showcase-Red-App
                ).then({
                    await go.hackFun()
                })
            }).then(
                (feedback) => {
                    do.letUsKnow("together we create better products")
                }
            )
        )
    }
```
## License
Copyright (c) 2020 Sabre Corp Licensed under the MIT license.
## Disclaimer of Warranty and Limitation of Liability
This software and any compiled programs created using this software are furnished “as is” without warranty of any kind, including but not limited to the implied warranties of merchantability and fitness for a particular purpose. No oral or written information or advice given by Sabre, its agents or employees shall create a warranty or in any way increase the scope of this warranty, and you may not rely on any such information or advice.
Sabre does not warrant, guarantee, or make any representations regarding the use, or the results of the use, of this software, compiled programs created using this software, or written materials in terms of correctness, accuracy, reliability, currentness, or otherwise. The entire risk as to the results and performance of this software and any compiled applications created using this software is assumed by you. Neither Sabre nor anyone else who has been involved in the creation, production or delivery of this software shall be liable for any direct, indirect, consequential, or incidental damages (including damages for loss of business profits, business interruption, loss of business information, and the like) arising out of the use of or inability to use such product even if Sabre has been advised of the possibility of such damages.