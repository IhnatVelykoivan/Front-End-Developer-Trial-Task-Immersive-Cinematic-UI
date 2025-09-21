import { onMounted, onUnmounted } from 'vue';

export const useParticles = (canvasRef) => {
    let particles = [];
    let animationId;
    let ctx;
    let time = 0;
    
    let targetFPS = 60;
    let frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const createSimpleParticle = (canvasWidth, canvasHeight) => {
        // Создаем разные цвета для частиц
        const colors = [
            'rgba(255, 255, 255, ', // белый
            'rgba(100, 150, 255, ', // голубой
            'rgba(150, 100, 255, ', // фиолетовый
            'rgba(255, 150, 150, ', // розовый
            'rgba(150, 255, 150, ', // зеленый
            'rgba(255, 200, 100, '  // золотой
        ];
        
        return {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            size: 1 + Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            opacity: 0.15 + Math.random() * 0.35,
            phase: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)], // случайный цвет
            trail: []
        };
    };

    const initParticles = () => {
        if (!canvasRef.value) return;

        const container = canvasRef.value.parentElement;
        canvasRef.value.width = container.clientWidth;
        canvasRef.value.height = container.clientHeight;

        ctx = canvasRef.value.getContext('2d', {
            willReadFrequently: false,
            alpha: true
        });

        particles = [];
        const particleCount = Math.min(50, Math.max(30, Math.floor(container.clientWidth / 50)));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(createSimpleParticle(container.clientWidth, container.clientHeight));
        }

        animateParticles();
        
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
        canvasRef.value._observer = observer;
    };

    const handleResize = () => {
        if (!canvasRef.value) return;
        const container = canvasRef.value.parentElement;
        canvasRef.value.width = container.clientWidth;
        canvasRef.value.height = container.clientHeight;
        ctx = canvasRef.value.getContext('2d', { willReadFrequently: false, alpha: true });
        particles = [];
        const particleCount = Math.min(50, Math.max(30, Math.floor(container.clientWidth / 50)));
        for (let i = 0; i < particleCount; i++) {
            particles.push(createSimpleParticle(container.clientWidth, container.clientHeight));
        }
    };

    const animateParticles = (currentTime = 0) => {
        if (currentTime - lastFrameTime < frameInterval) {
            animationId = requestAnimationFrame(animateParticles);
            return;
        }
        
        lastFrameTime = currentTime;
        time += 0.01;
        
        // Эффект следа - увеличиваем прозрачность для лучшего исчезновения
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Увеличили с 0.05 до 0.15
        ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
        
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 6) {
                particle.trail.shift();
            }
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            const breathe = Math.sin(time + particle.phase) * 0.3;
            const currentOpacity = particle.opacity + breathe * 0.1;
            
            if (particle.x < 0) particle.x = canvasRef.value.width;
            if (particle.x > canvasRef.value.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvasRef.value.height;
            if (particle.y > canvasRef.value.height) particle.y = 0;
            
            // Рисуем след с цветом частицы
            for (let j = 0; j < particle.trail.length; j++) {
                const trailPoint = particle.trail[j];
                const trailOpacity = currentOpacity * (j / particle.trail.length) * 0.5;
                const trailSize = particle.size * (0.3 + j / particle.trail.length * 0.7);
                
                ctx.save();
                ctx.globalAlpha = Math.max(0.02, trailOpacity);
                ctx.fillStyle = particle.color + '1)'; // Используем цвет частицы
                ctx.beginPath();
                ctx.arc(trailPoint.x, trailPoint.y, trailSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            // Рисуем основную частицу с её цветом
            ctx.save();
            ctx.globalAlpha = Math.max(0.1, currentOpacity);
            ctx.fillStyle = particle.color + '1)'; // Используем цвет частицы
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        animationId = requestAnimationFrame(animateParticles);
    };

    const stopParticles = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        if (canvasRef.value && canvasRef.value._observer) {
            canvasRef.value._observer.disconnect();
            canvasRef.value._observer = null;
        }
        particles = [];
    };

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        initParticles();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        stopParticles();
    });

    return { initParticles, stopParticles };
};
