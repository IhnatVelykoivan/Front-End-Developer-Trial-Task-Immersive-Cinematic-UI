import { onMounted } from 'vue';

export const usePerformance = () => {
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