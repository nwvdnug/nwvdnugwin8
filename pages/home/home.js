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
            // Call xhr for the URL to get results asynchronously
            var xhr = WinJS.xhr(
                {
                    url: "http://www.nwvdnug.org/api/upcomingmeetings/"
                });

            xhr.done(function (response) {
                var listData = JSON.parse(response.responseText);
                // Retrieve the control template
                if (listData.length == 0) {
                    var emptyDataListItem = {
                        Title: 'No meetings returned from service.',
                        MeetingStartTime: '',
                        Location: '',
                        SpeakerName: '',
                        SpeakerBioLink: '',
                        Notes: 'No meeting information was obtained from the server. Please check back later for new meeting information to be released.'
                    };
                    nwvdnugApp.MeetingList.push(emptyDataListItem);
                } else {
                    listData.forEach(function(listItem) {
                        // Bind the current person to the HTML elements in the section
                        nwvdnugApp.MeetingList.push(listItem);
                    });
                }
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

    function handleResize(eventArgs) {
        var isSnapped = (Windows.UI.ViewManagement.ApplicationView.value ===
    Windows.UI.ViewManagement.ApplicationViewState.snapped);
        meetingListDiv.layout = isSnapped ? new WinJS.UI.ListLayout() : new WinJS.UI.GridLayout();
    }

    window.addEventListener("resize", handleResize);
})();
