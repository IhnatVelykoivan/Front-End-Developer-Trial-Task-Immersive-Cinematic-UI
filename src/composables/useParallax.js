import { onMounted, onUnmounted } from 'vue';

export const useParallax = () => {
    const initParallax = () => {
        console.log('Простые CSS анимации инициализированы');
        
        // Добавляем базовые стили для плавности
        const style = document.createElement('style');
        style.innerHTML = 'html { scroll-behavior: smooth; } .fade-in-up { opacity: 1; transform: translateY(0); transition: all 0.6s ease; }';
        document.head.appendChild(style);
    };

    const destroyParallax = () => {
        console.log('Parallax очищен');
    };

    onMounted(() => {
        setTimeout(initParallax, 100);
    });

    onUnmounted(() => {
        destroyParallax();
    });

    return {
        initParallax,
        destroyParallax
    };
};