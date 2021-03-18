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
    const menu = document.querySelector('.header__nav')
    if (menu.classList.contains('header__nav-active')) {
      menu.classList.remove('header__nav-active')
      menu.classList.remove('header__nav-hide')
    }
  }
}

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
  width += 0.54

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
slidebar.ontransitionend = function() {
  let sliderClass = slidebar.classList[1]
  sliderClass = Number.parseInt(sliderClass.substring(13))
  if (sliderClass < amountVisibleItems) {
    slidebar.classList.remove(`slider__bar__${sliderClass}`)
    slidebar.classList.add(`slider__bar__${sliderClass + 1}`)
    intro.style.backgroundImage = `url("${slider__items[numberSliderItem + sliderClass].dataset.img}")`
  } else if (numberSliderItem < amountSliderItems - amountVisibleItems) {
    front()
    slidebar.style.removeProperty('transition')
    slidebar.classList.remove(`slider__bar__${sliderClass}`)
    slidebar.classList.add(`slider__bar__${sliderClass - 1}`)
    intro.style.backgroundImage = `url("${slider__items[numberSliderItem + sliderClass - 1].dataset.img}")`
    setTimeout(() => {
      slidebar.classList.remove(`slider__bar__${sliderClass - 1}`)
      slidebar.classList.add(`slider__bar__${sliderClass}`)
      slidebar.style.transition = 'transform 3.0s linear'
    }, 15)
  } else {
    slidebar.style.removeProperty('transition')
    slidebar.classList.remove(`slider__bar__${sliderClass}`)

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
  if (event.clientX) {
    mouseX = event.clientX
  }
  if (event.touches) {
    mouseX = event.touches[0].screenX
  }
}
slider.ontouchstart = slider.onmousedown
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
slider.ontouchend = slider.onmouseup
slider.onmousemove = function() {
  if (!isMouseDown) return
  if (event.clientX) {
    deltaX = mouseX - event.clientX
  }
  if (event.touches) {
    deltaX = mouseX - event.touches[0].screenX
  }
  let translateValue = numberSliderItem * width + deltaX
  translateValue = Math.min(numberSliderItem * width + deltaX, (amountSliderItems - amountVisibleItems) * width)
  slider.style.transform = `translateX(-${translateValue}px)`
}
slider.ontouchmove = slider.onmousemove

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
