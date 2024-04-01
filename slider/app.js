const container = document.querySelector('.slider__box');
const btn = document.querySelector('.slider__btn');
const color = document.querySelector('.slider__color');
const tooltip = document.querySelector('.slider__tooltip');
const dragElement = (target, btn) => {
    target.addEventListener('mousedown', (e) => {
        onMouseMove(e);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    const onMouseMove = (e) => {
        e.preventDefault();
        let targetRect = target.getBoundingClientRect();
        let x = e.pageX - targetRect.left + 10;
        if (x > targetRect.width) {
            x = targetRect.width
        }
        if (x < 0) {
            x = 0
        }
        btn.x = x - 10;
        btn.style.left = btn.x + 'px';

        let percentPosition = (btn.x + 10) / targetRect.width * 100;

        color.style.width = percentPosition + "%";

        tooltip.style.left = btn.x - 5 + 'px';
        tooltip.style.opacity = '100%';

        tooltip.textContent = Math.round(percentPosition) + '%';
    };

    const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        tooltip.style.opacity = '100%';

        btn.addEventListener('mouseover', function () {
            tooltip.style.opacity = '100%';
        });

        btn.addEventListener('mouseout', function () {
            tooltip.style.opacity = '100%';
        });
    };
};

dragElement(container, btn);