$(document).ready(function() {
  // $('.flickity-prev-next-button').find('svg').attr('viewBox', '0 0 0 0');
  if($(window).width() <= 730) {
    $('.sidenav').addClass('d-none');
    $('.container_home').addClass('extend-container');
  }
  $('body').on('click', '.wave', function(e) {
		e.preventDefault();
    let thisEvent = this;
		let $waveElement = $('<span class="wave-effect" />'),
			$buttonElement = $(this),
			btnOffset = $buttonElement.offset(),
			xPos = e.pageX - btnOffset.left,
			yPos = e.pageY - btnOffset.top,
			size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
			animateSize = parseInt(Math.max($buttonElement.height(), $buttonElement.width()) * Math.PI);
			
		$waveElement.css({
			top: yPos,
			left: xPos,
			width: size,
			height: size,
			backgroundColor: $buttonElement.data('wave-color')
		})
		.appendTo($buttonElement)
		.animate({
			width: animateSize,
			height: animateSize,
			opacity: 0
		}, 500, function() {
      $(this).remove();
      location.href = thisEvent.href;
		});
  });
  function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
  }
  if(!isMobile()) {
    tippy('.tooltip_auto', {
      placement: 'bottom',
      allowHTML: true,
      animation: 'fade',
      theme: 'dark',
      arrow: '<br>'
    });
  }
  $('body').on('click', '.search-title', function() {
      setTimeout(() => {
        $(this).replaceWith(`<div class="form-search">
    <input class="inputSearch" type="text" placeholder="Buscar película o serie">
    <button class="close-search wave"><i class="fas fa-times"></i></button>
  </div>`);
    $('.inputSearch').focus();
      }, 100);
  });
  $('body').on('click', '.close-search', function() {
    setTimeout(()=> {
      $(this).parent().replaceWith(`<a class="search-title wave" href="#">
    <i class="fas fa-search"></i>
  </a>`);
    }, 100);
  });
  $('.btnMoreVideos').on('click', function() {
    location.href = '/peliculas/pages/1';
  });
  
  $('.navbar-bars').on('click', function() {
    $('.sidenav').toggleClass('d-none');
    if($(window).width() > 730) {
      $('.container_home').toggleClass('extend-container');
    }
    
    
  });
  if($(window).width() <= 730) {
    $(document).on("click.sidenav",function(event) {
      var target = $(event.target);   
      // console.log($('.grab_audio').hasClass('d-none'));
      if(!$('.sidenav').hasClass('d-none')) {
        if (!target.closest(".sidenav").length && !target.closest(".navbar-bars").length) {
          // closeMenu(function() {
          //     $(document).off("click.grab_audio");
          // });
          $('.sidenav').addClass('d-none');
        }      
      }
    });
  }
 if(numberPages) {
  let numVeriPages = 0;
  $('#pagination_container').twbsPagination({
    totalPages: numberPages,
    visiblePages: 4,
    startPage: parseInt(currentPage),
    prev: '<span aria-hidden="true">&laquo;</span>',
    next: '<span aria-hidden="true">&raquo;</span>',
    onPageClick: function (event, page) {
      numVeriPages ++;

      
      if(numVeriPages > 1) {
          location.href = `/peliculas/pages/${page}`;
      }       
    }
});
 }
// $('.active').removeClass('active');
// $('.next,.last,.prev,.first').removeClass('disabled');
// if(currentPage ==  numberPages) {
//   $('.next,.last').addClass('disabled');
// }
// if(currentPage == 1) {
//   $('.prev,.first').addClass('disabled');
// }
// $('.page-item:not(.prev,.first,.next,.last)').eq(currentPage - 1).addClass('active');
});
window.addEventListener('load', function() {
  if($('.carousel')[0]) {
    new Glider(document.querySelector('.carousel__lista'), {
      slidesToShow: 3,
      slidesToScroll: 3,
      draggable: true,
      dots: '.carousel__indicadores',
      arrows: {
        prev: '.carousel__anterior',
        next: '.carousel__siguiente'
      },
      responsive: [
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }, {
          breakpoint: 167,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }, {
          breakpoint: 167*2,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }, {
          breakpoint: 167*3,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }, {
          breakpoint: 167*4,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        }
        , {
          breakpoint: 167*5,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        }, {
          breakpoint: 167*6,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          }
        }, {
          breakpoint: 167*7,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
          }
        }, {
          breakpoint: 167*8,
          settings: {
            slidesToShow: 9,
            slidesToScroll: 9,
          }
        }
      ]
    });
  }
  function loaderImgs() {
    var bLazy = new Blazy({
      breakpoints: [{
        width: 154, // max-width,
        height: 315,
        src: 'data-src'
   }]
    , success: function(element){
    setTimeout(function(){
    // We want to remove the loader gif now.
    // First we find the parent container
    // then we remove the "loading" class which holds the loader image
    var parent = element;
    // console.log(parent);
      parent.className = parent.className.replace(/\bimg__loading\b/,'');
      }, 0);
        },error: (err) => {
          alert(err)
        },
    });
  }
  loaderImgs();
  $('.auto_loader_img').each(function() {
    this.src = this.dataset.src;
    delete this.dataset.src;
  });
  
  $(window).resize(function() {
    loaderImgs();
    if($(window).width() <= 730) {
      $('.sidenav').addClass('d-none');
      $('.container_home').addClass('extend-container');
    } 
  });
});