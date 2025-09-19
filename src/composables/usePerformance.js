import { onMounted } from 'vue';

import { ref } from 'vue';

export const usePerformance = () => {
    const performanceMode = ref('high'); // high, medium, low
    let fpsHistory = [];
    let lastFrameTime = 0;
    
    const measureFPS = () => {
        const now = performance.now();
        const fps = 1000 / (now - lastFrameTime);
        lastFrameTime = now;
        
        fpsHistory.push(fps);
        if (fpsHistory.length > 60) fpsHistory.shift();
        
        return fpsHistory.reduce((a, b) => a + b) / fpsHistory.length;
    };
    const optimizeAnimations = () => {
        // Отключаем анимации для пользователей с настройкой prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduce-motion');
        }

        // Оптимизация для мобильных устройств
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.documentElement.classList.add('mobile-device');
        }
    };

    onMounted(() => {
        optimizeAnimations();
    });

    return { optimizeAnimations };
};