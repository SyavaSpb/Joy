/* header */
  /* true<900px   false>900px*/
let flagSize
function unitFlagSize() {
  if (document.documentElement.clientWidth < 900) {
    flagSize = true
  } else {
    flagSize = false
  }
}
function resizeFlagSize() {
  if (document.documentElement.clientWidth < 900 && !flagSize ||
      document.documentElement.clientWidth >= 900 && flagSize) {
    flagSize = !flagSize
    const menu = document.querySelector('.nav')
    if (menu.classList.contains('nav__active')) {
      menu.classList.remove('nav__active')
      menu.classList.remove('nav__hide')
    }
  }
}

  /* menu */
const menuButton = document.querySelector('.button__menu')
menuButton.onclick = function() {
  const menu = document.querySelector('.nav')
  if (menu.classList.contains('nav__active')) {
    menu.classList.remove('nav__active')
    setTimeout(() =>{
      menu.classList.remove('nav__hide')
    }, 700)
  } else {
    menu.classList.add('nav__hide')
    setTimeout(() =>{
      menu.classList.add('nav__active')
    }, 200)
  }
}
document.querySelector('.nav__text__bt').onclick = menuButton.onclick




/* works */
const works = document.querySelectorAll('.works__item')
works.forEach(item => {
  item.onmouseover = function() {
    const descr = this.querySelector('.work__description')
    const w = this.offsetWidth, h = this.offsetHeight;
    const x = event.clientX - this.getBoundingClientRect().x,
          y = event.clientY - this.getBoundingClientRect().y
    const delTop = y,
          delBottom = h - y,
          delLeft = x,
          delRight = w - x

    const minimum = Math.min(Math.min(delTop, delBottom), Math.min(delLeft, delRight))
    if (minimum == delTop) {
      descr.style.transform = 'translateY(-100%)'
    } else if (minimum == delBottom) {
      descr.style.transform = 'translateY(100%)'
    } else if (minimum == delLeft) {
      descr.style.transform = 'translateX(-100%)'
    } else if (minimum == delRight) {
      descr.style.transform = 'translateX(100%)'
    }

    setTimeout(() => {
      descr.style.transition = 'transform .1s linear'
      descr.style.zIndex = '1'
      descr.style.transform = 'translate(0%, 0%)'
    }, 10)
    descr.ontransitionend = function() {}
  }
  item.onmouseout = function() {
    const descr = this.querySelector('.work__description')
    const w = this.offsetWidth, h = this.offsetHeight;
    const x = event.clientX - this.getBoundingClientRect().x,
          y = event.clientY - this.getBoundingClientRect().y
    const delTop = y,
          delBottom = h - y,
          delLeft = x,
          delRight = w - x

    const minimum = Math.min(Math.min(delTop, delBottom), Math.min(delLeft, delRight))
    if (minimum == delTop) {
      descr.style.transform = 'translateY(-100%)'
    } else if (minimum == delBottom) {
      descr.style.transform = 'translateY(100%)'
    } else if (minimum == delLeft) {
      descr.style.transform = 'translateX(-100%)'
    } else if (minimum == delRight) {
      descr.style.transform = 'translateX(100%)'
    }

    descr.ontransitionend = function() {
      this.style.removeProperty('transition');
      descr.style.zIndex = '-10'
    }
  }
})


/* Slider */
const intro = document.querySelector('.intro')
const sliderContainer = document.querySelector('.slider__container')
const slider = document.querySelector('.slider')
const slider__items = document.querySelectorAll('.slider__item')
const amountSliderItems = slider__items.length
// let activeSlider = 1
let numberSliderItem = 0
let widthContainer
let width
let amountVisibleItems
function resizeWorks() {
  widthContainer = getComputedStyle(sliderContainer).width
  widthContainer = Number.parseFloat(widthContainer.substring(0, widthContainer.length - 2))

  width = getComputedStyle(slider.querySelector('.slider__item')).width
  width = Number.parseFloat(width.substring(0, width.length - 2))

  amountVisibleItems = Math.round(widthContainer / width)

  slider.style.transform = `translateX(-${numberSliderItem * width}px)`
}
resizeWorks()

/* move slider */
function front() {
  numberSliderItem++
  slider.style.transform = `translateX(-${numberSliderItem * width}px)`

  if (numberSliderItem == amountSliderItems - amountVisibleItems) {
    sliderFront.classList.add('slider__button__deactive')
  }
  if (sliderBack.classList.contains('slider__button__deactive')) {
    sliderBack.classList.remove('slider__button__deactive')
  }
}

  /* slidebar */
const slidebar = document.querySelector('.slider__bar')
// window.onload = function() {
//   slidebar.style.transition = 'transform 2.0s linear'
//   slidebar.classList.add('slider__bar__1')
//   slider.style.transition = 'transform 0.5s ease'
// }
slidebar.ontransitionend = function() {
  setTimeout(() => {
    if (slidebar.classList.contains('slider__bar__1')) {
      slidebar.classList.remove('slider__bar__1')
      slidebar.classList.add('slider__bar__2')
      intro.style.backgroundImage = `url("${slider__items[numberSliderItem + 1].dataset.img}")`
    } else if (slidebar.classList.contains('slider__bar__2')) {
      slidebar.classList.remove('slider__bar__2')
      slidebar.classList.add('slider__bar__3')
      intro.style.backgroundImage = `url("${slider__items[numberSliderItem + 2].dataset.img}")`
    } else if (slidebar.classList.contains('slider__bar__3')) {
      slidebar.classList.remove('slider__bar__3')
      slidebar.classList.add('slider__bar__4')
      intro.style.backgroundImage = `url("${slider__items[numberSliderItem + 3].dataset.img}")`
    } else if (numberSliderItem < amountSliderItems - amountVisibleItems) {
      front()
      slidebar.style.removeProperty('transition')
      slidebar.classList.remove('slider__bar__4')
      slidebar.classList.add('slider__bar__3')
      intro.style.backgroundImage = `url("${slider__items[numberSliderItem + 3].dataset.img}")`
      setTimeout(() => {
        slidebar.classList.remove('slider__bar__3')
        slidebar.classList.add('slider__bar__4')
        slidebar.style.transition = 'transform 3.0s linear'
      }, 15)
    } else {
      slidebar.style.removeProperty('transition')
      slidebar.classList.remove('slider__bar__4')

      numberSliderItem = 0
      slider.style.transform = `translateX(-${numberSliderItem * width}px)`
      sliderFront.classList.remove('slider__button__deactive')
      sliderBack.classList.add('slider__button__deactive')
      intro.style.backgroundImage = `url("${slider__items[numberSliderItem].dataset.img}")`

      setTimeout(() => {
        slidebar.classList.add('slider__bar__1')
        slidebar.style.transition = 'transform 3.0s linear'
      }, 15)
    }
  }, 15)
}

  /* select slider__item*/
