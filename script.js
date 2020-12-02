'use strict';

///////////////////////////////////////
// Modal window
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btnOpen) => btnOpen.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////////
//////////////////////////////////////////////
btnScrollTo.addEventListener('click',(e) => {
   const slcords = section1.getBoundingClientRect();

  section1.scrollTo({left: slcords.left + window.pageXOffset,
  top: slcords.top + window.pageYOffset, behaviour: 'smooth' });
  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll X/Y',window.pageXOffset,window.pageYOffset);
  section1.scrollIntoView({behavior:'smooth'});
});
/////////////////////////////////////////////
//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//
//   });
// });
//1.add event listener to common parent ELEMENT
//2. determine what element originated the eveniet
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  //Match strategy
  if(e.target.classList.contains('nav__link')){
       const id = e.target.getAttribute('href');
       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

//////////////Tabed component///////////////////
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

  tabsContainer.addEventListener('click',(e) =>{
    const clicked = e.target.closest('.operations__tab');

    if(!clicked) return;
    tabs.forEach((el) => el.classList.remove('operations__tab--active'));
    tabsContent.forEach((el) => el.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////Fading out effect///////////////////
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link'))
  {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
const navi = document.querySelector('.nav');
// navi.addEventListener('mouseover',handleHover.bind(0.5));

navi.addEventListener('mouseover',handleHover.bind(0.5));
navi.addEventListener('mouseout',handleHover.bind(1));

//////////////Sticky Navigation Bar/////////////////////////
// const intialCoords = section1.getBoundingClientRect();window.addEventListener('scroll',function(){  if(window.scrollY > intialCoords.top)   {     document.querySelector('.nav').classList.add('sticky');   }  else {     document.querySelector('.nav').classList.remove('sticky');     }  });
/////////////////Sticky navigation usingn intersection observer API/////////////////// const obsCallBack = function(entries, observer) {}; const obsOptions = {root : null, threshold : [0,]
  // }; const observer = new IntersectionObserver(obsCallBack,obsOptions);observer.observe(nav);
  const stickyNav = function(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting)
    {
      document.querySelector('.nav').classList.add('sticky');
    }
    else {
      document.querySelector('.nav').classList.remove('sticky');
    }
  };
  const header = document.querySelector('.header');
  const navHeight = nav.getBoundingClientRect().height;

  const headerObeserver = new IntersectionObserver(stickyNav, {root: null,rootMargin: `-${navHeight}px`, threshold: 0});
  headerObeserver.observe(header);

  /////////////////Reaviling Each section./////////////////////////////
  const sectionCall = function(entries, observer)
  {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
  const sectionObserver = new IntersectionObserver(sectionCall, {root: null, threshold: .15});

  const allSections = document.querySelectorAll('.section');
  allSections.forEach(function(el) {
    sectionObserver.observe(el);
    el.classList.add('section--hidden');
  });


/////////////////Lazy loaing Images///////////////
const allImg = document.querySelectorAll('img[data-src]');
const imgCall = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function() {
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
  })
};

const imgObserver = new IntersectionObserver(imgCall, {root: null,rootMargin: '-200px', threshold: 0});
allImg.forEach((img) => {
  imgObserver.observe(img);
});


///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();


////////////////////////////////////////////////////
///////////////////////////////////////////////////
////Lectures Delete Insert and create element in dom
// console.log(document.documentElement);
//
// const header = document.querySelector('.header');
// const all = document.querySelectorAll('.section');
// console.log(all);
//
// document.getElementById('section--1');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'Hello rana g';
// message.innerHTML = `we use cookied for improved functionality and analytics.<button class = 'btn btn--close-cookie'>click on</button>`;
// // header.prepend(message);
// header.append(message);
// document.querySelector('.btn--close-cookie').addEventListener('click',()=>
// message.remove());
// // header.append(message.cloneNode(true));
//
// console.log(getComputedStyle(message).height);
// message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 40 + 'px';
//
// document.documentElement.style.setProperty('--color-primary','orangered');
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);//it gives us absolute path
// console.log(logo.getAttribute('src'));
// console.log(logo.setAttribute('company','bankist'));
//
// //nav__links
// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//
//
//   document.querySelector('.nav__link').addEventListener('click', function (e) {
//     this.style.backgroundColor = randColor();
// });
//
//
// document.querySelector('.nav').addEventListener('click',(e) => {
//   this.style.backgroundColor = randColor();
// });
//////////////////dom traversing
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';
//
// //Going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);
//
// //close ELEMENTS
// h1.closest('h1').style.backgroundColor = 'lightpink';
// h1.closest('.header').style.backgroundColor = 'lightgreen';
//
// //Going sideways : siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
//
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
