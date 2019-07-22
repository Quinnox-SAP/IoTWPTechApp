sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("com.quinnox.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.Home
		 */
		onInit: function () {
			this.result = {};
			this.result.items = [];

			this.odataService = new sap.ui.model.odata.ODataModel("/IotWaterPurifier", {
				json: true
			});

			//	this.mobNum = "";

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteHome").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var that = this;
			//this.mobNum = oEvent.getParameter("arguments").mobileNum;
			//this.odataService.read("TechnicianNo?MobileNo='" + this.mobNum + "'", null, null, false, function (response) {
			this.odataService.read("TechnicianNo?MobileNo='8884072707'", null, null, false, function (response) {
				if (response.Message === "Valid No") {
					that.getOwnerComponent().getModel("oTechnician").setData(response);
					that.getOwnerComponent().getModel("oTechnician").refresh(true);
					//that.getOwnerComponent().getRouter().navTo("RouteHome");

				} else {
					MessageBox.error("Enter Valid Number");
					that.getView().byId("idnum").setValue("");
				}
			});
		},
		onOpenServReq: function () {
			//	var that = this;
			this.getOwnerComponent().getRouter().navTo("RouteOpenServRequests");
			// that.getOwnerComponent().getRouter().navTo("RouteOpenServRequests", {
			// 	mobileNum: that.mobNum
			// });
			// this.odataService.read("TechnicianMasterSet?$filter=TechnicianNo eq '" + sap.ui.getCore().mobNum + "' and ReqType eq 'X'", null,
			// 	null, false,
			// 	function (
			// 		response) {
			// 		that.getOwnerComponent().getModel("oOpenServices").setData(response);
			// 		that.getOwnerComponent().getModel("oOpenServices").refresh(true);
			// 		that.getOwnerComponent().getRouter().navTo("RouteOpenServRequests");
			// 	});
		},
		onClosedServReq: function () {
			//var that = this;
			this.getOwnerComponent().getRouter().navTo("RouteClosedServRequests");
			// that.getOwnerComponent().getRouter().navTo("RouteClosedServRequests", {
			// 	mobileNum: that.mobNum
			// });
			// this.odataService.read("TechnicianMasterSet?$filter=TechnicianNo eq '" + sap.ui.getCore().mobNum + "' and ReqType eq ''", null,
			// 	null, false,
			// 	function (
			// 		response) {
			// 		that.getOwnerComponent().getModel("oClosedServices").setData(response);
			// 		that.getOwnerComponent().getModel("oClosedServices").refresh(true);
			// 		that.getOwnerComponent().getRouter().navTo("RouteClosedServRequests");
			// 	});
		},
		onNavBack: function () {
			var sHistory = History.getInstance();
			var sPreviousHash = sHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("RouteLogin", null, true);
			}
		},
		onPress: function () {
				//this.getOwnerComponent().getRouter().navTo("RouteLogin");
				var oRef = this;
				var sRouter = sap.ui.core.UIComponent.getRouterFor(oRef);
				sRouter.navTo("RouteLogin", null, true);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.view.Home
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.Home
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.Home
		 */
		//	onExit: function() {
		//
		//	}

	});

});