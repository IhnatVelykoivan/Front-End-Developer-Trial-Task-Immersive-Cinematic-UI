import { ref, onMounted, onUnmounted } from 'vue';
import { useParticles } from '../useParticles';
import { useBackgroundEffects } from './useBackgroundEffects';

export const useAnimationController = () => {
    const isEnabled = ref(true);
    let particlesInstance = null;
    let backgroundInstance = null;

    const init = (canvasRef) => {
        if (!isEnabled.value) return;

        // Инициализация частиц
        particlesInstance = useParticles(canvasRef);
        particlesInstance.initParticles();

        // Инициализация фоновых эффектов
        backgroundInstance = useBackgroundEffects();
        backgroundInstance.initEffects();
    };

    const cleanup = () => {
        if (particlesInstance) {
            particlesInstance.stopParticles();
        }
        if (backgroundInstance) {
            backgroundInstance.stopEffects();
        }
    };

    const toggleAnimations = () => {
        isEnabled.value = !isEnabled.value;
        if (isEnabled.value) {
            init();
        } else {
            cleanup();
        }
    };

    onMounted(() => {
        window.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cleanup();
            } else if (isEnabled.value) {
                init();
            }
        });
    });

    onUnmounted(() => {
        cleanup();
    });

    return {
        isEnabled,
        toggleAnimations,
        init,
        cleanup
    };
};