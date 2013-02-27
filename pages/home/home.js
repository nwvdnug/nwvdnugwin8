(function () {
    "use strict";

    var meetingsList = new WinJS.Binding.List();
    var publicMembers = { MeetingList: meetingsList };
    WinJS.Namespace.define("nwvdnugApp", publicMembers);

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var app = WinJS.Application;

            var list = new WinJS.Binding.List();
            // Call xhr for the URL to get results asynchronously
            var xhr = WinJS.xhr(
                {
                    url: "http://www.nwvdnug.org/api/upcomingmeetings/"
                });

            xhr.done(function (response) {
                var listData = JSON.parse(response.responseText);
                // Retrieve the control template
                listData.forEach(function(listItem) {
                    // Bind the current person to the HTML elements in the section
                    nwvdnugApp.MeetingList.push(listItem);
                });
            }, function(err) {
                //handle error cases
                var msg = "undefined error";
                if (err) {
                    msg = err.detail;
                    if (!(msg && msg.message))
                        msg = err.message || "err type unknown";
                }

                var errorObj = {
                    Title: 'Error',
                    Notes: 'An error occured while fetching information. Please verify network connection and restart application.'
                        + '\r\n\r\n' + msg,
                    MeetingStartTime: '',
                    Location: '',
                    SpeakerName: '',
                    SpeakerBioLink: ''
                };
                nwvdnugApp.MeetingList.push(errorObj);
            });
        }
    });
})();
