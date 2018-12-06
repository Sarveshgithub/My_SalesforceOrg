({
	loadData : function(cmp, evt, help) {
		help.loadData(cmp, evt, help);
	},

	next : function(cmp,evt, help) {
		let data, next, prev, orderData, tempdata = [];
		data = cmp.get('v.allRowData');
		data.forEach(val => {
			tempdata.push(val)
		})
		next = cmp.get('v.next');
		prev = cmp.get('v.prev');
		orderData = tempdata.splice(next + prev , prev);
		cmp.set('v.next', next+prev);
		cmp.set('v.rowData', orderData);
		cmp.set('v.allRowData', data);
	},

	prev : function(cmp,evt, help) {
		let data, next, prev, orderData, tempdata = [];
		data = cmp.get('v.allRowData');
		data.forEach(val => {
			tempdata.push(val)
		})
		next = cmp.get('v.next');
		prev = cmp.get('v.prev');
		orderData = tempdata.splice(next - prev , prev);
		cmp.set('v.next', next-prev);
		cmp.set('v.rowData', orderData);
		cmp.set('v.allRowData', data);
	},

	editRec: function(cmp, evt, help) {
		let recId ;
	 	recId = evt.currentTarget.id;
	 	var editrecord = $A.get("e.force:editRecord");
	 	 editrecord.setParams({
	 	 	"recordId" : recId
	 	 });
	 	 editrecord.fire();
	},
	delteRec: function(cmp, evt, help) {
		let recId ,action,state,ret;
	 	recId = evt.currentTarget.id;
	 		action = cmp.get("c.deleteRecord");
	 		action.setParams({
	 			recId : recId
	 		});
	 		action.setCallback(this, function(response) {
	 			state = response.getReturnValue();
	 			if(ret){
	 				help.toast('SUCCESS!', 'Delete succesfully', 'success')
	 			}
	 		});
	 		$A.enqueueAction(action);
	},

	newRecord : function(cmp, evt, help) {
		let createRecordEvent = $A.get("e.force:createRecord");
		createRecordEvent.setParams({
			"entityType" : cmp.get('v.object')
		});
	createRecordEvent.fire();
	}
})