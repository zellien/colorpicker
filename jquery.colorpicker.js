/**
 * Created by zellien on 01.10.2015.
 */
(function ($) {

    $.fn.colorPicker = function (options) {

        var params = $.extend({
            offset      : 5,
            colors      : {
                "#9DC3D4": "Aquamarine",
                "#00ABC0": "Scuba Blue",
                "#7ACCB8": "Beveled Glass",
                "#0F4C81": "Classic Blue",
                "#D2B49C": "Toasted Almond",
                "#E78B90": "Strawberry Ice",
                "#F88F58": "Tangerine",
                "#E5D68E": "Custard",
                "#964F4C": "Marsala",
                "#C5C6C7": "Glacier Gray",
                "#7BA0C0": "Dusk Blue",
                "#476A30": "Treetop",
                "#7B7F32": "Woodbine",
                "#C48A69": "Sandstone",
                "#807D7F": "Titanium",
                "#B18EAA": "Lavender Herb"
            },
            activeClass : "color-picker-active",
            handlerClass: "color-picker-handler",
            optionClass : "color-picker-option",
            paletteClass: "color-picker-palette",
            wrapperClass: "color-picker-wrapper"
        }, options);

        var $wrapper = $(document.createElement("div")).addClass(params.wrapperClass),
            $element = $(this).wrap($wrapper),
            $handler = $(document.createElement("div")).addClass(params.handlerClass),
            $palette = $(document.createElement("div")).addClass(params.paletteClass),
            timeOut;

        $palette.insertAfter($element);
        $handler.insertAfter($element);
        $handler.css({
            left      : $element.position().left + $element.outerWidth() - $handler.outerWidth() + "px",
            top       : $element.position().top + ($element.outerHeight() / 2) - ($handler.outerHeight() / 2) + "px",
            visibility: "visible"
        });

        $handler.on({
            click: function () {
                $palette.fadeIn(150);
                $palette.css({
                    left      : $handler.position().left + ($handler.outerWidth() / 2) - ($palette.outerWidth() / 2) + "px",
                    top       : $handler.position().top - $palette.outerHeight() - parseInt(params.offset) + "px",
                    visibility: "visible"
                });
            }
        });

        $palette.on({
            mouseleave: function () {
                clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    $palette.fadeOut(150);
                }, 2500);
            },
            mouseover : function () {
                clearTimeout(timeOut);
            }
        });

        $.each(params.colors, function (color, title) {
            var $option = $(document.createElement("span"));
            $option.addClass(params.optionClass);
            $option.css("background-color", color);
            $option.attr("title", title);
            $option.appendTo($palette);
            $option.on("click", function () {
                $element.val(color);
                $palette.fadeOut(150);
                $(this).addClass(params.activeClass);
                $(this).siblings("." + params.activeClass).removeClass(params.activeClass);
            });
            $element.val() == color && $option.addClass(params.activeClass);
        });

    }

})(jQuery);
