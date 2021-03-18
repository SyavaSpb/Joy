@@include('./blocks/blocks.js')

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
