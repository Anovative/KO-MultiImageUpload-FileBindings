(function (global) {
	global.ImagesViewModel = function () {
		var self = this;

		// Observables
		self.images = ko.observableArray([]);
		// self.images.extend({ notify: 'always' }); // In the case the value(s) of  'images' changes I still want to be notified even if they are the same value(s)

		self.fileData = ko.observable({
			dataURL: ko.observable()
		});

		// Computeds
		self.onClear = function (fileData) {
			if (confirm('Remove the images?'))
			{
				images = ko.observableArray([]);
				fileData.clear && fileData.clear();
			}
		};

		self.debug = function () {
			// global.ImagesViewModel = ImagesViewModel;
			console.log(ko.toJSON(ImagesViewModel));
		};

		// Functions

	};

	$(document).ready(function () {
		// ko.applyBindings(ImagesViewModel, global.document.getElementById('container'));
		ko.applyBindings(ImagesViewModel);
	});
}) (window);