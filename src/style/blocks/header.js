const menuButton = document.querySelector('.button__menu')
menuButton.onclick = function() {
const menu = document.querySelector('.header__nav')
if (menu.classList.contains('header__nav-active')) {
  menu.classList.remove('header__nav-active')
  setTimeout(() =>{
    menu.classList.remove('header__nav-hide')
  }, 700)
  } else {
    menu.classList.add('header__nav-hide')
    setTimeout(() => {
      menu.classList.add('header__nav-active')
    }, 200)
  }
}
document.querySelector('.nav__text__bt').onclick = menuButton.onclick
