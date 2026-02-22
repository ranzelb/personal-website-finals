# 🚀 Personal Website Finals — Setup & Deployment Guide

## Project Structure
```
personal-website-finals/
├── frontend/       ← Vue.js app (deploy to Vercel)
└── backend/        ← NestJS API (deploy to Vercel)
```

---

## STEP 1 — Set Up Supabase

1. Go to https://supabase.com and sign in (free account)
2. Click **"New Project"** → name it `personal-website-finals`
3. Once created, go to **SQL Editor** and run this query:

```sql
CREATE TABLE comments (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read and insert (for your API)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"
  ON comments FOR SELECT USING (true);

CREATE POLICY "Allow public insert"
  ON comments FOR INSERT WITH CHECK (true);
```

4. Go to **Settings → API** and copy:
   - `Project URL` → this is your `SUPABASE_URL`
   - `anon public` key → this is your `SUPABASE_ANON_KEY`

---

## STEP 2 — Customize Your Info

Open `frontend/src/views/Home.vue` and update:

- **Line ~120** — `hero-name`: Change `"Your Name"` to your actual name
- **Line ~128** — `hero-desc`: Update the bio text
- **skillGroups** array — Add/remove your actual skills
- **projects** array — Replace with your real projects
- **Contact section** — Update email, GitHub, LinkedIn links
- **about-text** — Update the About Me paragraphs

---

## STEP 3 — Push to GitHub

```bash
cd personal-website-finals

git init
git add .
git commit -m "Initial commit - personal website finals"

# Create a new repo on GitHub named: personal-website-finals
git remote add origin https://github.com/YOUR_USERNAME/personal-website-finals.git
git branch -M main
git push -u origin main
```

---

## STEP 4 — Deploy Backend to Vercel

1. Go to https://vercel.com → **Add New Project**
2. Import your GitHub repo → select the **`backend`** folder as root directory
3. Set **Framework Preset** to: `Other`
4. Set **Root Directory** to: `backend`
5. Add these **Environment Variables**:
   ```
   SUPABASE_URL      = https://your-project-id.supabase.co
   SUPABASE_ANON_KEY = your-anon-key-here
   FRONTEND_URL      = (leave blank for now, add after frontend is deployed)
   ```
6. Click **Deploy** → copy the URL (e.g. `https://personal-website-finals-api.vercel.app`)

**Test your backend:**
- Visit `https://your-backend.vercel.app/comments` — should return `[]`

---

## STEP 5 — Deploy Frontend to Vercel

1. Go to Vercel → **Add New Project** again
2. Import the same GitHub repo → select **`frontend`** folder as root directory
3. Set **Framework Preset** to: `Vite`
4. Set **Root Directory** to: `frontend`
5. Add this **Environment Variable**:
   ```
   VITE_API_URL = https://your-backend-url.vercel.app
   ```
6. Click **Deploy**

---

## STEP 6 — Update CORS (Final Step)

1. Go back to your **backend** project on Vercel
2. Add/update the environment variable:
   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
3. Redeploy the backend (Settings → Deployments → Redeploy)

---

## ✅ Verification Checklist

- [ ] Supabase `comments` table created
- [ ] Backend deployed and `/comments` returns `[]`
- [ ] Frontend deployed and visible
- [ ] Guestbook form submits successfully (POST)
- [ ] Guestbook list shows comments (GET)
- [ ] Site is responsive on mobile
- [ ] All sections visible: About, Skills, Projects, Guestbook, Contact

---

## Local Development

### Run Backend locally
```bash
cd backend
npm install
cp .env.example .env      # fill in your Supabase values
npm run start:dev          # runs on http://localhost:3000
```

### Run Frontend locally
```bash
cd frontend
npm install
cp .env.example .env.local # set VITE_API_URL=http://localhost:3000
npm run dev                 # runs on http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| GET    | /comments   | Fetch all guestbook entries |
| POST   | /comments   | Add a new guestbook entry   |

### POST /comments Body:
```json
{
  "name": "Juan Dela Cruz",
  "location": "Manila, PH",
  "message": "Awesome portfolio!"
}
```

---

## Tech Stack
- **Frontend**: Vue.js 3 + Vue Router + Axios — deployed on Vercel
- **Backend**: NestJS — deployed on Vercel
- **Database**: Supabase (PostgreSQL)
- **Repo**: personal-website-finals
