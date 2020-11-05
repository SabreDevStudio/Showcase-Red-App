export class XmlTools {
    
    prettifyXml(sourceXml) : string {
        var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
        var xsltDoc = new DOMParser().parseFromString([
        // describes how we want to modify the XML - indent everything
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
        ].join('\n'), 'application/xml');

        var xsltProcessor = new XSLTProcessor();    
        xsltProcessor.importStylesheet(xsltDoc);
        var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
        var resultXml = new XMLSerializer().serializeToString(resultDoc);
        
        return resultXml;
    }

    runXPath(xpathExpression, domDocument: Document) : XPathResult {
        var eva = new XPathEvaluator();
        let defNs:string = domDocument.documentElement.getAttribute("xmlns");
        var nsRes = null;
        if(!_.isNull(defNs) && !_.isUndefined(defNs) && !_.isEmpty(defNs)){
            console.log("hasdefault");
            nsRes = (e) => {
                console.log("resolving namespace",defNs,e);
                return defNs;
            }
        }else{
            nsRes = eva.createNSResolver(domDocument.documentElement);
        }
        console.log("defNs",defNs, nsRes);
        return eva.evaluate(xpathExpression,domDocument.documentElement,nsRes);
    }

    stringToXml(strXML:string): Document {
        var doc = new DOMParser().parseFromString(strXML,"text/xml");
        return doc;
    }

    runXPathJS(strXML:string, xpathExp:string) : any {
        var doc = new DOMParser().parseFromString(strXML,"text/xml");
        var ns = doc.documentElement.getAttribute("xmlns");
    }
    /*
    var resolver = null;
var ns = (new window.DOMParser).parseFromString(xn.outerHTML, "text/xml").children[0].getAttribute("xmlns");
        if (ns)
        {
            resolver = function()
            {
                return ns;
            }
            xpath = "defaultNamespace:" + xpath;
        }

var es = xdoc.evaluate(xpath, xn, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    */
}