import { gsap } from 'gsap';

export const useBackgroundEffects = () => {
    let animations = [];

    const initEffects = () => {
        // Очищаем предыдущие анимации
        stopEffects();

        // Находим все элементы для анимации
        const glowElements = document.querySelectorAll('.glow-effect');

        glowElements.forEach((element, index) => {
            // Разные параметры анимации для разных элементов
            const duration = 2 + index * 0.5;
            const delay = index * 0.3;
            const scale = 1.2 + index * 0.1;

            const tl = gsap.timeline({
                repeat: -1,
                defaults: { ease: "power1.inOut" }
            });

            tl.to(element, {
                opacity: 0.8,
                scale: scale,
                duration: duration,
                delay: delay
            })
            .to(element, {
                opacity: 0.2,
                scale: 1,
                duration: duration
            });

            animations.push(tl);
        });

        // Добавляем пульсацию для градиента
        const gradientElement = document.querySelector('.bg-gradient-to-br');
        if (gradientElement) {
            const pulseAnimation = gsap.timeline({
                repeat: -1,
                defaults: { ease: "none" }
            });

            pulseAnimation.to(gradientElement, {
                opacity: 0.3,
                duration: 3
            })
            .to(gradientElement, {
                opacity: 0.1,
                duration: 3
            });

            animations.push(pulseAnimation);
        }
    };

    const stopEffects = () => {
        animations.forEach(animation => {
            if (animation) {
                animation.kill();
            }
        });
        animations = [];
    };

    return {
        initEffects,
        stopEffects
    };
};