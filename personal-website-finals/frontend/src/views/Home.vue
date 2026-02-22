<template>
  <main>
    <!-- HERO -->
    <section id="hero" class="hero">
      <div class="hero-bg-text" aria-hidden="true">PORTFOLIO</div>
      <div class="hero-content">
        <p class="hero-eyebrow animate-fadeUp">Hello, world — I'm</p>
        <h1 class="hero-name animate-fadeUp delay-1">Ranzel John Binggoy</h1>
        <div class="hero-title-row animate-fadeUp delay-2">
          <span class="hero-line"></span>
          <span class="hero-role">Web Developer &amp; Designer</span>
        </div>
        <p class="hero-desc animate-fadeUp delay-3">
          I craft thoughtful digital experiences — blending clean code with intentional design. Currently studying at [Your School], passionate about building things that matter.
        </p>
        <div class="hero-cta animate-fadeUp delay-4">
          <a href="#projects" class="btn-primary" @click.prevent="scrollTo('#projects')">View Work</a>
          <a href="#contact" class="btn-ghost" @click.prevent="scrollTo('#contact')">Get in Touch</a>
        </div>
      </div>
      <div class="hero-badge animate-slideLeft delay-3">
        <span class="badge-num">02+</span>
        <span class="badge-label">Years Coding</span>
      </div>
      <div class="scroll-hint">
        <span class="scroll-line"></span>
        <span class="mono">scroll</span>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-num mono">01</span>
          <h2 class="section-title">About Me</h2>
        </div>
        <div class="about-grid">
          <div class="about-image-wrap">
            <div class="about-img-placeholder">
              <span>YOUR PHOTO</span>
            </div>
            <div class="about-img-accent"></div>
          </div>
          <div class="about-text">
            <p class="about-lead">
              I'm a passionate developer currently pursuing my degree in [Your Course] at [Your School].
            </p>
            <p>
              My journey in tech started with curiosity — breaking things just to understand how they work. Today, I build full-stack web applications using modern frameworks and love turning complex problems into elegant solutions.
            </p>
            <p>
              When I'm not coding, you'll find me [your hobbies — e.g., sketching UI ideas, gaming, hiking, or exploring coffee shops].
            </p>
            <div class="about-facts">
              <div class="fact">
                <span class="fact-label mono">Location</span>
                <span class="fact-val">📍 Philippines</span>
              </div>
              <div class="fact">
                <span class="fact-label mono">Availability</span>
                <span class="fact-val">Open to Opportunities</span>
              </div>
              <div class="fact">
                <span class="fact-label mono">Focus</span>
                <span class="fact-val">Full-Stack Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="section section-alt">
      <div class="container">
        <div class="section-header">
          <span class="section-num mono">02</span>
          <h2 class="section-title">Skills</h2>
        </div>
        <div class="skills-grid">
          <div v-for="group in skillGroups" :key="group.category" class="skill-card">
            <div class="skill-card-header">
              <span class="skill-icon">{{ group.icon }}</span>
              <span class="skill-category mono">{{ group.category }}</span>
            </div>
            <div class="skill-tags">
              <span v-for="sk in group.skills" :key="sk" class="tag">{{ sk }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-num mono">03</span>
          <h2 class="section-title">Projects</h2>
        </div>
        <div class="projects-list">
          <div v-for="(proj, i) in projects" :key="proj.title" class="project-card">
            <div class="project-num mono">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="project-info">
              <h3 class="project-title">{{ proj.title }}</h3>
              <p class="project-desc">{{ proj.description }}</p>
              <div class="project-tags">
                <span v-for="t in proj.tags" :key="t" class="tag tag-sm">{{ t }}</span>
              </div>
            </div>
            <div class="project-links">
              <a v-if="proj.demo" :href="proj.demo" target="_blank" class="proj-link">↗ Demo</a>
              <a v-if="proj.repo" :href="proj.repo" target="_blank" class="proj-link">⌥ Repo</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GUESTBOOK -->
    <section id="guestbook" class="section section-alt">
      <div class="container">
        <div class="section-header">
          <span class="section-num mono">04</span>
          <h2 class="section-title">Guestbook</h2>
          <p class="section-sub">Leave a message — I'd love to hear from you.</p>
        </div>

        <!-- POST form -->
        <form class="guest-form" @submit.prevent="submitComment">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label mono">Name *</label>
              <input v-model="form.name" type="text" placeholder="Your name" required class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label mono">From</label>
              <input v-model="form.location" type="text" placeholder="City, Country" class="form-input" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label mono">Message *</label>
            <textarea v-model="form.message" placeholder="Say something nice..." required class="form-textarea" rows="4"></textarea>
          </div>
          <button type="submit" class="btn-primary" :disabled="submitting">
            {{ submitting ? 'Sending...' : 'Sign Guestbook ✦' }}
          </button>
          <p v-if="submitSuccess" class="form-success">✓ Message posted! Thanks for signing.</p>
          <p v-if="submitError" class="form-error">✗ {{ submitError }}</p>
        </form>

        <!-- GET comments list -->
        <div class="comments-section">
          <div class="comments-header mono">
            {{ loading ? 'Loading...' : `${comments.length} message${comments.length !== 1 ? 's' : ''}` }}
          </div>
          <div v-if="loading" class="loading-dots">
            <span></span><span></span><span></span>
          </div>
          <div v-else-if="comments.length === 0" class="no-comments mono">
            No messages yet. Be the first to sign!
          </div>
          <div v-else class="comments-list">
            <div v-for="c in comments" :key="c.id" class="comment-card">
              <div class="comment-avatar">{{ c.name.charAt(0).toUpperCase() }}</div>
              <div class="comment-body">
                <div class="comment-meta">
                  <span class="comment-name">{{ c.name }}</span>
                  <span v-if="c.location" class="comment-loc mono">📍 {{ c.location }}</span>
                  <span class="comment-time mono">{{ formatDate(c.created_at) }}</span>
                </div>
                <p class="comment-text">{{ c.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section">
      <div class="container contact-container">
        <div class="section-header">
          <span class="section-num mono">05</span>
          <h2 class="section-title">Contact</h2>
        </div>
        <div class="contact-grid">
          <div class="contact-text">
            <p class="contact-lead">Let's build something together.</p>
            <p>I'm always open to new opportunities, collaborations, or just a good conversation about tech. Reach out!</p>
          </div>
          <div class="contact-links">
            <a href="mailto:your@email.com" class="contact-item">
              <span class="contact-icon">✉</span>
              <div>
                <span class="contact-label mono">Email</span>
                <span class="contact-val">rpbinggoy@student.apc.edu.ph</span>
              </div>
            </a>
            <a href="https://github.com/yourusername" target="_blank" class="contact-item">
              <span class="contact-icon">⌥</span>
              <div>
                <span class="contact-label mono">GitHub</span>
                <span class="contact-val">https://github.com/ranzelb</span>
              </div>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" class="contact-item">
              <span class="contact-icon">◈</span>
              <div>
                <span class="contact-label mono">LinkedIn</span>
                <span class="contact-val">https://www.linkedin.com/in/ranzel-binggoy-360263323/</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ⚠️ Replace with your actual NestJS backend URL after deploying
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// ---- Data ----
const skillGroups = [
  { category: 'Frontend', icon: '⬡', skills: ['Vue.js', 'React', 'HTML5', 'CSS3', 'JavaScript'] },
  { category: 'Backend',  icon: '⬢', skills: ['NestJS', 'Node.js', 'Flask', 'REST APIs'] },
  { category: 'Database', icon: '◈', skills: ['Supabase', 'PostgreSQL', 'MySQL'] },
  { category: 'Tools',    icon: '◎', skills: ['Git', 'GitHub', 'Vite', 'VS Code', 'Vercel'] },
]

const projects = [
  {
    title: 'Personal Website Finals',
    description: 'Full-stack personal portfolio built with Vue.js, NestJS, and Supabase. Features a live guestbook with GET/POST API calls.',
    tags: ['Vue.js', 'NestJS', 'Supabase', 'Vercel'],
    demo: 'https://your-site.vercel.app',
    repo: 'https://github.com/yourusername/personal-website-finals',
  },
  {
    title: 'Project Two',
    description: 'Describe your second project here. What problem did it solve? What did you learn?',
    tags: ['React', 'Node.js', 'MongoDB'],
    demo: '',
    repo: '',
  },
  {
    title: 'Project Three',
    description: 'Describe your third project here. Keep it concise and impactful.',
    tags: ['Python', 'Flask', 'PostgreSQL'],
    demo: '',
    repo: '',
  },
]

// ---- Guestbook ----
const comments    = ref([])
const loading     = ref(false)
const form        = ref({ name: '', location: '', message: '' })
const submitting  = ref(false)
const submitSuccess = ref(false)
const submitError   = ref('')

const fetchComments = async () => {
  loading.value = true
  try {
    const { data } = await axios.get(`${API_BASE}/comments`)
    comments.value = data
  } catch (e) {
    console.error('Failed to fetch comments', e)
  } finally {
    loading.value = false
  }
}

const submitComment = async () => {
  submitting.value  = true
  submitSuccess.value = false
  submitError.value   = ''
  try {
    await axios.post(`${API_BASE}/comments`, {
      name:     form.value.name,
      location: form.value.location,
      message:  form.value.message,
    })
    form.value = { name: '', location: '', message: '' }
    submitSuccess.value = true
    await fetchComments()
    setTimeout(() => { submitSuccess.value = false }, 4000)
  } catch (e) {
    submitError.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const scrollTo = (sel) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })

onMounted(() => fetchComments())
</script>

<style scoped>
/* ===== LAYOUT ===== */
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
.section { padding: 7rem 0; }
.section-alt { background: var(--bg-card); }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}
.section-num { color: var(--accent); font-size: 0.75rem; }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text);
}
.section-sub {
  width: 100%;
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: -2rem;
}

