import { onMounted, onUnmounted } from 'vue';

export const useParticles = (canvasRef) => {
    let particles = [];
    let animationId;
    let ctx;
    let mouse = { x: 0, y: 0, radius: 150 };
    let hue = 0;

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

        // Адаптивное количество частиц в зависимости от размера экрана
        const baseParticleCount = 100; // базовое количество для экрана 1920x1080
        const screenRatio = (screenWidth * screenHeight) / (1920 * 1080);
        const particleCount = Math.min(150, Math.floor(baseParticleCount * screenRatio));
        
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

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
        
        particles.forEach(particle => {
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
        });

        animationId = requestAnimationFrame(animateParticles);
    };

    const stopParticles = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
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
