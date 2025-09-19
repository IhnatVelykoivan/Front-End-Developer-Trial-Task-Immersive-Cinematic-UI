import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useParallax = () => {
    let scrollTriggers = [];

    const initParallax = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Параллакс для различных элементов
        scrollTriggers.push(gsap.to('.parallax-bg', {
            yPercent: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-container',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        }));

        // Анимация появления элементов при скролле с разными эффектами
        gsap.utils.toArray('.fade-in-up').forEach((element, i) => {
            scrollTriggers.push(gsap.fromTo(element,
                { y: 100, opacity: 0, rotationX: -15 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            ));
        });

        // Анимация для текста с задержкой
        gsap.utils.toArray('.stagger-text').forEach((element) => {
            const texts = element.querySelectorAll('p, h2, h3, h4');
            scrollTriggers.push(gsap.fromTo(texts,
                { y: 50, opacity: 0, filter: 'blur(10px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            ));
        });

        // Анимация масштабирования для изображений
        gsap.utils.toArray('.scale-in').forEach((element) => {
            scrollTriggers.push(gsap.fromTo(element,
                { scale: 1.2, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            ));
        });

        // Параллакс для различных слоев
        gsap.utils.toArray('.parallax-layer-1').forEach((element) => {
            scrollTriggers.push(gsap.to(element, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }));
        });

        gsap.utils.toArray('.parallax-layer-2').forEach((element) => {
            scrollTriggers.push(gsap.to(element, {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }));
        });

        // Анимация изменения цвета фона при скролле
        scrollTriggers.push(gsap.to('body', {
            backgroundColor: '#0a0a1a',
            ease: 'none',
            scrollTrigger: {
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        }));
    };

    const destroyParallax = () => {
        scrollTriggers.forEach(trigger => {
            if (trigger && trigger.scrollTrigger) {
                trigger.scrollTrigger.kill();
            }
        });
        scrollTriggers = [];
    };

    onMounted(() => {
        initParallax();
    });

    onUnmounted(() => {
        destroyParallax();
    });

    return { initParallax, destroyParallax };
};