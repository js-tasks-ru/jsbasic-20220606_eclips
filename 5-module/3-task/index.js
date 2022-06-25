const CAROUSEL_WRAPPER_CLASS     = ".carousel__inner";
const CAROUSEL_ARROW_LEFT_CLASS  = ".carousel__arrow_left";
const CAROUSEL_ARROW_RIGHT_CLASS = ".carousel__arrow_right";

function shiftCarousel(shift) {
  let wrapper       = document.querySelector(CAROUSEL_WRAPPER_CLASS);

    let shiftCurrEl   = shift;
    let transformText = wrapper.style.transform;
    transformText = transformText == "" ? "0" : transformText;
    oldShift      = transformText.match(/-?(\d+)/g);
    oldShift      = Number(oldShift[0]);
    shiftCurrEl  += oldShift;
    wrapper.style.transform = `translateX(${shiftCurrEl}px)`;

}

function initCarousel() {
  let wrapper = document.querySelector(CAROUSEL_WRAPPER_CLASS);
  const carouselLength = wrapper.childElementCount;
  let   carouselNumber = 1;
  const carouselWidth  = wrapper.offsetWidth;
  let leftArrow        = document.querySelector(CAROUSEL_ARROW_LEFT_CLASS);
  let rightArrow       = document.querySelector(CAROUSEL_ARROW_RIGHT_CLASS);
  
  leftArrow.style.display = 'none';

  rightArrow.onclick = function() { 
    
    carouselNumber += 1;
    if(carouselNumber <= carouselLength) {
      leftArrow.style.display = '';
      shiftCarousel(-carouselWidth);
      
    }
    if(carouselNumber == carouselLength)
      rightArrow.style.display = 'none';

  };
  leftArrow.onclick = function() { 
    
    carouselNumber -= 1;
    if(carouselNumber >= 1) {
      rightArrow.style.display = '';
      shiftCarousel(carouselWidth);
    }
    if(carouselNumber == 1) 
      leftArrow.style.display = 'none';
  };

}
