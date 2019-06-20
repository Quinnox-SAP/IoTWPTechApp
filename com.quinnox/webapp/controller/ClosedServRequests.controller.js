sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/core/routing/History"
], function (Controller, Filter, History) {
	"use strict";

	return Controller.extend("com.quinnox.controller.ClosedServRequests", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.ClosedServRequests
		 */
		onInit: function () {
			this.result = {};
			this.result.items = [];
			this.odataService = new sap.ui.model.odata.ODataModel("/IotWaterPurifier", {
				json: true
			});

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteClosedServRequests").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var that = this;
			that.getView().byId("idSearch").setValue("");
			var aFilters = [];
			var sQuery = "";
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("NotiNumber", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("idList");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
			var mobNum = oEvent.getParameter("arguments").mobileNum;
			this.odataService.read("TechnicianMasterSet?$filter=TechnicianNo eq '" + mobNum + "' and ReqType eq ''", null,
				null, false,
				function (
					response) {
					that.getOwnerComponent().getModel("oClosedServices").setData(response);
					that.getOwnerComponent().getModel("oClosedServices").refresh(true);
					//	that.getOwnerComponent().getRouter().navTo("RouteClosedServRequests");
				});

		},
		onSearch: function (oEvt) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("NotiNumber", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("idList");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		},
		onNavBack: function () {
			this.getView().byId("idSearch").setValue("");
			var aFilters = [];
			var sQuery = "";
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("NotiNumber", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("idList");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
			// var list = this.byId("idList");
			// list.getBinding("items").refresh(true);
			var sHistory = History.getInstance();
			var sPreviousHash = sHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// sap.ui.getCore().doorFlag.setEnabled(false);
				// sap.ui.getCore().listFlag = true;
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
		 * @memberOf com.view.ClosedServRequests
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.ClosedServRequests
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.ClosedServRequests
		 */
		//	onExit: function() {
		//
		//	}

	});

});