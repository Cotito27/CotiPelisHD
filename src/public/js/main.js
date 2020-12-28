
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
$(document).ready(function() {
  // $('.flickity-prev-next-button').find('svg').attr('viewBox', '0 0 0 0');
  if($(window).width() <= 730) {
    $('.sidenav').addClass('d-none');
    $('.container_home').addClass('extend-container');
    
  }
  if($(window).width() <= 480) {
    $('.navbar-title').text('CP');
  }
  function openCity(evt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
 
  $('.tab_peli').on('click', async function() {
    if(!$(this).hasClass('active')) {
      let response = await fetch('/getPeli');
      let res = await response.json();
      let newHTML = '';
      res.forEach((v) => {
        newHTML += `<a href="/${'pelicula'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
        <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
        <p class="title-video">${v.title} (${v.year})</p>
        <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
      </a>`;
      });
      $('.content_img_videos').html(newHTML);
      $('.btnMoreVideos').html('Ver más Peliculas');
      loaderImgs();
      setTimeout(() => {
        loaderImgs();
      },200); 
      if(!isMobile()) {
        $('[data-tippy-root]').remove();
        tippy('.tooltip_auto', {
          placement: 'bottom',
          allowHTML: true,
          animation: 'fade',
          theme: 'dark',
          arrow: '<br>'
        });
      }
    }
  });
  $('.tab_serie').on('click', async function() {
    if(!$(this).hasClass('active')) {
      let response = await fetch('/getSerie');
      let res = await response.json();
      let newHTML = '';
      res.forEach((v) => {
        newHTML += `<a href="/${'serie'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
        <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
        <p class="title-video">${v.title} (${v.year})</p>
        <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
      </a>`;
      });
      $('.content_img_videos').html(newHTML);
      $('.btnMoreVideos').html('Ver más Series');
      loaderImgs();
      setTimeout(() => {
        loaderImgs();
      },200); 
      if(!isMobile()) {
        $('[data-tippy-root]').remove();
        tippy('.tooltip_auto', {
          placement: 'bottom',
          allowHTML: true,
          animation: 'fade',
          theme: 'dark',
          arrow: '<br>'
        });
      }
    }
  });
  $('.tablinks').on('click', openCity);
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
      if(thisEvent.href == undefined || thisEvent.href.indexOf('#') == thisEvent.href.length - 1) return;
      if(thisEvent.target == '_blank') {
        window.open(thisEvent.href, '_blank');
        return;
      }
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
  $('body').on('keyup', '.inputSearch', async function() {
    // if($(this).val() == '') return;
    let response = await fetch(`/searchPeliculasSeries/1?name=${$(this).val()}`);
    let res = await response.json();
    if(res.error) { 
      $('[data-tippy-root]').remove();
      $('#pagination_container').remove();
      $('.preview_imgs_popular').remove();
      $('.tab').remove();
      $('.btnMoreVideos').remove();
      $('.title_videos_last').remove();
      $('.content_img_videos').html('<div class="error_nofound">No se encontraron resultados</div>');
      return;
    }
    // history.pushState(null, "", `/searchPeliculasSeries/1?name=${$(this).val()}`);
    $('.preview_imgs_popular').remove();
    $('.tab').remove();
    $('.btnMoreVideos').remove();
    $('#pagination_container').remove();
    // $('.content_last_videos')
    let numberPages = res.numberPages;
    let newHTML = '';
          res.arrayVideo.forEach((v) => {
            newHTML += `<a href="/${'pelicula'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
            <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
            <p class="title-video">${v.title} (${v.year})</p>
            <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
          </a>`;
          });
          $('.content_img_videos').html(newHTML);
          loaderImgs();
          setTimeout(() => {
            loaderImgs();
          },200); 
          if(!isMobile()) {
            $('[data-tippy-root]').remove();
            tippy('.tooltip_auto', {
              placement: 'bottom',
              allowHTML: true,
              animation: 'fade',
              theme: 'dark',
              arrow: '<br>'
            });
          }
    if(numberPages) {
      let numVeriPages = 0;
      if(!$('#pagination_container')[0]) {
        $('.container_home').append(`<div id="pagination_container"></div>
        <div id="data_container"></div>`);
      }
      $('#pagination_container').twbsPagination({
        totalPages: numberPages,
        visiblePages: 4,
        startPage: 1,
        prev: '<span aria-hidden="true">&laquo;</span>',
        next: '<span aria-hidden="true">&raquo;</span>',
        onPageClick: async function (event, page) {
          numVeriPages ++;
          if(numVeriPages > 1) {
              let newHTML = '';
              let response = await fetch(`/searchPeliculasSeries/${page}?name=${$(this).val()}`);
              let res = await response.json();
              res.arrayVideo.forEach((v) => {
                newHTML += `<a href="/${'pelicula'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
                <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
                <p class="title-video">${v.title} (${v.year})</p>
                <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
              </a>`;
              });
              $('.content_img_videos').html(newHTML);
              loaderImgs();
              setTimeout(() => {
                loaderImgs();
              },200); 
              if(!isMobile()) {
                $('[data-tippy-root]').remove();
                tippy('.tooltip_auto', {
                  placement: 'bottom',
                  allowHTML: true,
                  animation: 'fade',
                  theme: 'dark',
                  arrow: '<br>'
                });
              }
              }       
        }
    });
     }
     
  });
  $('body').on('click', '.close-search', function() {
    setTimeout(async ()=> {
      if($('.inputSearch').val() != '') {
        let response = await fetch(`/searchPeliculasSeries/1?name=${''}`);
    let res = await response.json();
    if(res.error) { 
      $('[data-tippy-root]').remove();
      $('#pagination_container').remove();
      $('.preview_imgs_popular').remove();
      $('.tab').remove();
      $('.btnMoreVideos').remove();
      $('.title_videos_last').remove();
      $('.content_img_videos').html('<div class="error_nofound">No se encontraron resultados</div>');
      return;
    }
    // history.pushState(null, "", `/searchPeliculasSeries/1?name=${''}`);
    $('.preview_imgs_popular').remove();
    $('.tab').remove();
    $('.btnMoreVideos').remove();
    $('#pagination_container').remove();
    // $('.content_last_videos')
    let numberPages = res.numberPages;
    let newHTML = '';
          res.arrayVideo.forEach((v) => {
            newHTML += `<a href="/${'pelicula'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
            <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
            <p class="title-video">${v.title} (${v.year})</p>
            <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
          </a>`;
          });
          $('.content_img_videos').html(newHTML);
          loaderImgs();
          setTimeout(() => {
            loaderImgs();
          },200); 
          if(!isMobile()) {
            $('[data-tippy-root]').remove();
            tippy('.tooltip_auto', {
              placement: 'bottom',
              allowHTML: true,
              animation: 'fade',
              theme: 'dark',
              arrow: '<br>'
            });
          }
    if(numberPages) {
      let numVeriPages = 0;
      if(!$('#pagination_container')[0]) {
        $('.container_home').append(`<div id="pagination_container"></div>
        <div id="data_container"></div>`);
      }
      $('#pagination_container').twbsPagination({
        totalPages: numberPages,
        visiblePages: 4,
        startPage: 1,
        prev: '<span aria-hidden="true">&laquo;</span>',
        next: '<span aria-hidden="true">&raquo;</span>',
        onPageClick: async function (event, page) {
          numVeriPages ++;
          if(numVeriPages > 1) {
              let newHTML = '';
              let response = await fetch(`/searchPeliculasSeries/${page}?name=${''}`);
              let res = await response.json();
              res.arrayVideo.forEach((v) => {
                newHTML += `<a href="/${'pelicula'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
                <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
                <p class="title-video">${v.title} (${v.year})</p>
                <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
              </a>`;
              });
              $('.content_img_videos').html(newHTML);
              loaderImgs();
              setTimeout(() => {
                loaderImgs();
              },200); 
              if(!isMobile()) {
                $('[data-tippy-root]').remove();
                tippy('.tooltip_auto', {
                  placement: 'bottom',
                  allowHTML: true,
                  animation: 'fade',
                  theme: 'dark',
                  arrow: '<br>'
                });
              }
              }       
        }
    });
     }
      }
      $(this).parent().replaceWith(`<a class="search-title wave" href="#">
    <i class="fas fa-search"></i>
  </a>`);
      // location.href = '/';
      
    }, 100);
  });
  $('.btnMoreVideos').on('click', function() {
    location.href = `/${$(this).html().replace('Ver más ', '').toLowerCase()}/pages/1`;
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
    onPageClick: async function (event, page) {
      numVeriPages ++;

      
      if(numVeriPages > 1) {
        if(sectionPage == 'Peliculas') {
          history.pushState(null, "", `/peliculas/pages/${page}`);
          let response = await fetch(`/getAjaxPeliculas/${page}`);
          let res = await response.json();
          let newHTML = '';
          res.forEach((v) => {
            newHTML += `<a href="/${'pelicula'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
            <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
            <p class="title-video">${v.title} (${v.year})</p>
            <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
          </a>`;
          });
          $('.content_img_videos').html(newHTML);
          loaderImgs();
          setTimeout(() => {
            loaderImgs();
          },200); 
          // location.href = `/peliculas/pages/${page}`;
        } else if(sectionPage == 'Series') {
          history.pushState(null, "", `/series/pages/${page}`);
          let response = await fetch(`/getAjaxSeries/${page}`);
          let res = await response.json();
          let newHTML = '';
          res.forEach((v) => {
            newHTML += `<a href="/${'serie'}/${v.title}" class="carousel__elemento wave tooltip_auto" data-tippy-content="${v.title} (${v.year})">
            <img class="b-lazy img__loading" src="/img/loader.gif" data-src="${v.image}" alt="">
            <p class="title-video">${v.title} (${v.year})</p>
            <div class="rating icon-star"><i class="fas fa-star"></i> <label class="score">${v.score}/10</label></div>
          </a>`;
          });
          $('.content_img_videos').html(newHTML);
          loaderImgs();
          setTimeout(() => {
            loaderImgs();
          },200); 
        }
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
      slidesToShow: 10,
      slidesToScroll: 10,
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
    if($(window).width() <= 480) {
      $('.navbar-title').text('CP');
    } else {
      $('.navbar-title').text('CotiPelisHD');
    }
  });
});