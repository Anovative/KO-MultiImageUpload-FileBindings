/**
 * Overriding the 'fileInput.update( ... )' & 'fileDrag.update( ... )'  functions from the knockout-file-bindings.js library
 */
(function () {
	
	ko.bindingHandlers.fileInput.update = function (element, valueAccessor, allBindingsAccessor) {

		var fileData = ko.utils.unwrapObservable(valueAccessor());
		var file = ko.isObservable(fileData.file) && fileData.file();

		//WR => DEBUGGING --- START ------------------------------------------------------------------------------------------------------------------------------
		if (file)
		{
			var files = element.files,
					images = Object.keys(files).map(function (k) { return files[k]; });
			if (images && images.length > 0)
			{
				console.log('ko.bindingHandlers.fileInput.update( ... ) => Added a new image from "ko.isObservable(fileData.file) && fileData.file()": Single image only -- "element.files": All Images');
				images.forEach(function (img) {
					console.log('File Chooser => NAME: ' + img.name + '  --  SIZE: ' + img.size + '  --  TYPE: '  + img.type);
				});
			}
		}
		else
		{
			console.log('ko.bindingHandlers.fileInput.update( ... ) => `!file` so we must be clearing the image(s) or the first load!');
		}
		//WR => DEBUGGING --- END -------------------------------------------------------------------------------------------------------------------------------------

		if (fileData.objectURL && ko.isObservable(fileData.objectURL)) 
		{
			var newUrl = file && windowURL.createObjectURL(file);

			if (newUrl) 
			{
				var oldUrl = fileData.objectURL();

				if (oldUrl) {
					windowURL.revokeObjectURL(oldUrl);
				}

				fileData.objectURL(newUrl);
			}
		}

		if (fileData.base64String && ko.isObservable(fileData.base64String)) 
		{
			if (fileData.dataURL && ko.isObservable(fileData.dataURL)) 
			{
				// will be handled
			}
			else 
			{
				fileData.dataURL = ko.observable(); // hack
				//WR => Could `fileData.dataURL` be a `ko.observableArray([])` ??? 
			}
		}

		var properties = ['binaryString', 'text', 'dataURL', 'arrayBuffer'];
		properties.forEach(function (property) {
			var method = 'readAs' + (property.substr(0, 1).toUpperCase() + property.substr(1));

			if (property != 'dataURL' && !(fileData[property] && ko.isObservable(fileData[property]))) {
				return true;
			}

			if (!file) {
				return true;
			}

			var reader = new FileReader();
			reader.onload = function (e) {
				if (fileData[property]) {
					fileData[property](e.target.result); //WR => This is where the image is actually shown or updated due to adding the 'fileData[dataURL]' to the IMG element 
				}

				if (method == 'readAsDataURL' && fileData.base64String && ko.isObservable(fileData.base64String)) 
				{
					var resultParts = e.target.result.split(",");

					if (resultParts.length === 2) {
						fileData.base64String(resultParts[1]);
					}
				}
			}; // END =>  reader.onload ( ... )

			reader[method](file);
		}); // END => [].forEach( ... )
	}; // END => update: function (element, valueAccessor, allBindingsAccessor)

	ko.bindingHandlers.fileDrag.update = function (element, valueAccessor, allBindingsAccessor) {

		var fileData = ko.utils.unwrapObservable(valueAccessor()) || {};

		if (!$(element).data("fileDragInjected")) 
		{
			element.classList.add('filedrag');

			element.ondragover = element.ondragleave = element.ondrop = function (e) {

				e.stopPropagation();
				e.preventDefault();

				if(e.type == 'dragover')
				{
					element.classList.add('hover');
				}
				else 
				{
					element.classList.remove('hover');
				}

				if (e.type == 'drop' && e.dataTransfer) 
				{
					var files = e.dataTransfer.files; //WR => TODO: Look into if I can collect multiple files drag n' dropped all at once and set to....
					var file = files[0]; //WR => ...file(s) and grab all  e.dataTransfer.files and not just the first index.... DO IT!!!

					var images = Object.keys(files).map(function (k) { return files[k]; });
					if (images && images.length > 0)
					{
					    images.forEach(function (img) {
					        console.log('Drag n Drop => NAME: ' + img.name + '  --  SIZE: ' + img.size + '  --  TYPE: '  + img.type);
					    });
					}

					if (file) 
					{
						fileData.file(file);
						if (ko.isObservable(valueAccessor())) {
							valueAccessor()(fileData);
						}
					}
				}
			}; // END => element.ondragover = element.ondragleave = element.ondrop

			$(element).data("fileDragInjected", true);
		}
	}; // END => update: function (element, valueAccessor, allBindingsAccessor)

	// ko.bindingHandlers.customFileInput.update = function (element, valueAccessor, allBindingsAccessor) {
			// NOT SURE IF THIS WILL NEED TO BE OVERRIDDEN ???
	// };

})();