
// calculate and set .draggable width

$.fn.draggable_nav_calc = function(options) {
    return this.each( function(i) {
        var $element = $(this);
        if ($element.is(":visible")) {
            // x or y
            if (options.axis === "x") {
                // calculate
                var navWidth = 1;
                $element.find("> *").each( function(i) {
                    navWidth += $(this).outerWidth(true);
                });
                // set width
                var parentWidth = $element.parent().width();
                if (navWidth > parentWidth) {
                    $element.css("width", navWidth);
                } else {
                    $element.css("width", parentWidth);
                }
            } else if (options.axis === "y") {
                // calculate
                var navHeight = 1;
                $element.find("> *").each( function(i) {
                    navHeight += $(this).outerHeight(true);
                });
                // set height
                var parentHeight = $element.parent().width();
                if (navHeight > parentHeight) {
                    $element.css("height", navHeight);
                } else {
                    $element.css("height", parentHeight);
                }
            }
        }
    });
};

// check inside bounds

$.fn.draggable_nav_check = function() {
    return this.each( function(i) {
        var $element = $(this);
        // calculate
        var w = $element.width();
        var pw = $element.parent().width();
        var maxPosLeft = 0;
        if (w > pw) {
            maxPosLeft = - (w - pw);
        }
        var h = $element.height();
        var ph = $element.parent().height();
        var maxPosTop = 0;
        if (h > ph) {
            maxPosTop = h - ph;
        }
        // horizontal
        var left = parseInt($element[0].style.left);
        if (left > 0) {
            $element.css("left", 0);
        } else if (left < maxPosLeft) {
            $element.css("left", maxPosLeft);
        }
        // vertical
        var top = parseInt($element[0].style.top);
        if (top > 0) {
            $element.css("top", 0);
        } else if (top < maxPosTop) {
            $element.css("top", maxPosTop);
        }
    });
};

// init draggable nav

$.fn.draggable_nav = function(options) {
    return this.each( function(i) {
        var $element = $(this);
        // calculate first time, after delay to fix resize bugs
        window.setTimeout( function(e) {
            $element.draggable_nav_calc(options);
        }, 100);
        // on shown tabs recalculate
        $element.find('[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            $element.draggable_nav_calc(options);
        });
        // on resize recalculate
        function draggable_nav_resize_after() {
            clearTimeout($element.data("draggable_nav_timeout"));
            var timeout = window.setTimeout( function(e) {
                $element.draggable_nav_calc(options);
                $element.draggable_nav_check();
            }, 0);
            $element.data("draggable_nav_timeout", timeout);
        }
        $(window).on('resize', draggable_nav_resize_after);
        $(window).on('scroll', draggable_nav_resize_after);
        // center clicked element
        if ($element.hasClass("draggable-center")) {
            $element.find('li a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
                var $container = $(this).parents(".draggable-container");
                var $li = $(this).parents("li");
                if (options.axis === "x") {
                    var left = - $li.position().left + $container.outerWidth() / 2 - $li.outerWidth() / 2;
                    $element.css("left", left);
                } else if (options.axis === "y") {
                    var top = - $li.position().top + $container.outerWidth() / 2 - $li.outerWidth() / 2;
                    $element.css("top", top);
                }
                // put inside bounds
                $element.draggable_nav_check();
            });
        }
    });
};

function initDynamicTab(){
    $(".draggable").draggable_nav({
        axis: 'x' // only horizontally
    });

// jquery ui draggable

    $(".draggable").draggable({
        axis: 'x', // only horizontally
        drag: function(e, ui) {
            var $element = ui.helper;
            // calculate
            var w = $element.width();
            var pw = $element.parent().width();
            var maxPosLeft = 0;
            if (w > pw) {
                maxPosLeft = - (w - pw);
            }
            var h = $element.height();
            var ph = $element.parent().height();
            var maxPosTop = 0;
            if (h > ph) {
                maxPosTop = h - ph;
            }
            // horizontal
            if (ui.position.left > 0) {
                ui.position.left = 0;
            } else if (ui.position.left < maxPosLeft) {
                ui.position.left = maxPosLeft;
            }
            // vertical
            if (ui.position.top > 0) {
                ui.position.top = 0;
            } else if (ui.position.top < maxPosTop) {
                ui.position.top = maxPosTop;
            }
        }
    });
}

initDynamicTab();

// jquey draggable also on touch devices
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices

function touchHandler(e) {
    var touch = e.originalEvent.changedTouches[0];
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[e.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);
    touch.target.dispatchEvent(simulatedEvent);
}
function preventPageScroll(e) {
    e.preventDefault();
}
function initTouchHandler($element) {
    $element.on("touchstart touchmove touchend touchcancel", touchHandler);
    $element.on("touchmove", preventPageScroll);
}
initTouchHandler($(".draggable"));