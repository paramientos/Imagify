# Imagify
Imagify simplifies your image upload process, does not tire you.

**style**: 'border: 1px solid #ccc;',

            **minSize**: elm.attr('data-min-file-size') || 0,
            **maxSize**: elm.attr('data-max-file-size') || 1,
            **maxSizeErrorMessage**: 'Imagify : Max size error !',
            **minSizeErrorMessage**: 'Imagify : Min size error !',

            **maxWidth**: elm.attr('data-max-width') || 2000,
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
