import './libs/modal.js'
import './libs/accordion.js'
import { Swiper, Navigation } from 'swiper'

new Swiper('#swiper-preview', {
  modules: [
    Navigation
  ],
  navigation: {
    prevEl: '.swiper-nav__arrow--prev',
    nextEl: '.swiper-nav__arrow--next'
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 40,
    }
  }
})
