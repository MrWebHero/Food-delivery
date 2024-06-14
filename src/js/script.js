$(document).ready(function () {
   $('.carousel__inner').slick({   /*слайдер*/
      dots: false,
      infinite: true,
      speed: 1500,
      adaptiveHeight: false,
      autoplay: true,
      autoplayspeed: 200,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"</button>',  /*стрелки вслайдере*/
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"</button>',
      responsive: [
         {
            breakpoint: 991,   /*адаптация екрана*/
            settings: {
               dots: false,
               arrows: false,
               with: 100,
            }
         },]
   });
   /* ниже конфигурация для использования табов  */
   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });
   /* ниже активация кнопки или ссылки и после этого меянется контент на описание
   с помощью класса active */
   $('.catalog-item__link').each(function (i) {
      $(this).on('click', function (e) {
         e.preventDefault();
         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
         $('.catalog-item__box').eq(i).toggleClass('catalog-item__box_active');
      })
   })

   /* ниже активация кнопки назад от описания к контенту */
   $('.catalog-item__back').each(function (i) {
      $(this).on('click', function (e) {
         e.preventDefault();
         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
         $('.catalog-item__box').eq(i).toggleClass('catalog-item__box_active');
      })
   })



   /* ниже MODAL Окна */


   $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn();

   });

   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');

   });



   $('.button_mini').on('click', function () {
      $('.overlay, #order').fadeIn();

   });

   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');

   });

   $('.button_mini').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('slow');
      })

      /* ниже валидация форм через пагин validate */

   });
   $('#consultation-form ').validate();
   $('#consultation form').validate();
   $('#order form').validate();

   $('input[name=phone]').mask("+7 (999) 999-99-99");






   $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   // Smooth scroll and pageup /* можно также применить к липкому меню вовзрат в верх */

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });

   $("a[href=Up]").click(function () {
      const _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
   });
   /* ниже запуск анимации работает с animate.css смотреть шпаргалку */
   new WOW().init();
});


