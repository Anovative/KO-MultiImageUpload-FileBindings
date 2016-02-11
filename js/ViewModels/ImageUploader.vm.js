$(function () {
    var viewModel = {};
    viewModel.fileData = ko.observable({
        dataURL: ko.observable()
    });
    viewModel.onClear = function (fileData) {
        if (confirm('Are you sure?'))
            fileData.clear && fileData.clear();
    };
    viewModel.debug = function () {
        window.viewModel = viewModel;
        console.log(ko.toJSON(viewModel));
    };
    ko.applyBindings(viewModel);
});