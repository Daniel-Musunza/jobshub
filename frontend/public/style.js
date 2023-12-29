let navbar = document.querySelector('.navbar');

document.querySelector('#menu').onclick = () =>{
    navbar.classList.toggle('active')
}

var swiper = new Swiper(".slider", {
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  var swiper = new Swiper(".tesslider", {
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
    },
  });




