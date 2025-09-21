import { onMounted, ref } from 'vue';

export const usePerformance = () => {
    const performanceMode = ref('high'); // По умолчанию высокая производительность
    let fpsHistory = [];
    let lastFrameTime = 0;
    let performanceCheckInterval;
    
    const measureFPS = () => {
        const now = performance.now();
        const fps = 1000 / (now - lastFrameTime);
        lastFrameTime = now;
        
        fpsHistory.push(fps);
        if (fpsHistory.length > 60) fpsHistory.shift();
        
        return fpsHistory.reduce((a, b) => a + b) / fpsHistory.length;
    };
    
    const detectDeviceCapabilities = () => {
        const capabilities = {
            cores: navigator.hardwareConcurrency || 2,
            memory: navigator.deviceMemory || 4,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isLowEnd: false
        };
        
        // Более мягкое определение слабых устройств (только для очень слабых)
        capabilities.isLowEnd = capabilities.cores < 2 || capabilities.memory < 2;
        
        return capabilities;
    };
    
    const optimizeAnimations = () => {
        const capabilities = detectDeviceCapabilities();
        
        // Отключаем анимации для пользователей с настройкой prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduce-motion');
            performanceMode.value = 'low';
            return capabilities;
        }

        // Автоматическая оптимизация только для очень слабых устройств
        if (capabilities.isLowEnd) {
            document.documentElement.classList.add('low-performance');
            performanceMode.value = 'low';
        } else {
            // Для обычных устройств начинаем с высокой производительности
            performanceMode.value = 'high';
        }

        // Оптимизация для мобильных устройств (но не отключаем анимации)
        if (capabilities.isMobile) {
            document.documentElement.classList.add('mobile-device');
            
            // Только небольшие оптимизации для мобильных
            const style = document.createElement('style');
            style.textContent = `
                .mobile-device .animate-float-slow,
                .mobile-device .animate-float-medium,
                .mobile-device .animate-float-fast {
                    animation-duration: 25s, 20s, 15s !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        return capabilities;
    };
    
    const startPerformanceMonitoring = () => {
        let frameCount = 0;
        let lastCheck = Date.now();
        
        const checkPerformance = () => {
            frameCount++;
            const now = Date.now();
            
            if (now - lastCheck >= 2000) { // Проверяем каждые 2 секунды
                const fps = (frameCount * 1000) / (now - lastCheck);
                frameCount = 0;
                lastCheck = now;
                
                // Динамическое переключение режима производительности
                if (fps < 30 && performanceMode.value !== 'low') {
                    performanceMode.value = 'low';
                    document.documentElement.classList.add('low-performance');
                } else if (fps > 50 && performanceMode.value === 'low') {
                    performanceMode.value = 'medium';
                    document.documentElement.classList.remove('low-performance');
                }
            }
        };
        
        performanceCheckInterval = setInterval(checkPerformance, 100);
    };
    
    const stopPerformanceMonitoring = () => {
        if (performanceCheckInterval) {
            clearInterval(performanceCheckInterval);
            performanceCheckInterval = null;
        }
    };

    onMounted(() => {
        const capabilities = optimizeAnimations();
        
        // Запускаем мониторинг производительности только если устройство не совсем слабое
        if (!capabilities.isLowEnd) {
            startPerformanceMonitoring();
        }
        
        // Cleanup при unmount
        return () => {
            stopPerformanceMonitoring();
        };
    });

    return { 
        performanceMode, 
        optimizeAnimations, 
        measureFPS,
        startPerformanceMonitoring,
        stopPerformanceMonitoring
    };
};