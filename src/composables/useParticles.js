import { onMounted, onUnmounted } from 'vue';

export const useParticles = (canvasRef) => {
    let particles = [];
    let animationId;
    let ctx;
    let mouse = { x: 0, y: 0, radius: 150 };
    let hue = 0;
    
    // Performance throttling
    let targetFPS = 60;
    let frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;
    let fpsCounter = 0;
    let lastFPSCheck = Date.now();
    
    // Adaptive performance mode
    let performanceMode = 'auto'; // auto, high, medium, low

    const updatePerformanceMode = () => {
        fpsCounter++;
        const now = Date.now();
        
        if (now - lastFPSCheck >= 1000) {
            const currentFPS = fpsCounter;
            fpsCounter = 0;
            lastFPSCheck = now;
            
            // Автоматическое переключение режима производительности
            if (currentFPS < 30) {
                performanceMode = 'low';
                targetFPS = 30;
                frameInterval = 1000 / targetFPS;
            } else if (currentFPS < 50) {
                performanceMode = 'medium';
                targetFPS = 45;
                frameInterval = 1000 / targetFPS;
            } else {
                performanceMode = 'high';
                targetFPS = 60;
                frameInterval = 1000 / targetFPS;
            }
        }
    };

    const initParticles = () => {
        if (!canvasRef.value) return;

        const container = canvasRef.value.parentElement;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Используем devicePixelRatio для четкости на retina дисплеях
        const dpr = window.devicePixelRatio || 1;
        canvasRef.value.width = container.clientWidth * dpr;
        canvasRef.value.height = container.clientHeight * dpr;
        
        // Устанавливаем CSS размеры
        canvasRef.value.style.width = `${container.clientWidth}px`;
        canvasRef.value.style.height = `${container.clientHeight}px`;

        ctx = canvasRef.value.getContext('2d', {
            willReadFrequently: false,
            alpha: true
        });
        
        // Масштабируем контекст
        ctx.scale(dpr, dpr);

        // Адаптивное количество частиц в зависимости от размера экрана и производительности
        const baseParticleCount = 100; // базовое количество для экрана 1920x1080
        const screenRatio = (screenWidth * screenHeight) / (1920 * 1080);
        let particleCount = Math.min(150, Math.floor(baseParticleCount * screenRatio));
        
        // Дополнительная оптимизация для мобильных устройств
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            particleCount = Math.floor(particleCount * 0.6);
        }
        
        // Уменьшение количества частиц для слабых устройств
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            particleCount = Math.floor(particleCount * 0.7);
        }
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: Math.random() * canvasRef.value.width,
                y: Math.random() * canvasRef.value.height,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                },
                size: Math.random() * 3 + 1,
                color: `hsla(${hue}, 100%, 50%, ${Math.random() * 0.3 + 0.2})`
            };
            particles.push(particle);
            hue += 360 / particleCount;
        }

        animateParticles();
        
        // Intersection Observer для остановки анимации когда canvas не видно
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) {
                        animateParticles();
                    }
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(canvasRef.value);
        
        // Сохраняем observer для cleanup
        canvasRef.value._observer = observer;
    };

    const handleMouseMove = (event) => {
        const rect = canvasRef.value.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = canvasRef.value.width / 2;
        mouse.y = canvasRef.value.height / 2;
    };

    const handleResize = () => {
        if (!canvasRef.value) return;

        const container = canvasRef.value.parentElement;
        const dpr = window.devicePixelRatio || 1;
        const newWidth = container.clientWidth * dpr;
        const newHeight = container.clientHeight * dpr;

        // Сохраняем текущие позиции частиц относительно размеров экрана
        const widthRatio = newWidth / canvasRef.value.width;
        const heightRatio = newHeight / canvasRef.value.height;

        // Обновляем размеры канваса
        canvasRef.value.width = newWidth;
        canvasRef.value.height = newHeight;
        canvasRef.value.style.width = `${container.clientWidth}px`;
        canvasRef.value.style.height = `${container.clientHeight}px`;

        // Обновляем контекст
        ctx = canvasRef.value.getContext('2d', {
            willReadFrequently: false,
            alpha: true
        });
        ctx.scale(dpr, dpr);

        // Масштабируем позиции частиц пропорционально новому размеру
        particles.forEach(particle => {
            particle.x *= widthRatio;
            particle.y *= heightRatio;
        });
    };

    const animateParticles = (currentTime) => {
        // FPS throttling
        if (currentTime - lastFrameTime < frameInterval) {
            animationId = requestAnimationFrame(animateParticles);
            return;
        }
        
        updatePerformanceMode();
        lastFrameTime = currentTime;
        
        // Performance-based rendering optimizations
        const particleUpdateStep = performanceMode === 'low' ? 2 : 1;
        const clearAlpha = performanceMode === 'low' ? 0.1 : 1;
        
        // More efficient clearing for low performance mode
        if (performanceMode === 'low') {
            ctx.fillStyle = `rgba(0, 0, 0, ${clearAlpha})`;
            ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
        } else {
            ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
        }
        
        // Update and render particles with performance optimization
        for (let i = 0; i < particles.length; i += particleUpdateStep) {
            const particle = particles[i];
            
            // Обновляем позицию
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;

            // Проверяем границы
            if (particle.x < 0) particle.x = canvasRef.value.width;
            if (particle.x > canvasRef.value.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvasRef.value.height;
            if (particle.y > canvasRef.value.height) particle.y = 0;

            // Рисуем частицу
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        }

        animationId = requestAnimationFrame(animateParticles);
    };

    const stopParticles = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        // Cleanup intersection observer
        if (canvasRef.value && canvasRef.value._observer) {
            canvasRef.value._observer.disconnect();
            canvasRef.value._observer = null;
        }
        
        particles = [];
    };

    onMounted(() => {
        if (!canvasRef.value) return;
        canvasRef.value.addEventListener('mousemove', handleMouseMove);
        canvasRef.value.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);
        initParticles();
    });

    onUnmounted(() => {
        if (canvasRef.value) {
            canvasRef.value.removeEventListener('mousemove', handleMouseMove);
            canvasRef.value.removeEventListener('mouseleave', handleMouseLeave);
        }
        window.removeEventListener('resize', handleResize);
        stopParticles();
    });

    return { initParticles, stopParticles };
};
