'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
      'height/width viewport',
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////// PAGE NAVIGATOR /////////////////////////////////////////
/*document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault()
    const id = this.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  })
})*/
document.querySelector('.nav__links').addEventListener('click', function (e){
  e.preventDefault()
  //Matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function (e){
  const clicked = e.target.closest('.operations__tab')
  if(!clicked){
    return;
  }
  tabsContent.forEach(t=>t.classList.remove('operations__content--active'))
  tabs.forEach(t=> t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// Menu fade animation
const handleHover = function (e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = this
      }
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords)
// window.addEventListener('scroll', function (e){
//     if(window.scrollY > initialCoords.top){
//         nav.classList.add('sticky')
//     }else{
//         nav.classList.remove('sticky')
//     }
// })

// Sticky navigation : IntersectionObserver API
const navHeight = nav.getBoundingClientRect().height
const stickyNav = function (entries){
  const [entry] =  entries
  if(entry.isIntersecting){
     nav.classList.remove('sticky')
  } else{
     nav.classList.add('sticky')
  }

}

const obsOptions = {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`
}

const headerObserver = new IntersectionObserver(stickyNav, obsOptions)
headerObserver.observe(header)





/////////////////////////////////////////////////////////////////////////////
// rgb(255,255,255)
/*const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

document.querySelector('.nav__link').addEventListener('click', function (e){
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target)
})

document.querySelector('.nav__links').addEventListener('click', function (e){
  this.style.backgroundColor = randomColor()
  console.log('CONTAINER', e.target)
})

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor()
  console.log('NAV', e.target)
},true)*/















