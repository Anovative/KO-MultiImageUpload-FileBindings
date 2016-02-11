$(function () {
 	var ImageUploaderViewModel = {};

   	ImageUploaderViewModel.fileData = ko.observable({ dataURL: ko.observable() });

	ImageUploaderViewModel.onClear = function (fileData) {
		if (confirm('Are you sure?'))
			fileData.clear && fileData.clear();
	};

	ImageUploaderViewModel.debug = function () {
	    window.ImageUploaderViewModel = ImageUploaderViewModel;
	    console.log(ko.toJSON(ImageUploaderViewModel));
	};

	ko.applyBindings(ImageUploaderViewModel);
});