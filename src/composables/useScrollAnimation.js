// import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimation = () => {
    let scrollTriggers = [];

    const initAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Анимация для заголовка с кинематографическим эффектом
        scrollTriggers.push(
            gsap.fromTo('.title',
                { 
                    y: 100, 
                    opacity: 0,
                    filter: 'blur(10px)',
                    scale: 0.9
                },
                { 
                    y: 0, 
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: 1,
                    duration: 2,
                    ease: 'power3.out'
                }
            )
        );

        // Анимация для подзаголовка с эффектом размытия
        scrollTriggers.push(
            gsap.fromTo('.subtitle',
                { 
                    y: 50, 
                    opacity: 0,
                    filter: 'blur(8px)',
                    scale: 0.95
                },
                { 
                    y: 0, 
                    opacity: 0.8,
                    filter: 'blur(0px)',
                    scale: 1,
                    duration: 1.8,
                    delay: 0.3,
                    ease: 'power2.out'
                }
            )
        );

        // Улучшенная анимация для индикатора прокрутки
        scrollTriggers.push(
            gsap.fromTo('.scroll-indicator',
                { 
                    opacity: 0,
                    y: -20,
                    scale: 0.8
                },
                { 
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    delay: 1,
                    ease: 'power2.inOut'
                }
            )
        );

        // Анимированный фон при скролле
        scrollTriggers.push(
            gsap.to('.parallax-bg', {
                backgroundPosition: '50% 100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.parallax-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5
                }
            })
        );

        // Кинематографичная анимация для текстовых блоков
        gsap.utils.toArray('.text-block').forEach((block, index) => {
            const childElements = block.children;
            
            scrollTriggers.push(
                gsap.fromTo(block,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.95,
                        filter: 'blur(10px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            );

            // Анимация для дочерних элементов с эффектом каскада
            scrollTriggers.push(
                gsap.fromTo(childElements,
                    {
                        y: 50,
                        opacity: 0,
                        filter: 'blur(5px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            );
        });

        // Параллакс эффект для изображений с виньетированием
        gsap.utils.toArray('.full-width-image').forEach((image) => {
            scrollTriggers.push(
                gsap.to(image, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: image,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            );
        });
    };

    const cleanupAnimations = () => {
        scrollTriggers.forEach(trigger => {
            if (trigger.scrollTrigger) {
                trigger.scrollTrigger.kill();
            }
            trigger.kill();
        });
        scrollTriggers = [];
    };

    onMounted(() => {
        initAnimations();
    });

    onUnmounted(() => {
        cleanupAnimations();
    });

    return { initAnimations, cleanupAnimations };
};