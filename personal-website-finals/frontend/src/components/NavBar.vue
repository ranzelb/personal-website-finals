<template>
  <nav :class="{ scrolled }">
    <div class="nav-inner">
      <a href="#hero" class="logo" @click.prevent="scrollTo('#hero')">
        <span class="logo-bracket">[</span>YN<span class="logo-bracket">]</span>
      </a>
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="link in links" :key="link.id">
          <a :href="`#${link.id}`" @click.prevent="navigate(link.id)">
            <span class="link-num">{{ link.num }}</span>{{ link.label }}
          </a>
        </li>
      </ul>
      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { id: 'about',    label: 'About',    num: '01' },
  { id: 'skills',   label: 'Skills',   num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'guestbook',label: 'Guestbook',num: '04' },
  { id: 'contact',  label: 'Contact',  num: '05' },
]

const onScroll = () => { scrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const navigate = (id) => {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
const scrollTo = (sel) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
</script>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  padding: 1.5rem 0;
  transition: all 0.4s ease;
}
nav.scrolled {
  padding: 1rem 0;
  background: rgba(10,10,10,0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--accent);
  letter-spacing: 0.1em;
}
.logo-bracket { color: var(--text-dim); }
.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}
.nav-links a {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.nav-links a:hover { color: var(--accent); }
.link-num { color: var(--accent); font-size: 0.65rem; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 1px;
  background: var(--text-muted);
  transition: all 0.3s;
}
.hamburger.active span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links {
    position: fixed;
    top: 0; right: -100%;
    width: 70vw;
    height: 100vh;
    background: var(--bg-card);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    transition: right 0.4s ease;
    border-left: 1px solid var(--border);
  }
  .nav-links.open { right: 0; }
  .nav-links a { font-size: 1rem; }
}
</style>
