({
    getURLWrapperDetails : function(component, helper) {
        var action = component.get("c.fetchUrlDetails");	
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") 
                var urlDetail = response.getReturnValue();
            component.set("v.urlDetail", urlDetail.strBaseUrl + urlDetail.strSitePrefix + '/servlet/servlet.FileDownload?file=');                
        });
        $A.enqueueAction(action);
    },
    getRecords : function(component, helper) {
        
        var action = component.get("c.getBannerDocuments");
        action.setParams({
            targetFolderId : component.get("v.targetfolder")
        });
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") 
                component.set("v.result", response.getReturnValue());
            
            if(response.getReturnValue().length > 5) {
                component.set("v.startIndex", 0);
                component.set("v.endIndex", 5);                
                var mainArray = response.getReturnValue();
                var subArray = mainArray.slice(component.get("v.startIndex"), component.get("v.endIndex"));
                component.set("v.thumbnailResult", subArray);
            } 
            else
                component.set("v.thumbnailResult", response.getReturnValue());
            
            if(response.getReturnValue().length > 0) {
                component.set("v.imageId", response.getReturnValue()[0].Id);
                component.set("v.desc", response.getReturnValue()[0].Description);
                helper.applyFadeInOutTranisitions(component, response.getReturnValue(), true, helper);
            }
            if(response.getReturnValue().length <= 5) {
                var cmpTarget = component.find("rightArrowId");
                $A.util.addClass(cmpTarget, 'hideButton');
            }
            
        });
        $A.enqueueAction(action);
    },
    
    applyFadeInOutTranisitions : function(component, result, isCalledFromOnload, helper) {
        var image_number = 0;
        if(isCalledFromOnload)
            image_number = 1;
        else
            image_number = 0; 
        
        if(component.isValid()) {
            var timeInterval = component.get("v.trasnitionseconds");
            var cmpTarget = component.find("mainImageId");
        }
        if(parseInt(timeInterval, 10) < 0)
            timeInterval = 5;
        
        var fadeInInterval = 1000*(parseInt(timeInterval, 10) - 0.1);        
        var fadeOutInterval = 1000*(parseInt(timeInterval, 10) - 2); 
        
        if(component.isValid() && component.get("v.transitiontype") === 'FadeIn') {
            image_number = 0;
            $A.util.addClass(cmpTarget, 'addOpacityZero'); 
        }
        //Clearing the Intervals 
        if(window.myBannerIntervalId !== undefined ) {
            window.clearInterval(window.myBannerIntervalId);
        }
        if(window.myBannerFadeInTimeoutId !== undefined ) {
            window.clearTimeout(window.myBannerFadeInTimeoutId);
        }                
        if(window.myBannerFadeOutIntervalId !== undefined) {
            window.clearInterval(window.myBannerFadeOutIntervalId);
        }
        if(window.myBannerFadeInOutTransitionId !== undefined) {
            window.clearInterval(window.myBannerFadeInOutTransitionId);
        }
        
        if(component.isValid() && component.get("v.transitiontype") === 'FadeIn') {
            image_number = helper.update(component, result, image_number);
            helper.updateFadeInOut(component, fadeInInterval);
        }
        if(component.isValid() && component.get("v.transitiontype") === 'FadeOut') {
            window.myBannerFadeOutIntervalId = setInterval(
                $A.getCallback(function() {
                    helper.updateFadeOut(component);
                }), fadeOutInterval
            );
        }
        window.myBannerIntervalId = setInterval(
            $A.getCallback(function() {
                image_number = helper.update(component, result, image_number);
                helper.updateFadeInOut(component, fadeInInterval);
            }), 1000*parseInt(timeInterval, 10)
        );
    },
    
    updateFadeOut : function(component) {
        if(component.isValid()) {
            var cmpTarget = component.find("mainImageId");
            if(component.get("v.transitiontype") === 'FadeOut') {
                $A.util.addClass(cmpTarget, 'hidden');
            }
        }
    },
    
    updateFadeInOut : function(component, fadeInInterval) {
        if(component.isValid() && component.get("v.transitiontype") === 'FadeIn') {
            window.myBannerFadeInTimeoutId = window.setTimeout(
                $A.getCallback(function() {
                    if(component.isValid()) {
                        var cmpTarget = component.find("mainImageId");
                        $A.util.removeClass(cmpTarget, 'visible');
                        $A.util.addClass(cmpTarget, 'addOpacityZero'); 
                    }
                }), fadeInInterval 
            );
        }
    },
    
    update : function(component, result, image_number) {
        if(component.isValid()) {
            var cmpTarget = component.find("mainImageId");
            if(component.get("v.transitiontype") === 'FadeOut') {
                $A.util.removeClass(cmpTarget, 'hidden');
            } 
            else if(component.get("v.transitiontype") === 'FadeIn') {
                $A.util.removeClass(cmpTarget, 'addOpacityZero');
                $A.util.addClass(cmpTarget, 'visible');                       
            }
            if(!component.get("v.targetfolder"))
                component.set("v.imageSrc", result[image_number].src);
            else {
                component.set("v.imageId", result[image_number].Id);
            }
            component.set("v.desc", result[image_number].Description); 
            
            image_number++;
            if(image_number >= result.length) {
                image_number = 0;
            }            
        }
        return image_number;
    },
    
    doChangeMainImage : function(component, event, helper) {
        
        var idx = event.target.id;
        var timeInterval = component.get("v.trasnitionseconds"); 
        if(parseInt(timeInterval, 10) < 0)
            timeInterval = 5;
        //Clearing the Intervals 
        if(window.myBannerIntervalId !== undefined ){
            window.clearInterval(window.myBannerIntervalId);
        }
        if(window.myBannerFadeInTimeoutId !== undefined ){
            window.clearTimeout(window.myBannerFadeInTimeoutId);
        }                
        if(window.myBannerFadeOutIntervalId !== undefined){
            window.clearInterval(window.myBannerFadeOutIntervalId);
        }
        if(window.myBannerFadeInOutTransitionId !== undefined){
            window.clearInterval(window.myBannerFadeInOutTransitionId);
        }
        if(component.get("v.transitiontype") === 'FadeOut') {
            var cmpTarget = component.find("mainImageId");
            $A.util.removeClass(cmpTarget, 'addOpacityZero');
            $A.util.removeClass(cmpTarget, 'hidden');
            $A.util.addClass(cmpTarget, 'addOpacityOne');
        }
        
        if(component.get("v.targetfolder")) {
            component.set("v.imageId",idx);   
        } 
        else {
            component.set("v.imageSrc",idx);
        }
        if(component.get("v.showdescription")){
            var i;
            var results = component.get("v.result");
            if(!component.get("v.targetfolder")) {
                for(i = 0; i < results.length; i++) {
                    if(results[i].src === idx)
                        component.set("v.desc", results[i].Description);                
                }
            } else {
                for(i = 0; i < results.length; i++) {
                    if(results[i].Id === idx)
                        component.set("v.desc", results[i].Description); 
                }
            }
        }
        window.myBannerFadeInOutTransitionId = window.setTimeout(
            $A.getCallback(function() {
                if(component.isValid())
                    helper.applyFadeInOutTranisitions(component,component.get("v.result"),false,helper);
            }), 1000*timeInterval 
        );
    }
})