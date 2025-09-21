<template>
  <footer :id="id" class="relative py-20 text-center overflow-hidden footer-section">
    <!-- Убираем градиент для единого фона -->
    <div class="relative z-10 container mx-auto px-4">
      
      <!-- Контактная информация -->
      <div class="contact-section mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-white contact-title">
          Get In Touch
        </h2>
        
                <!-- Основной контент -->
        <div class="contact-grid max-w-6xl mx-auto">
          <!-- Карта и социальные сети -->
          <div class="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.7527!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e5b0dc7%3A0x8c93bb3dd4e4db53!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1647887657582!5m2!1sen!2sus" 
              width="100%" 
              height="300" 
              style="border:0; border-radius: 1rem;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            
            <!-- Социальные сети под картой -->
            <div class="social-section-map mt-6">
              <h3 class="text-lg font-semibold mb-4 text-white">Follow Us</h3>
              <div class="social-links-map">
                <a href="#" class="social-link-map" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a href="#" class="social-link-map" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a href="#" class="social-link-map" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a href="#" class="social-link-map" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Контактная информация -->
          <div class="contact-info-grid">
            <div class="contact-item-large">
              <div class="contact-icon-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 class="contact-label">Address</h3>
              <p class="contact-value">Kyiv, Ukraine<br>Khreshchatyk St, 1</p>
            </div>
            
            <div class="contact-item-large">
              <div class="contact-icon-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <h3 class="contact-label">Phone</h3>
              <a href="tel:+380123456789" class="contact-value contact-link">+38 (012) 345-67-89</a>
            </div>
            
            <div class="contact-item-large">
              <div class="contact-icon-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 class="contact-label">Email</h3>
              <a href="mailto:info@zerolimits.com" class="contact-value contact-link">info@zerolimits.com</a>
            </div>
            
            <div class="contact-item-large">
              <div class="contact-icon-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 class="contact-label">Working Hours</h3>
              <p class="contact-value">Mon-Fri: 9:00 - 18:00<br>Sat-Sun: 10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Копирайт -->
      <div class="border-t border-white/10 pt-8">
        <p class="text-white/60 footer-text">© 2025 Zero Limits Experience. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    id: String
  }
}
</script>

<style scoped>
.footer-section {
  padding: 5rem 0;
  /* Убираем кастомный фон, используем общий */
}

.footer-text {
  font-size: 1rem;
  line-height: 1.5;
}

/* Контактная секция */
.contact-title {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
  animation: titlePulse 4s ease-in-out infinite alternate;
}

@keyframes titlePulse {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.2);
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Карта */
.contact-map-container {
  position: relative;
}

.map-wrapper {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.map-wrapper:hover {
  transform: translateY(-10px);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(96, 165, 250, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.map-wrapper iframe {
  width: 100%;
  height: 300px;
  border: none;
  filter: grayscale(0.6) contrast(1.1);
  transition: filter 0.3s ease;
}

.map-wrapper:hover iframe {
  filter: grayscale(0.2) contrast(1);
}

/* Контактная информация */
.contact-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.contact-item-large {
  text-align: center;
  padding: 2rem 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.contact-item-large::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.05) 0%, 
    rgba(167, 139, 250, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-item-large:hover::before {
  opacity: 1;
}

.contact-item-large:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(96, 165, 250, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.contact-icon-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.2) 0%, 
    rgba(167, 139, 250, 0.2) 100%);
  border: 2px solid rgba(96, 165, 250, 0.3);
  border-radius: 50%;
  color: #60a5fa;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.contact-item-large:hover .contact-icon-large {
  color: #ffffff;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.4) 0%, 
    rgba(167, 139, 250, 0.4) 100%);
  border-color: rgba(96, 165, 250, 0.6);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 
    0 0 30px rgba(96, 165, 250, 0.4),
    0 0 60px rgba(96, 165, 250, 0.2);
}

.contact-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 2;
}

.contact-value {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

.contact-link {
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #60a5fa;
  text-shadow: 0 0 10px rgba(96, 165, 250, 0.6);
}

/* Социальные сети под картой */
.social-section-map {
  text-align: left;
}

.social-links-map {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link-map {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.social-link-map::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.1) 0%, 
    rgba(167, 139, 250, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.social-link-map:hover::before {
  opacity: 1;
}

.social-link-map:hover {
  transform: translateY(-3px) scale(1.1);
  color: #ffffff;
  border-color: rgba(96, 165, 250, 0.4);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(96, 165, 250, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.social-link-map:nth-child(1):hover {
  border-color: rgba(24, 119, 242, 0.4);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(24, 119, 242, 0.3);
}

.social-link-map:nth-child(2):hover {
  border-color: rgba(228, 64, 95, 0.4);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(228, 64, 95, 0.3);
}

.social-link-map:nth-child(3):hover {
  border-color: rgba(0, 119, 181, 0.4);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 119, 181, 0.3);
}

.social-link-map:nth-child(4):hover {
  border-color: rgba(29, 161, 242, 0.4);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(29, 161, 242, 0.3);
}

/* Мобильная адаптация */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .social-links-map {
    gap: 0.75rem;
  }
  
  .social-link-map {
    width: 2.75rem;
    height: 2.75rem;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 3rem 0;
  }
  
  .contact-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  .contact-item-large {
    padding: 1.5rem 1rem;
  }
  
  .contact-icon-large {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
  
  .footer-text {
    font-size: 0.9rem;
  }
  
  .social-links-map {
    justify-content: flex-start;
    gap: 0.5rem;
  }
  
  .social-link-map {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (max-width: 480px) {
  .footer-section {
    padding: 2.5rem 0;
  }
  
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-item-large {
    padding: 1.25rem 0.75rem;
  }
  
  .footer-text {
    font-size: 0.85rem;
    padding: 0 1rem;
  }
  
  .social-links-large {
    grid-template-columns: 1fr;
  }
  
  .map-wrapper iframe {
    height: 250px;
  }
}
</style>