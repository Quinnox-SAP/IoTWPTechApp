sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"/sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.quinnox.controller.GoogleMap", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.GoogleMap
		 */
		onInit: function () {
			this.getView().addEventDelegate({
				onBeforeShow: jQuery.proxy(function (evt) {
					this.onBeforeShow(evt);
				}, this)
			});
		},

		// onAfterRendering function of controller
		// onAfterRendering: function () {
		// },
		onBeforeShow: function () {
			var me = this;
			this.loadGoogleMaps("https://maps.googleapis.com/maps/api/js?key=AIzaSyDsY0wTepLqqPLo1fzm71MGwBjEOqQB1hc", me.setMapData.bind(me));
		},
		// function for loading google maps
		loadGoogleMaps: function (scriptUrl, callbackFn) {

			var script = document.createElement('script');
			script.onload = function () {
				callbackFn();
			}
			script.src = scriptUrl;
			document.body.appendChild(script);
		},

		// function to set map data
		setMapData: function () {
			var address = sap.ui.getCore().address;
			//	var address = "Mumbai";
			this.getCustLocation(address);

		},
		getCustLocation: function (address) {
			var _self = this;
			var _address = address;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address': _address
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					sap.ui.getCore().latitude = results[0].geometry.location.lat();
					sap.ui.getCore().longitude = results[0].geometry.location.lng();
					var myCenter = new google.maps.LatLng(sap.ui.getCore().latitude, sap.ui.getCore().longitude);
					// return (latitude, longitude);
					// console.log(sap.ui.getCore().latitude, sap.ui.getCore().longitude);
					var mapProp = {
						center: myCenter,
						zoom: 15,
						scrollwheel: true,
						draggable: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(_self.getView().byId("googleMap").getDomRef(), mapProp);
					var marker = new google.maps.Marker({
						position: myCenter
					});
					marker.setMap(map);
				}
			});
		},

		onNavigatePress: function () {
			//window.location.replace("https://www.google.co.in/maps/dir/Mumbai/Bengaluru/");
			//	var map = "https://maps.google.com/?daddr=" + sap.ui.getCore().address;
			var map = "https://www.google.com/maps/search/" + sap.ui.getCore().address;
			window.location.replace(map);
			//window.location.replace("http://maps.google.com");
		},
		onPress: function () {
				//	this.getOwnerComponent().getRouter().navTo("RouteLogin");
				var oRef = this;
				var sRouter = sap.ui.core.UIComponent.getRouterFor(oRef);
				sRouter.navTo("RouteLogin", null, true);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.view.GoogleMap
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.GoogleMap
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.GoogleMap
		 */
		//	onExit: function() {
		//
		//	}

	});

});