/* ===== HERO ===== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 4rem;
}
.hero-bg-text {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: clamp(6rem, 20vw, 18rem);
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px var(--border-light);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  opacity: 0.4;
}
.hero-content {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}
.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.hero-name {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 1;
  color: var(--text);
  margin-bottom: 1.5rem;
}
.hero-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.hero-line {
  display: block;
  width: 60px;
  height: 1px;
  background: var(--accent);
}
.hero-role {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.hero-desc {
  max-width: 540px;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }

.hero-badge {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid var(--border);
  padding: 1.5rem 1rem;
  z-index: 2;
}
.badge-num {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}
.badge-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-dim);
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
}
.scroll-line {
  display: block;
  width: 40px;
  height: 1px;
  background: var(--text-dim);
}
.mono { font-family: var(--font-mono); }
.scroll-hint .mono { font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.15em; }

/* ===== BUTTONS ===== */
.btn-primary {
  display: inline-block;
  padding: 0.9rem 2rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}
.btn-primary:hover { background: var(--accent2); transform: translateY(-2px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-ghost {
  display: inline-block;
  padding: 0.9rem 2rem;
  background: transparent;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  border: 1px solid var(--border-light);
  transition: all 0.2s;
}
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* ===== ABOUT ===== */
.about-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 5rem;
  align-items: center;
}
.about-image-wrap { position: relative; }
.about-img-placeholder {
  width: 100%;
  aspect-ratio: 3/4;
  background: var(--bg-card2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.2em;
  position: relative;
  z-index: 1;
}
.about-img-accent {
  position: absolute;
  bottom: -12px;
  right: -12px;
  width: 100%;
  height: 100%;
  border: 1px solid var(--accent);
  z-index: 0;
  opacity: 0.4;
}
.about-text { display: flex; flex-direction: column; gap: 1.2rem; }
.about-lead {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 400;
  font-style: italic;
  color: var(--text);
  line-height: 1.5;
}
.about-text p { color: var(--text-muted); }
.about-facts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}
.fact { display: flex; justify-content: space-between; align-items: center; }
.fact-label { font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.1em; text-transform: uppercase; }
.fact-val { font-size: 0.9rem; color: var(--text); }

/* ===== SKILLS ===== */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.skill-card {
  border: 1px solid var(--border);
  padding: 2rem;
  background: var(--bg);
  transition: border-color 0.2s, transform 0.2s;
}
.skill-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.skill-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.skill-icon { font-size: 1.2rem; color: var(--accent); }
.skill-category { font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.15em; text-transform: uppercase; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag {
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--border-light);
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  transition: all 0.2s;
}
.tag:hover { border-color: var(--accent); color: var(--accent); }
.tag-sm { font-size: 0.7rem; padding: 0.2rem 0.6rem; }

/* ===== PROJECTS ===== */
.projects-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); }
.project-card {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 2rem;
  align-items: start;
  padding: 2.5rem 2rem;
  background: var(--bg);
  transition: background 0.2s;
}
.project-card:hover { background: var(--bg-card); }
.project-num { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); padding-top: 0.3rem; }
.project-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.6rem;
}
.project-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1rem; }
.project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.project-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.3rem;
}
.proj-link {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  transition: color 0.2s;
  white-space: nowrap;
}
.proj-link:hover { color: var(--accent); }

