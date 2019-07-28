# Imagify
Imagify simplifies your image upload process, does not tire you.

**Installation**

Add  JQuery and Imagify source files.

```css
 <link href="https://cdn.jsdelivr.net/gh/soysaltan/imagify@latest/imagify.min.css" rel="stylesheet">
```

```javascript
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="https://cdn.jsdelivr.net/gh/soysaltan/imagify@latest/imagify.min.js"></script>
```

... and you are ready to go.


```html
<div id="test"></div>
```

```javascript
$('#test").imagify();
```


# EVENTS 

 **onInit** (*elm*): 
------------

 This event runs the first time the imafigy element is called and and rotates back ***the rendered element* ** itself.
 
 *Example*  : 
* Background color becomes red when the div element is rendered with imagify.

```html
<div id="test"></div>
```

```javascript
$('#test").imagify({
            onInit: function (elm) {
             	elm.css("background-color","red");  
});
```
 onSuccess: 
------------
The rendered element has been attributed with*** data-src* ** key
 
 *Example*  : 
* Log the selected image's base64 code.

```javascript
$('#test").imagify({
            onSuccess: function (elm, source) {
             console.log( $("#test").attr("data-src") );
});
```
elm : The rendered element
source  : Base64 code of the selected image

 onError: 
------------
Returns the *errorId*  information for the error.

 *Example*  : 
* Background color becomes red when the div element is rendered with imagify.

```javascript
$('#test").imagify({
            onError: function (errorId) {
             if (errorId==$.fn.imagify.ALLOWED_EXT_ERROR) {
			 	alert('This extension is not supported !')
			 }
});
```
errorId  : The error id of the error information.
It could be : 
```javascript
MAX_SIZE_ERROR = 1;
DIMENSION_ERROR = 2;
MIN_SIZE_ERROR = 3;
ALLOWED_EXT_ERROR = 4;
```

 onDimensionError: 
------------
Fires when image dimension error occurred.

 *Example*  : 

* Fire the dimension error when the specified attributes in the html.

```html
  <div id="test" data-max-width="640" data-max-height="960" data-min-width="640" data-min-height="960"></div>
```

```javascript
$('#test").imagify({
            onDimensionError: function (file) {
			 	alert('Dimension error !')
});
```

or you can specify the attributes in the javascript side.Dimensions in px.
```javascript
$('#test").imagify({
			maxWidth:  2000,
			minWidth:  1,
 		   maxHeight:  3000,
			minHeight:  1,
            onDimensionError: function (file) {
			 	alert('Dimension error !')
});
```


file  : The selected image file element.


 onMinSizeError: 
------------
Fires when minimum image size error occurred.

 *Example*  : 

* Fire the minimum image size error when the specified attributes in the html.

```html
 <div id="test" data-max-file-size="5" data-min-file-size="1"></div>
```
```javascript
$('#test").imagify({
            onMinSizeError: function (file) {
			 	alert('Min size error !')
});
```

 onMaxSizeError: 
------------
Fires when maximum image size error occurred.

 *Example*  : 

* Fire the maximum size error when the specified attributes in the html.

```html
 <div id="test" data-max-file-size="5" data-min-file-size="1"></div>
```
```javascript
$('#test").imagify({
            onMaxSizeError: function (file) {
			 	alert('Max size error !')
});
```

 onAllowedExtError: 
------------
Fires when image extension error occurred.

 *Example*  : 

* Fire the image extension error when the specified attributes in the html.

```html
 <div id="test"    data-allowed-file-extensions="png jpg jpeg"></div>
```

```javascript
$('#test").imagify({
            onAllowedExtError: function (file) {
			 	alert('This extension is not allowed. Just available for Png, Jpg or Jpeg !')
});
```
### Default options  :
```javascript
style: 'border: 1px solid #ccc;',
minSize: elm.attr('data-min-file-size') || 0,
maxSize: elm.attr('data-max-file-size') || 1,
maxSizeErrorMessage: 'Imagify : Max size error !',
minSizeErrorMessage: 'Imagify : Min size error !',

maxWidth: elm.attr('data-max-width') || 2000,
minWidth: elm.attr('data-min-width') || 1,
maxHeight: elm.attr('data-max-height') || 3000,
minHeight: elm.attr('data-min-height') || 1,
dimensionErrorMessage: 'Imagify : Dimension error',

allowedExt: elm.attr('data-allowed-file-extensions') || 'jpg jpeg png',
allowedExtErrorMessage: 'Imagify : Not allowed image extension !',

showThumb: true, // show preview image
feedElement: true, // add the 'data-src' attribute to the element
chooseText: "Choose Image",
changeFileText: "Change Image",
showImageLabel: true
```
