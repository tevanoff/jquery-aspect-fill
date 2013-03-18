/*
 * jQuery aspectFill plugin, version 0.1
 * 
 * Author:  Todd Evanoff
 * Email:   evanoff@gmail.com 
 * Website: https://github.com/tevanoff/jquery-aspect-fill
 *  
 * Licensed under the MIT license. 
 * http://www.opensource.org/licenses/mit-license.php
 */
;(function($) {

  $.fn.aspectFill = function() {

    WIDTH   = 0;
    HEIGHT  = 1;

    return this.each(function() {
      var img = $(this);
      var parent = findBlockParent(img);

      if(typeof(parent) !== 'undefined') {
        // if the image was cached, the load binding won't happen in time
        // so, bind it once and try to fire it off again to catch cases where it fired earlier
        img.one('load', function() {
          fill(parent, $(this));
        }).each(function() {
          if(this.complete) {
            $(this).trigger('load');
          }

          // fixes IE issue
          this.src = this.src;
        });
      }
    });

    function findBlockParent(img) {
      // finds the first parent that's a block element
      // this assures that we don't try to fill a span or anchor tag surrounding the image
      return img.parents().filter(function() {
        return $(this).css("display") === "block";
      }).first()
    }

    function fill(parent, img) {
      init();
      scaleImage();
      centerImage();
      showImage();

      function init() {
        // stripping previously set size attributes
        // also hiding the contained image so that it doesn't bounce around as we scale and move
        parent.css('overflow', 'hidden');
        img.removeAttr('height').removeAttr('width');
        // filter:alpha for IE8 and earlier
        // clear max-width, like if using bootstrap
        img.css({
          'height':    '',
          'width':     '',
          'max-width': 'none',
          'opacity':   0,
          'filter':    'alpha(opacity=0)'
        });
      }

      function scaleImage() {
        parentSize  = getSize(parent);
        imgSize     = getSize(img);

        if((parentSize[WIDTH] / imgSize[WIDTH]) > (parentSize[HEIGHT] / imgSize[HEIGHT])) {
          // scale to width
          setSize(img, parentSize[WIDTH], 0);
        } else {
          // scale to height
          setSize(img, 0, parentSize[HEIGHT]);
        }
      }

      function centerImage() {
        parentSize  = getSize(parent);
        imgSize     = getSize(img);

        if(imgSize[WIDTH] > parentSize[WIDTH]) {
          // position horizontally
          marginLeft = Math.floor((imgSize[WIDTH] - parentSize[WIDTH]) / 2);
          img.css('margin-left', marginLeft * -1);
        } else if(imgSize[HEIGHT] > parentSize[HEIGHT]) {
          // position vertically
          marginTop = Math.floor((imgSize[HEIGHT] - parentSize[HEIGHT]) / 2);
          img.css('margin-top', marginTop * -1);
        }
      }

      function showImage() {
        img.css({'filter': 'alpha(opacity=1)'});  // < IE8
        img.animate({'opacity': 1}, 300);         // fade in opacity
      }
    }

    function getSize(element) {
      return [element.width(), element.height()];
    }

    function setSize(img, width, height) {
      // set the image size attributes and the style attributes 
      // in case there's an auto set for height/width in a css file somewhere
      if(width > 0) {
        img.attr('width', width);
        img.css('width', width);
      }

      if(height > 0) {
        img.attr('height', height);
        img.css('height', height);
      }
    }
  };
})(jQuery);