;(function($){

  "use strict"; 
  
  var Scramble = function(element, options){
    this.$el = $(element)
    this.settings = $.extend({}, $.fn.imageScramble.defaults, options)    
    this.init()
    this.events()
  }
  
  Scramble.prototype = {
    
    constructor: Scramble,
    
    init: function(){
      var base = this;
        
      base.num_images = base.settings.images.length;
      base.num_images_per_row = (base.$el.width() / base.settings.image_width).toFixed();
      base.append_images();
      
      if(base.settings.color_divs){
        base.slideImagesIn(base.slideColorsIn);
      }
      else{
        base.slideImagesIn();
      }      
    },
    
    events: function(){
      var 
        base = this;
        
      base.$el.find('.color-slide').hover(
        function(){
          $(this).animate({opacity:0}, 200);
        },
        function(){
          $(this).animate({opacity:0.35}, 200);
        }
      );
    },
    
    slideImagesIn: function(callback){
      var 
        base = this,
        count = 0,
        cur_row = 0,
        cur_col = 0;
        
      
      $.each(base.$el.find('img'), 
          function(){
            var $cur_img = $(this);
              
              
           if(count % base.num_images_per_row === 0){
              cur_row++;
              cur_col = 0;
            }
            base.slide($cur_img, cur_col, cur_row - 1, base.random_int(250, 750));
            cur_col++;
            count++;
          }
      );
      setTimeout(function(){
        (typeof callback === "undefined") ? '' : callback(base,base.$el);
      }, 650);  
    },
    
    slideColorsIn: function(base,$element){
      var 
        count = 0,
        cur_row = 0,
        cur_col = 0;
    
     $.each($element.find('div.color-slide'),
        function(){
          var $cur_color_slide = $(this);
        
         if(count % base.num_images_per_row === 0){
            cur_row++;
            cur_col = 0;
          }
          
          base.slide($cur_color_slide, cur_col, cur_row - 1, base.random_int(250,500));
          
          cur_col++;
          count++;
        }
      );      
    },
    
    append_images: function(){
      var 
        base = this,
        position = "",
        top_position = "",
        count = 0;
      
      //Insert images and color divs onto page
      $.each(base.settings.images,function(){

          var horz_position = base.position_horz(count),
            vert_position = base.position_vert(count);
          
          var img = '<img style="position:absolute; z-index: 1; width:'+ (base.settings.image_width * 10) +'px; height:' + (base.settings.image_height * 10) + 'px;top:' + vert_position +'; left:' + horz_position +'" src="'+ this + '"/>';
          var color_div = '<div style="position:absolute; z-index: 2; opacity:0.5; width:'+ (base.settings.image_width * 10) +'px; height:' + (base.settings.image_height * 10) + 'px;top:' + vert_position +'; left:' + horz_position + '; background:'+ base.settings.colors[base.actual_random_int(1,5)] +'" class="color-slide"></div>';    
        base.$el.append(img);
        
        if(base.settings.color_divs === true){
          base.$el.append(color_div);
        }
        count++;
      });
      
    },
  
    slide: function(image, index, row, anim_length){
      var 
        base = this;
        
      setTimeout(function(){
        $(image).animate({
          left: index * base.settings.image_width,
          top : base.settings.image_height * row,
          height: base.settings.image_height - base.settings.padding,
          width:  base.settings.image_width - base.settings.padding
        }, anim_length);
      }, base.random_int(50, 300));
    },
    
    slide_delay: function(element){
      var 
        element_index = $(element).index('img');
      
      setTimeout(function(){
        slide($(element), element_index, 50 * element_index );
      }, 150 * element_index);
    },
    
    position_vert: function(counter){
      var 
        base = this;
        
      if(counter % 2 === 0){
          return '-' + (base.random_int(250, 1000)) + 'px';
        }
        else{
          return '-' + (base.random_int(250, 1000)) + 'px';
        }
    },
    position_horz: function(counter){
      var 
        base = this;
        
      if(counter % 2 === 0){
          return '-' + ($(window).width() + base.random_int(50, 1000))+ 'px';
        }
        else{
          return ($(window).width() + base.random_int(50, 1000)) + 'px';
        }
    },
    
    //returns float  
    random_int: function(min, max){ return Math.random() * (max - min) + min; },
    
    //really returns int
    actual_random_int: function(min, max){
      var num = Math.random() * (max - min) + min;
      return num.toFixed();
    },
    
  } //end prototype functions
  
  
 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.imageScramble = function (option) {
    return this.each(function () {
      var 
        $this = $(this),
        options = typeof option == 'object' && option,
        d = new Scramble(this, options);
    });
  }

  $.fn.imageScramble.defaults = {
    image_width   : 100,
    image_height  : 100,
    padding       : 5,
    color_divs    : true,
    colors        : ['yellow','green', 'orange', 'blue', 'red', 'brown']
  }

  $.fn.imageScramble.Constructor = Scramble
  
})(window.jQuery);
