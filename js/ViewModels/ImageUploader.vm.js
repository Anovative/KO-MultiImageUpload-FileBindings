$(function () {
     var viewModel = {};
    // var viewModel = {
    //     // fileData, // ***** Gets added in later *****
    //     images = ko.observableArray([])
    // };

    viewModel.fileData = ko.observable({
        dataURL: ko.observable()
        // base64String: ko.observable(),
    });

    // viewModel.fileData.subscribe(function () {
        
    // });

    viewModel.onClear = function (fileData) {
        if (confirm('Are you sure?'))
            fileData.clear && fileData.clear();
    };

    viewModel.debug = function () {
        window.viewModel = viewModel;
        console.log(ko.toJSON(viewModel));
        //debugger; 
    };

    ko.applyBindings(viewModel);
});