({
    saveRecord : function(component, event, helper){
        //var test = 'NEW STRING FROM CONTROLLER';
        var fn = component.find("fn");
        var value_fn = fn.get("v.value");
        var ln = component.find("ln");
        var value_ln = ln.get("v.value");
        var age = component.find("age");
        var value_age = age.get("v.value");
        var email = component.find("email");
        var value_email = email.get("v.value");
        var address = component.find("address");
        var value_add = address.get("v.value");
        var skill = component.find("skill");
        var value_skill = address.get("v.value");
        var course = component.find("course");
        var value_course = address.get("v.value");
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var a;
        // is input numeric?
        if (value_fn===""||value_ln===""||isNaN(value_age)||value_add===""||value_email===""||value_skill===""||value_course==="") {
            fn.set("v.errors", [{message:"Enter the First Name"}]);
            ln.set("v.errors", [{message:"Enter the Last Name"}]);
            age.set("v.errors", [{message:"Please Enter age in number"}]);
            address.set("v.errors", [{message:"Please Enter the Address"}]);
            email.set("v.errors", [{message:"Please Enter Email"}]);
            skill.set("v.errors", [{message:"Select Skill"}]);
            course.set("v.errors", [{message:"Select Course"}]);
            // return false;
        }
        console.log("==============a value====",a);
        if (value_email.match(mailformat)) {
            a=0;
            console.log("==============a value====",a);
        }
        if(a!=0)
        {
            console.log("==============a value====",a);
            email.set("v.errors", [{message:"Please Enter Email"}]);
            return true;
        }
        
        else 
        {
            //console.log("called the controller",newObject);
            var newObj=component.get("v.CanObject");
            component.set("v.CanObject",newObj);
            //console.log("=========sssssss=======",newObject);
            helper.newRecord(component,event,helper,newObj);
            //helper.showToast(component,event,helper,responce);
        }
    }
})