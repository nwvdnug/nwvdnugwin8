// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
	"use strict";

	WinJS.UI.Pages.define("/pages/details/details.html", {
		// This function is called whenever a user navigates to this page. It
		// populates the page elements with the app's data.
		ready: function (element, options) {
			// TODO: Initialize the page here.
			var meetingInfo = nwvdnugApp.MeetingList.getAt(nwvdnugApp.detailIndex);
			var meetingDiv = document.getElementById("meetingInfoDiv");
			
			WinJS.Binding.processAll(meetingDiv, meetingInfo);
		},

		unload: function () {
			// TODO: Respond to navigations away from this page.
		},

		updateLayout: function (element, viewState, lastViewState) {
			/// <param name="element" domElement="true" />

			// TODO: Respond to changes in viewState.
		}
	});
})();
