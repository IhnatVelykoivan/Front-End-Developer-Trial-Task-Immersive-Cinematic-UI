// import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimation = () => {
    const initAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Анимация для заголовка
        gsap.fromTo('.title',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
        );

        // Анимация для подзаголовка
        gsap.fromTo('.subtitle',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 0.8, duration: 1.5, delay: 0.3, ease: 'power2.out' }
        );

        // Анимация для индикатора прокрутки
        gsap.fromTo('.scroll-indicator',
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 1, ease: 'power2.out' }
        );

        // Анимация для текстовых блоков
        gsap.utils.toArray('.text-block').forEach((block) => {
            gsap.fromTo(block,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Параллакс эффект
        gsap.to('.full-width-image', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.full-width-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    };

    return { initAnimations };
};