import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted } from 'vue';

export const useParallax = () => {
    let scrollTriggers = [];

    const initParallax = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Улучшенный плавный параллакс для фоновых элементов
        scrollTriggers.push(gsap.to('.parallax-bg', {
            yPercent: -30,
            scale: 1.1,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '.parallax-container',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
                toggleActions: 'play reverse play reverse',
                smoothChildTiming: true,
                fastScrollEnd: true,
                preventOverlaps: true,
                onUpdate: (self) => {
                    // Оптимизация обновления для плавности
                    gsap.set(self.trigger, {
                        force3D: true,
                        backfaceVisibility: 'hidden'
                    });
                }
            }
        }));

        // Анимация появления элементов при скролле
        gsap.utils.toArray('.fade-in-up').forEach((element, i) => {
            scrollTriggers.push(
                gsap.from(element, {
                    y: 60,
                    opacity: 0,
                    rotateX: -15,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse',
                        markers: false
                    }
                })
            );
        });

        // Анимация для текста с эффектом постепенного появления
        gsap.utils.toArray('.stagger-text').forEach((element) => {
            const lines = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            
            scrollTriggers.push(
                gsap.from(lines, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 75%',
                        end: 'bottom 25%',
                        toggleActions: 'play none none reverse'
                    }
                })
            );
        });

        // Улучшенная анимация масштабирования для изображений
        gsap.utils.toArray('.scale-in').forEach((element) => {
            scrollTriggers.push(
                gsap.from(element, {
                    scale: 1.2,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => gsap.to(element, {
                            scale: 1,
                            opacity: 1,
                            duration: 1.5,
                            ease: 'power2.out'
                        })
                    }
                })
            );
        });

        // Параллакс для различных слоев с разной скоростью
        gsap.utils.toArray('.parallax-layer-1').forEach((element) => {
            scrollTriggers.push(
                gsap.to(element, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: element.closest('.parallax-container'),
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                })
            );
        });

        gsap.utils.toArray('.parallax-layer-2').forEach((element) => {
            scrollTriggers.push(
                gsap.to(element, {
                    yPercent: -40,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: element.closest('.parallax-container'),
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                    }
                })
            );
        });

        // Плавное изменение цвета фона при скролле
        scrollTriggers.push(
            gsap.to('body', {
                backgroundColor: '#0a0a1a',
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2
                }
            })
        );

        // Добавляем плавную анимацию для заголовков при скролле
        gsap.utils.toArray('.title, .subtitle').forEach((element) => {
            scrollTriggers.push(
                gsap.from(element, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                })
            );
        });
    };

    const destroyParallax = () => {
        scrollTriggers.forEach(trigger => {
            if (trigger.scrollTrigger) {
                trigger.scrollTrigger.kill();
            }
            trigger.kill();
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