slider__items.forEach((slider__item, ind) => {
  slider__item.onmouseover = function() {
    intro.style.backgroundImage = `url("${this.dataset.img}")`
    slidebar.style.removeProperty('transition')
    setTimeout(() => {
      if (slidebar.classList.contains('slider__bar__1')) {
        slidebar.classList.remove('slider__bar__1')
      }
      if (slidebar.classList.contains('slider__bar__2')) {
        slidebar.classList.remove('slider__bar__2')
      }
      if (slidebar.classList.contains('slider__bar__3')) {
        slidebar.classList.remove('slider__bar__3')
      }
      if (slidebar.classList.contains('slider__bar__4')) {
        slidebar.classList.remove('slider__bar__4')
      }
      slidebar.classList.add(`slider__bar__${ind - numberSliderItem + 1}`)
    }, 15)
  }
  slider__item.onmouseout = function() {
    if (slidebar.classList.contains('slider__bar__4')) {
      slidebar.classList.remove('slider__bar__4')
      slidebar.classList.add('slider__bar__3')
      //setTimeout(() => {
        slidebar.style.transition = 'transform 3.0s linear'
        slidebar.ontransitionend()
      //}, 15)
    } else {
      slidebar.style.transition = 'transform 3.0s linear'
      slidebar.ontransitionend()
    }
  }
})

  /* buttons */
const sliderFront = document.querySelector('.slider__front')
sliderFront.onclick = function() {
  if (numberSliderItem == amountSliderItems - amountVisibleItems) {
    return
  }

  front()
  // numberSliderItem++
  // slider.style.transform = `translateX(-${numberSliderItem * width}px)`
  //
  // if (numberSliderItem == amountSliderItems - amountVisibleItems) {
  //   sliderFront.classList.add('slider__button__deactive')
  // }
  // if (sliderBack.classList.contains('slider__button__deactive')) {
  //   sliderBack.classList.remove('slider__button__deactive')
  // }

  intro.style.backgroundImage = `url("${slider__items[numberSliderItem].dataset.img}")`
}
const sliderBack = document.querySelector('.slider__back')
sliderBack.onclick = function() {
  if (numberSliderItem == 0) {
    return
  }
  numberSliderItem--
  slider.style.transform = `translateX(-${numberSliderItem * width}px)`

  if (numberSliderItem == 0) {
    sliderBack.classList.add('slider__button__deactive')
  }
  if (sliderFront.classList.contains('slider__button__deactive')) {
    sliderFront.classList.remove('slider__button__deactive')
  }

  intro.style.backgroundImage = `url("${slider__items[numberSliderItem].dataset.img}")`
}

  /* drap */
let mouseX
let isMouseDown = false
let deltaX
slider.onmousedown = function() {
  this.style.removeProperty('transition');
  isMouseDown = true
  mouseX = event.clientX
}
slider.onmouseup = function() {
  isMouseDown = false
  const deltaItems = Math.round(deltaX / width)
  numberSliderItem += deltaItems
  numberSliderItem = Math.max(numberSliderItem, 0)
  numberSliderItem = Math.min(numberSliderItem, amountSliderItems - amountVisibleItems)
  slider.style.transform = `translateX(-${numberSliderItem * width}px)`
  this.style.transition = 'transform .5s ease'

  if (numberSliderItem == 0) {
    if (!sliderBack.classList.contains('slider__button__deactive')) {
      sliderBack.classList.add('slider__button__deactive')
    }
  } else {
    if (sliderBack.classList.contains('slider__button__deactive')) {
      sliderBack.classList.remove('slider__button__deactive')
    }
  }
  if (numberSliderItem == amountSliderItems - amountVisibleItems) {

    if (!sliderFront.classList.contains('slider__button__deactive')) {
      sliderFront.classList.add('slider__button__deactive')
    }
  } else {
    if (sliderFront.classList.contains('slider__button__deactive')) {
      sliderFront.classList.remove('slider__button__deactive')
    }
  }
}
slider.onmousemove = function() {
  if (!isMouseDown) return
  deltaX = mouseX - event.clientX
  let translateValue = numberSliderItem * width + deltaX
  translateValue = Math.min(numberSliderItem * width + deltaX, (amountSliderItems - amountVisibleItems) * width)
  slider.style.transform = `translateX(-${translateValue}px)`
}




/* window */
window.onload = function() {
  slidebar.style.transition = 'transform 2.0s linear'
  slidebar.classList.add('slider__bar__1')
  slider.style.transition = 'transform 0.5s ease'

  unitFlagSize()
}

window.onresize = function() {
  resizeWorks()
  resizeFlagSize()
}









/* */
