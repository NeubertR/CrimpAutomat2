// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.5/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject1;
        (function (TcHmiProject1) {
            function PositionElement(SourceElement, DestElement, PosArea, AutoRezise) {
                if (!SourceElement) {
                    console.log('No source element for positioning');
                    return;
                }
                if (!DestElement) {
                    console.log('No destination element for positioning');
                    return;
                }
                var windowposition;
                if (!PosArea) {
                    windowposition = true;
                } else {
                    windowposition = false;
                }
                // get element id's  
                var elementId = SourceElement.getId();
                var poselementId = DestElement.getId();

                if (elementId) {
                    //--------------------- Get position ----------------------------
                    var element = document.getElementById(elementId);
                    var rect = element.getBoundingClientRect();
                    var sourcetop = rect.top;
                    var sourceheigth = rect.height;
                    var sourceleft = rect.left;
                    var sourcewidth = rect.width;

                } else {
                    console.log('No element id for source element position');
                }
                if (poselementId) {
                    var poselement = document.getElementById(poselementId);
                    var rectpos = poselement.getBoundingClientRect();
                    var posdestinationleft;
                    var posdestinationwidth;
                    var resizefactor;
                    var posdestinationtop;
                    var totalwidth = window.innerWidth;
                    var totalheight = window.innerHeight;
                    var topMin;
                    var topMax;
                    var leftMin;
                    var leftMax;

                    //--------------------- Set position area ----------------------------
                    // Area in witch the element position will be set
                    if (windowposition) {
                        topMin = 0;
                        topMax = totalheight;
                        leftMin = 0;
                        leftMax = window.innerWidth;
                    } else {
                        var posAreaId = PosArea.getId();
                        var posArea = document.getElementById(posAreaId);
                        var rectArea = posArea.getBoundingClientRect();
                        topMin = rectArea.top;
                        topMax = rectArea.height - rectArea.top;
                        leftMin = rectArea.left;
                        leftMax = rectArea.width - rectArea.left;
                    }
                    if (AutoRezise) {
                        if ((rectpos.width * 1.05) > (rectArea.width / 2)) {
                            resizefactor = (rectArea.width * 0.45) / rectpos.width;
                            posdestinationwidth = rectArea.width * 0.45;
                        }
                        poselement.style.setProperty("width", posdestinationwidth + "px");
                        poselement.style.setProperty("height", (rectpos.height * resizefactor) + "px");
                        rectpos = poselement.getBoundingClientRect();
                    }
                    

                    //--------------------- Set left position ----------------------------
                    if ((sourceleft + sourcewidth) < (leftMax - rectpos.width * 1.05)) {
                        posdestinationleft = sourceleft + sourcewidth * 1.05;
                        
                    } else {
                        posdestinationleft = sourceleft - rectpos.width * 1.05;
                        
                    }
                    if (posdestinationleft < leftMin) {
                        posdestinationleft = leftMin;
                    }
                    
                    poselement.style.setProperty("left", posdestinationleft + "px");

                    //--------------------- Set top position ----------------------------
                    posdestinationtop = sourcetop + (sourceheigth / 2) - (rectpos.height / 2);
                    if (posdestinationtop < topMin) {
                        posdestinationtop = topMin;
                    } else if (posdestinationtop > (topMax - rectpos.height)) {
                        posdestinationtop = topMax - rectpos.height;
                    }

                    poselement.style.setProperty("top", posdestinationtop + "px");

                } else {
                    console.log('No element id for destination element position');
                }
            }
            TcHmiProject1.PositionElement = PositionElement;
        })(TcHmiProject1 = Functions.TcHmiProject1 || (Functions.TcHmiProject1 = {}));
        Functions.registerFunctionEx('PositionElement', 'TcHmi.Functions.TcHmiProject1', TcHmiProject1.PositionElement);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
