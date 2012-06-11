  
    (function($){
      $.fn.imageScramble = function(options){
        var defaults = {
          image_width   : 100,
          image_height  : 100,
          padding       : 5,
          color_divs    : true,
          colors        : ['yellow','green', 'orange', 'blue', 'red', 'brown']
        };
 
        //call in the default otions
        var options = $.extend(defaults, options);
     
        return this.each(function() {
          
          var $image_wrapper = $(this);
          var $image_wrapper_elements = $image_wrapper.children();
          var num_images = options.images.length;
          var window_width = $(window).width();
          var window_height = $(window).height();
          var counter = 0;
          
          var num_images_per_row = $image_wrapper.width() / options.image_width;
          num_images_per_row = num_images_per_row.toFixed();
          
          //TODO test this rounding logic - redo this
          var num_rows = num_images / num_images_per_row;
          num_rows = num_rows.toFixed();

          init();
          init_events();
          

      /****************************************
      *
      ****************************************/
      function init(){

          append_images();
          
          if(options.color_divs){
            slide_images_in(slide_colors_in);
          }
          else{
            slide_images_in();
          }

      }
          
      /****************************************
      *
      ****************************************/
      function init_events(){
        $image_wrapper.find('.color-slide').hover(
          function(){
            $(this).animate({opacity:0}, 200);
          },
          function(){
            $(this).animate({opacity:0.35}, 200);
          }
        );
      }

      /****************************************
      *
      ****************************************/      
      function slide_images_in(callback){
        //slide images in
        
        var count = 0;
        var cur_row = 0;
        var cur_col = 0;
        
        $.each($image_wrapper.find('img'), 
            function(){
              var that = $(this);
              
             if(count % num_images_per_row === 0){
                cur_row++;
                cur_col = 0;
              }
              slide(that, cur_col, cur_row - 1, random_int(250, 750));
              
              

              
              cur_col++;
              count++;
            }
        );
        setTimeout(function(){
          (typeof callback === "undefined") ? '' : callback();
        }, 650);
        
      }     

      /****************************************
      *
      ****************************************/
      function slide_colors_in(){
        var count = 0;
        var cur_row = 0;
        var cur_col = 0;
        
         $.each($image_wrapper.find('div.color-slide'), 
            function(){
              var that = $(this);
            
             if(count % num_images_per_row === 0){
                cur_row++;
                cur_col = 0;
              }
              
              slide(that, cur_col, cur_row - 1, random_int(250,500));
              
              cur_col++;
              count++;
            }
        );      
      }
      
      /****************************************
      * append images
      ****************************************/
      function append_images(){
        
        var position = "";
        var top_position = "";
        var count = 0;
        
        //Insert images and color divs onto page
        $.each(options.images,function(){

            horz_position = position_horz(count);
            vert_position = position_vert(count);
            
            
            var img = '<img style="position:absolute; z-index: 1; width:'+ (options.image_width * 10) +'px; height:' + (options.image_height * 10) + 'px;top:' + vert_position +'; left:' + horz_position +'" src="'+ this + '"/>';
            var color_div = '<div style="position:absolute; z-index: 2; opacity:0.5; width:'+ (options.image_width * 10) +'px; height:' + (options.image_height * 10) + 'px;top:' + vert_position +'; left:' + horz_position + '; background:'+ options.colors[actual_random_int(1,5)] +'" class="color-slide"></div>';

          
          $image_wrapper.append(img);
          
          if(options.color_divs === true){
            $image_wrapper.append(color_div);
          }
          
          count++;
        });
      }
      
      /****************************************
      * actually returns a float
      ****************************************/   
      function random_int(min, max){
        return Math.random() * (max - min) + min;
      }
      
      /****************************************
      * really returns an integer
      ****************************************/   
      function actual_random_int(min, max){
        var num = Math.random() * (max - min) + min;
        return num.toFixed();
      }
      
      /****************************************
      *
      ****************************************/
      function slide(image, index, row, anim_length){
        setTimeout(function(){
          $(image).animate({
            left: index * options.image_width,
            top : options.image_height * row,
            height: options.image_height - options.padding,
            width:  options.image_width - options.padding
          }, anim_length);
        }, random_int(250, 1000));
      }
      
      /****************************************
      *
      ****************************************/
      function slide_delay(element){
          var element_index = $(element).index('img');
          
          setTimeout(function(){
            slide($(element), element_index, 300 * element_index );
          }, 250 * element_index);
        }
        
        //TODO these next two could be combined
      /****************************************
      *
      ****************************************/
        function position_horz(counter){
          if(counter % 2 === 0){
              return '-' + (window_width + random_int(50, 1000))+ 'px';
            }
            else{
              return (window_width + random_int(50, 1000)) + 'px';
            }
        }
        
      /****************************************
      *
      ****************************************/
        function position_vert(counter){
          if(counter % 2 === 0){
              return '-' + (random_int(250, 1000)) + 'px';
            }
            else{
              return '-' + (random_int(250, 1000)) + 'px';
            }
        }
      
        });
      }
    })(jQuery);
    