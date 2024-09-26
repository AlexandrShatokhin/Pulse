/* $('.one-time').ready(function(){
    $('.carousel__inner').slick({
        speed: 500,
        prevArrow: '<button type="button" class="slick-prev"><img src="../img/chevron left solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../img/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });
  }); */

const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

(function ($) {
  $(function () {
    $("ul.catalog__tabs").on(
      "click",
      "li:not(.catalog__tab_active)",
      function () {
        $(this)
          .addClass("catalog__tab_active")
          .siblings()
          .removeClass("catalog__tab_active")
          .closest("div.container")
          .find("div.catalog__content")
          .removeClass("catalog__content_active")
          .eq($(this).index())
          .addClass("catalog__content_active");
      }
    );
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа"),
        },
        phone: "Пожалуйста, введите номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-9999");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn();

      $("form").trigger("reset");
    });
    return false;
  });

  //Smooth scroll

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $(document).on("click", 'a[href^=#up]', function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      600
    );
  });

  new WOW().init();
})(jQuery);
