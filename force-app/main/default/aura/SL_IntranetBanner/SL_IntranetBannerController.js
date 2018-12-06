({
    doInit : function(component, event, helper) {
        helper.getURLWrapperDetails(component, helper);
        var device = $A.get("$Browser.formFactor");
        
        if(device === 'PHONE' || component.get("v.ComponentPlacement") === 'Sidebar') {
            component.set("v.thumbnailWidth", 55);
            component.set("v.thumbnailHeight", 55);
        } 
        else {
            component.set("v.thumbnailWidth", 81);
            component.set("v.thumbnailHeight", 77);
        } 
        
        if(!component.get("v.targetfolder")) {
            var result = [];
            var elementToAdd = {};
            var i, slot;
            
            for(i = 1; i <= 5; i++) {
                slot = 'v.image' + i;
                
                if(!(typeof(component.get(slot)) === "undefined") && component.get(slot) !== null && component.get(slot) !== '') {
                    elementToAdd = {'src' : component.get(slot), 'Description' : component.get("v.description" + i)};
                    result.push(elementToAdd);
                }
            }
            component.set("v.result", result);
            if(result.length > 0) {               
                component.set("v.imageSrc", result[0].src);
                component.set("v.desc", result[0].Description);
                helper.applyFadeInOutTranisitions(component, result, true, helper);
            }
        } 
        else {
            helper.getRecords(component, helper);
        }
    },
    
    showSpinner : function (component) {
        component.set("v.spinnerLoad", "true");
    },
    
    hideSpinner : function (component) {
        component.set("v.spinnerLoad", "false");
    },
    
    getPrev : function (component, event, helper) {
        var startIndex = component.get("v.startIndex") - 5;
        var endIndex = component.get("v.startIndex");
        var mainArray = component.get("v.result");        
        var totalImages = mainArray.length;
        var subArray = [];
        
        if(startIndex >= 0) {
            subArray = mainArray.slice(startIndex, endIndex);
            component.set("v.startIndex", startIndex);
            component.set("v.endIndex", endIndex);
            component.set("v.thumbnailResult", subArray);
            $A.util.removeClass(component.find("rightArrowId"), 'hideButton');
            if(startIndex === 0) {
                $A.util.addClass(component.find("leftArrowId"), 'hideButton');
            }
        } 
        else if(startIndex < 0 && endIndex > 0) {
            startIndex = 0;
            endIndex = 5;
            subArray = mainArray.slice(startIndex, endIndex);
            component.set("v.startIndex", startIndex);
            component.set("v.endIndex", endIndex);
            component.set("v.thumbnailResult", subArray);
            $A.util.addClass(component.find("leftArrowId"), 'hideButton');   
            $A.util.removeClass(component.find("rightArrowId"), 'hideButton');
        }
    },
    
    getNext : function (component, event, helper) {
        var startIndex = component.get("v.endIndex") ;
        var endIndex = component.get("v.endIndex") + 5;
        var mainArray = component.get("v.result");        
        var totalImages = mainArray.length;
        var subArray = [];
        
        if(endIndex <= totalImages) {
            subArray = mainArray.slice(startIndex, endIndex);
            component.set("v.startIndex", startIndex);
            component.set("v.endIndex", endIndex);
            component.set("v.thumbnailResult", subArray);
            $A.util.removeClass(component.find("leftArrowId"), 'hideButton');
            if(endIndex === totalImages) {
                $A.util.addClass(component.find("rightArrowId"), 'hideButton');
            }
            
        } 
        else if(endIndex > totalImages && endIndex - totalImages < 5) {
            startIndex = totalImages - 5;
            endIndex = totalImages;
            subArray = mainArray.slice(startIndex, endIndex);
            component.set("v.startIndex", startIndex);
            component.set("v.endIndex", endIndex);
            component.set("v.thumbnailResult", subArray);
            $A.util.removeClass(component.find("leftArrowId"), 'hideButton');
            $A.util.addClass(component.find("rightArrowId"), 'hideButton');
        }     
    },
    
    changeMainImage : function(component, event, helper)  {
        helper.doChangeMainImage(component, event, helper);    
    }
})