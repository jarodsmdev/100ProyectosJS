//https://github.com/midudev/javascript-100-proyectos/blob/main/01-tinder-swipe/tinder-logo.webp
//https://www.youtube.com/watch?v=u01WD_YNENY

const DECISION_THRESHOLD = 75;
let isAnimating = false;
let pullDeltaX = 0 // distancia de la card se está arrastrando

function startDrag(event){
    if (isAnimating) return;

    //get the first article element
    const actualCard = event.target.closest('article');

    //get initial position of mouse of finger
    const startX = event.pageX ?? event.touches[0].pageX;

    //listen the mouse and touch movements
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    document.addEventListener('touchemove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });

    function onMove(event){
        //current position of mouse or finger
        const currentX = event.pageX ?? event.touches[0].pageX;
    
        //the distance between the initial and current position
        pullDeltaX = currentX - startX;

        // if not distance do nothing
        if (pullDeltaX === 0 ) return;

        //change the flag to indicate we are animating
        isAnimating = true;

        //calculate the rotation of the end card using the distance
        const deg = pullDeltaX / 15;

        //apply the transformation to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;

        //change the cursor to grabbing
        actualCard.style.cursor = 'grabbing';

        //change opacity of the choice info
        const opacity = Math.abs(pullDeltaX) / 100;
        const isRight = pullDeltaX > 0;

        const choiceEl = isRight
            ? actualCard.querySelector('.choice.like')
            : actualCard.querySelector('.choice.nope')

        choiceEl.style.opacity = opacity;

    }
    
    function onEnd(event){
        // remove the event listeners
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);

        document.removeEventListener('touchemove', onMove);
        document.removeEventListener('toucheend', onEnd);

        //know if the user took the desicion
        const desicionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        if (desicionMade){
            const goRight = pullDeltaX >= 0;
            const goLeft = !goRight;

            // add class acording to the desicion
            actualCard.classList.add(goRight ? 'go-right' : 'go-left');

            actualCard.addEventListener('transitionend', () => {
                actualCard.remove()
            }, { once: true });
        } else {
            actualCard.classList.add('reset');
            actualCard.classList.remove('go-right', 'go-left');

            // reset opacity to zero
            actualCard.querySelectorAll('.choice').forEach( el => {
                el.style.opacity = 0;
            })
        }

        // reset the variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style');
            actualCard.classList.remove('reset');

            pullDeltaX = 0;
            isAnimating = false;
        });
    }

}



document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, { passive: true });