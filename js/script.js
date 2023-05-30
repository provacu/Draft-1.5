//Код свайпера, полностью взят с сайта в методичке, ну и соответственно уже по документации API читал свойства

const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: 'auto',
    centeredSlides: false,
    grabCursor: true,
    direction: 'horizontal',
    spaceBetween: -56,
    loop: true,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 30,
        slideShadows: false,
      },
      
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  //Это убивает свайпер как только экрна становится больше чем в макете
  function checkSwiper() {
    let screenWidth = window.innerWidth;
    
    if (screenWidth >= 768) {
        swiper.disable();

    } else {
        swiper.enable();
    }
  }

  window.addEventListener('resize', checkSwiper);
  checkSwiper()

//Это прячем элементы, которые выходят из-за нижней границы, .getBoundingClientRect - крутейшая штука

  window.addEventListener('resize', hideOverflowButtons);

  function hideOverflowButtons() {
    let container = document.querySelector('.bottom__container');
    let buttons = document.querySelectorAll('.bottom__brand-button');


  
    for (let i = 0; i < buttons.length; i++) {
  
        buttons[i].classList.remove('hidden');
        if (buttons[i].getBoundingClientRect().bottom > container.getBoundingClientRect().bottom) {
            buttons[i].classList.add('hidden');
        }
    }
  }
  
  hideOverflowButtons();

/**
 * C кнопками мучался дольше всего. Наверное есть способы проще, но я их не понимаю ))
 * Тут я получается нашёл только как сделать через обработчик события изменения окна.
 * потому что иначе кнопки возникали везде, ведь получается, что код забивал в стили display: block и display: none и на CSS реакции не было
 * И не работало если на них кидать классы hidden
 * В общем из положение вышел так  - криво, косо, но хотя бы работает
 * Ну и глобальные переменные плохо, конечно. Хотел бы я для примера посмотреть на чьё-нибудь ещё решение
 * 
 */

  let initialHeight = document.querySelector('.bottom__container').style.height;
  let initialClasses = [];
  let hide = document.querySelector('.bottom__hide');
  let expand = document.querySelector('.bottom__expand');
  
  expand.addEventListener ('click', expandContent);
  hide.addEventListener ('click', hideContent);
  
  window.addEventListener('resize', handleResize);
  handleResize();
  
  function expandContent() {
      let container = document.querySelector('.bottom__container')
      let brandButtons = document.querySelectorAll('.bottom__brand-button');
      for (let i = 0; i < brandButtons.length; i++) {
          initialClasses[i] = brandButtons[i].className;
          brandButtons[i].classList.remove('hidden');
      }
      container.style.height = '768px';
      handleResize();
  }
  
  function hideContent() {
      let container = document.querySelector('.bottom__container')
      let brandButtons = document.querySelectorAll('.bottom__brand-button');
      for (let i = 0; i < brandButtons.length; i++) {
          brandButtons[i].className = initialClasses[i];
      }
      container.style.height = initialHeight;
      handleResize();
  }
  
  function handleResize() {
      if (window.innerWidth < 768) {
          expand.style.display = 'none'; 
          hide.style.display = 'none';
      } else {
          if (document.querySelector('.bottom__container').style.height == '768px') {
              expand.style.display = 'none'; 
              hide.style.display = 'block';
          } else {
              hide.style.display = 'none';
              expand.style.display = 'block';
          }
      }
  };