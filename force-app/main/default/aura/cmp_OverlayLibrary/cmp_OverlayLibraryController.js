({
	handleShowModal: function (component, evt, helper) {
		let modalBody;
		let modalFooter;
		// Create Dynamic Lightning component modal content and footer

		$A.createComponents([
			["c:cmp_lib_modalcontent",{}],
			["c:cmp_lib_modalfooter",{}]
		],
		function(components, status){
			if (status === "SUCCESS") {
				modalBody = components[0];
				modalFooter = components[1];
				component.find('overlayLib').showCustomModal({
				   header: "Application Confirmation",
				   body: modalBody, 
				   footer: modalFooter,
				   showCloseButton: true,
				   cssClass: "my-modal,my-custom-class,my-other-class",
				   closeCallback: function() {
					   alert('You closed the alert!');
				   }
			   }).then(function(overlay) {
				   console.log('overlay',overlay);
				  // overlay.close();
			   })
			}
		}
	   );
	}
})