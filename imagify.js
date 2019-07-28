$.fn.imagify = function (opts) {

    let elms = this;


    $.each(elms, function (i, v) {
        let elm = $(v);
        let input = $.fn.imagify.uuid();
        let preview = $.fn.imagify.uuid();
        let imageLabel = $.fn.imagify.uuid();

        // Options + Defaults
        let options = $.extend({
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

            showThumb: true,
            feedElement: true,
            chooseText: "Choose Image",
            changeFileText: "Change Image",
            showImageLabel: true,

            onInit: null,
            onSuccess: null,
            onError: null,
            onDimensionError: null,
            onMinSizeError: null,
            onMaxSizeError: null,
            onAllowedExtError: null
        }, opts);


        elm.html(`<div class="image-preview" id="${preview}" style="${options.style}"><label for="image-input" id="${imageLabel}" class="image-label">${options.chooseText}</label><input type="file" id="${input}" name="image" class="image-input" /></div>`);

        //clean for initial
        if (elm.attr('data-src')) {
            elm.removeAttr('data-src');
        }

        let inputId = '#' + input;
        let previewId = '#' + preview;
        let imageLabelId = '#' + imageLabel;

        // Check if FileReader is available
        if (window.File && window.FileList && window.FileReader) {
            if (typeof ($(inputId)) !== 'undefined' && $(inputId) !== null) {

                if (options.onInit) {
                    options.onInit(elm);
                }

                $(document).on('change', inputId, function () {
                    let files = this.files;

                    if (files.length > 0) {
                        let file = files[0];

                        //check max size
                        if (file.size > options.maxSize * 1024 * 1024) {
                            if (options.onMaxSizeError) {
                                options.onMaxSizeError(file);
                            }

                            if (options.onError) {
                                options.onError($.fn.imagify.MAX_SIZE_ERROR);
                            } else {
                                console.error(options.maxSizeErrorMessage);
                            }

                            return false;
                        }

                        //check min size
                        if (file.size < options.minSize * 1024 * 1024) {
                            if (options.onMinSizeError) {
                                options.onMinSizeError(file);
                            }

                            if (options.onError) {
                                options.onError($.fn.imagify.MIN_SIZE_ERROR);
                            } else {
                                console.error(options.minSizeErrorMessage);
                            }

                            return false;
                        }

                        let img = new Image();
                        let reader = new FileReader();

                        reader.addEventListener("load", function (event) {
                            let loadedFile = event.target;
                            let extResult = false;

                            img.src = loadedFile.result;


                            img.onload = function () {
                                let exts = options.allowedExt.split(' ');
                                $.each(exts, function (i, v) {
                                    if (file.type.match(v)) {
                                        extResult = true;
                                        return false;
                                    }
                                });

                                //check ext
                                if (!extResult) {
                                    if (options.onAllowedExtError) {
                                        options.onAllowedExtError(file);
                                    }

                                    if (options.onError) {
                                        options.onError($.fn.imagify.ALLOWED_EXT_ERROR);
                                    } else {
                                        console.error(options.allowedExtErrorMessage);
                                    }

                                    return false;
                                }

                                //check dimension
                                if (img.width > options.maxWidth || img.height > options.maxHeight || img.width < options.minWidth || img.height < options.minHeight) {
                                    if (options.onDimensionError) {
                                        options.onDimensionError(file);
                                    }

                                    if (options.onError) {
                                        options.onError($.fn.imagify.DIMENSION_ERROR);
                                    } else {
                                        console.error(options.dimensionErrorMessage);
                                    }
                                    return false;
                                }

                                if (options.feedElement) {
                                    elm.attr('data-src', loadedFile.result);
                                }

                                if (options.showThumb) {
                                    $(previewId).css("background-image", "url(" + loadedFile.result + ")");
                                    $(previewId).css("background-size", "cover");
                                    $(previewId).css("background-position", "center center");
                                }

                                if (options.onSuccess) {
                                    options.onSuccess($(elm[0]), loadedFile.result, $(previewId));
                                }

                                if (options.showImageLabel && options.showThumb) {
                                    $(imageLabelId).html(options.changeFileText);
                                }

                            };

                        });

                        //trigger
                        reader.readAsDataURL(file);
                        $.fn.imagify.clean(inputId);

                    } else {
                        if (options.showImageLabel) {
                            // Change imageLabel
                            $(imageLabelId).html(options.chooseText);
                        }
                        // Clear background
                        $(previewId).css("background-image", "none");
                    }
                });
            }
        } else {
            alert("You need a browser with file reader support !");
            return false;
        }

    });

};

$.fn.imagify.MAX_SIZE_ERROR = 1;
$.fn.imagify.DIMENSION_ERROR = 2;
$.fn.imagify.MIN_SIZE_ERROR = 3;
$.fn.imagify.ALLOWED_EXT_ERROR = 4;


$.fn.imagify.uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

$.fn.imagify.clean = function (inputId, selfId) {
    $(inputId).val(null);

};
