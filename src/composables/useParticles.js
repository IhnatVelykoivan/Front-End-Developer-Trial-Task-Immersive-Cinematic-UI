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
        canvasRef.value.width = container.clientWidth;
        canvasRef.value.height = container.clientHeight;
        ctx = canvasRef.value.getContext('2d');

        // Создание частиц с разными свойствами
        const particleCount = Math.min(200, Math.floor(window.innerWidth * 0.2));
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvasRef.value.width,
                y: Math.random() * canvasRef.value.height,
                size: Math.random() * 4 + 1,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5,
                color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
                originalSize: Math.random() * 4 + 1,
                angle: Math.random() * Math.PI * 2,
                frequency: Math.random() * 0.1 + 0.01
            });
        }

        // Следим за движением мыши
        canvasRef.value.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        animateParticles();
    };

    const handleMouseMove = (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    };

    const handleResize = () => {
        if (!canvasRef.value) return;

        const container = canvasRef.value.parentElement;
        canvasRef.value.width = container.clientWidth;
        canvasRef.value.height = container.clientHeight;
    };

    const animateParticles = () => {
        if (!canvasRef.value || !ctx) return;

        // Очистка с эффектом затухания
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);

        // Изменение цвета
        hue += 0.5;

        // Обновление и отрисовка частиц
        particles.forEach(particle => {
            // Плавное движение с волнообразным эффектом
            particle.angle += particle.frequency;
            particle.x += particle.speedX + Math.cos(particle.angle) * 0.5;
            particle.y += particle.speedY + Math.sin(particle.angle) * 0.5;

            // Отскок от границ
            if (particle.x < 0 || particle.x > canvasRef.value.width) {
                particle.speedX = -particle.speedX;
            }
            if (particle.y < 0 || particle.y > canvasRef.value.height) {
                particle.speedY = -particle.speedY;
            }

            // Взаимодействие с курсором
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * force * 3;
                particle.y -= Math.sin(angle) * force * 3;
                particle.size = particle.originalSize * (1 + force * 2);

                // Изменение цвета при взаимодействии
                particle.color = `hsl(${(hue + force * 60) % 360}, 100%, 70%)`;
            } else {
                particle.size = particle.originalSize;
                particle.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
            }

            // Отрисовка частицы с свечением
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

            // Градиент для свечения
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fill();

            // Отрисовка линий между близкими частицами
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(animateParticles);
    };

    const stopParticles = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (canvasRef.value) {
            canvasRef.value.removeEventListener('mousemove', handleMouseMove);
        }
        window.removeEventListener('resize', handleResize);
    };

    return { initParticles, stopParticles };
};