"use strict"

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows());
  }
};

if (isMobile.any()) {
  document.body.classList.add('_touch');

  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle('_active');
      })
    }
  }
} else {
  document.body.classList.add('_pc')
};


//Меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
  iconMenu.addEventListener("click", function () {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}


// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}

function onMenuLinkClick(e) {
  const menuLink = e.target;

  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelectorAll(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock[0].getBoundingClientRect().top + pageYOffset
      - document.querySelector('header').offsetHeight;

    if (iconMenu.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active');
    }

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth"
    });
    e.preventDefault();
  }
}

//header animation with window object
// const header = document.querySelector('.header');

// window.addEventListener('scroll', showConsole);

// function showConsole() {
//   if (scrollY > 30 && !document.body.classList.contains('_touch')) {
//     header.classList.add('_fixed');
//     console.log(`${scrollY} fixed`);
//     // window.removeEventListener('scroll', showConsole, { "once": true });
//   } else {
//     header.classList.remove('_fixed');
//     console.log('no fixed');

//   }
// }

//------------------------

//header animation with Intersection Observer


const header = document.querySelector('.header');

const blockObserver = new IntersectionObserver(
  ([entry]) => {
    //console.log(entry);
    let h = entry.boundingClientRect.top;
    //console.log(h);
    if (!entry.isIntersecting && !document.body.classList.contains('_touch')) {
      document.querySelector('.header').classList.add('_fixed');
      //console.log("fixed");
    } else {
      header.classList.remove('_fixed');
    }
  },
  {
    rootMargin: "-140px 0px 0px",
  }
)

document.querySelectorAll('.fictive').forEach((el) => blockObserver.observe(el));

//window.onload = console.log(window.pageYOffset);
//document.querySelectorAll('.fictive').forEach((el) => console.log(el));














