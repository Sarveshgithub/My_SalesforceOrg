({
    loadData : function(component, event, helper) {
        console.log('onload it is called');
        helper.loadData(component, event, helper); 
    },

    showSpinner : function(component, event, helper) {
        helper.showSpinner(component, event, helper);
    },

    hideSpinner : function(component, event, helper) {
        helper.hideSpinner(component, event, helper);
    },
    
    first : function(component, event, helper) {
        var last = component.get('v.valueOflast');
        var offset = 0;
        component.set('v.intOffset', offset);
        component.set('v.numerator', 1);
        helper.loadData(component, event, helper); 

        if(offset == 0) {
            component.set('v.first', true);
            component.set('v.prev', true);
        }

        if(offset != (last-10)) {
            component.set('v.next', false);
            component.set('v.last', false);
        }
    },
    
    previous:function(component, event, helper) {	
        var last = component.get('v.valueOflast');
        var offset = component.get('v.intOffset');
        var offset = offset-10;
        component.set('v.intOffset', offset);
        component.set('v.numerator', (offset/10)+1);

        if(offset == 0) {
            component.set('v.prev', true);
            component.set('v.first', true);
        }

        if(offset != (last-10)) {
            component.set('v.next', false);
            component.set('v.last', false);
        }
        helper.loadData(component, event, helper); 
    },
    
    Next:function(component, event, helper) { 
        var offset = component.get('v.intOffset');
        console.log('>>>>>>>>>>>>offset>>>>', offset);
        var last = component.get('v.valueOflast');
        var offset = component.get('v.intOffset');
        var offset = offset+10;
        component.set('v.intOffset', offset);
        component.set('v.numerator', (offset/10)+1);

        if(offset == (last-10)) {
            component.set('v.next', true);
            component.set('v.last', true);
        }

        if(offset >= 10) {
            component.set('v.prev', false);
            component.set('v.first', false);  
        }

        if(offset != (last-10)) {
            component.set('v.last', false);
        }

        helper.loadData(component, event, helper);
    },
    
    last:function(component, event, helper) { 
        var last = component.get('v.valueOflast');
        component.set('v.numerator', last/10);
        var last = last-10;
        component.set('v.intOffset', last);
        var offset = component.get('v.intOffset');

         if(offset == (last)) {
            component.set('v.next', true);
            component.set('v.first', false);
            component.set('v.prev', false);
        }

        helper.loadData(component, event, helper);
        console.log('last value', last);
        component.set('v.last', true);
    },

    onclick : function(component, event, helper) {
        var strcolLabel = event.target.id;
        component.set('v.strcolLabel', strcolLabel);
        console.log(':::::::::colLable::::::::',component.get('v.strcolLabel'));
        var currentState = component.get('v.strOrderBy');
        
        
        if(currentState == 'ASC') {
            component.set('v.arrowDown', true);
            component.set('v.arrowUp', false);
            component.set('v.strOrderBy', 'DESC');  
        }

        if(currentState == 'DESC') {
            component.set('v.arrowUp', true);
            component.set('v.arrowDown', false);
            component.set('v.strOrderBy', 'ASC'); 
        }
    
        console.log(':::::::::For Order By::::::::::::', component.get('v.strOrderBy'));
        helper.loadData(component, event, helper); 
    }
})