<template>
  <footer>
    <div class="footer-inner">
      <span class="mono">© {{ new Date().getFullYear() }} — Your Name</span>
      <span class="mono muted">Built with Vue.js + NestJS + Supabase</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 2rem;
  margin-top: 4rem;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.mono {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
}
.muted { color: var(--text-dim); opacity: 0.6; }
@media (max-width: 600px) {
  .footer-inner { flex-direction: column; text-align: center; }
}
</style>