/* ===== GUESTBOOK ===== */
.guest-form {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 2.5rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.1em; text-transform: uppercase; }
.form-input, .form-textarea {
  background: var(--bg-card2);
  border: 1px solid var(--border);
  padding: 0.85rem 1rem;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  width: 100%;
  transition: border-color 0.2s;
  outline: none;
  resize: none;
}
.form-input:focus, .form-textarea:focus { border-color: var(--accent); }
.form-input::placeholder, .form-textarea::placeholder { color: var(--text-dim); }
.form-success { color: #6bcb77; font-family: var(--font-mono); font-size: 0.8rem; }
.form-error   { color: #ff6b6b; font-family: var(--font-mono); font-size: 0.8rem; }

.comments-section { }
.comments-header {
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}
.no-comments { font-size: 0.85rem; color: var(--text-dim); padding: 2rem 0; }
.loading-dots {
  display: flex;
  gap: 6px;
  padding: 2rem 0;
}
.loading-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: shimmer 1.2s ease infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

.comments-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); }
.comment-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--bg);
  align-items: flex-start;
}
.comment-avatar {
  width: 40px;
  height: 40px;
  background: var(--accent-glow);
  border: 1px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
.comment-name { font-weight: 500; font-size: 0.95rem; }
.comment-loc  { font-size: 0.7rem; color: var(--text-dim); }
.comment-time { font-size: 0.7rem; color: var(--text-dim); margin-left: auto; }
.comment-text { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; }

/* ===== CONTACT ===== */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}
.contact-lead {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}
.contact-text p { color: var(--text-muted); }
.contact-links { display: flex; flex-direction: column; gap: 1px; background: var(--border); }
.contact-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--bg);
  transition: background 0.2s;
}
.contact-item:hover { background: var(--bg-card); }
.contact-item > div { display: flex; flex-direction: column; gap: 0.15rem; }
.contact-icon { font-size: 1.2rem; color: var(--accent); width: 30px; }
.contact-label { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); letter-spacing: 0.1em; text-transform: uppercase; }
.contact-val { font-size: 0.9rem; color: var(--text); }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
  .about-image-wrap { max-width: 320px; }
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .hero-badge { display: none; }
}
@media (max-width: 700px) {
  .section { padding: 5rem 0; }
  .project-card { grid-template-columns: 1fr; gap: 1rem; }
  .project-num { display: none; }
  .project-links { flex-direction: row; }
  .form-row { grid-template-columns: 1fr; }
  .guest-form { padding: 1.5rem; }
}
@media (max-width: 480px) {
  .hero { padding: 5rem 1.5rem 3rem; }
  .container { padding: 0 1.25rem; }
}
</style>
