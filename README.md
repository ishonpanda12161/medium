# Medium

A modern, type‑safe Medium‑style publishing platform focused on clean architecture, shared schemas, and rapid iteration.  
Deployed here: **[Live Demo](https://medium-project-ishon.vercel.app/signup)**


## 🚀 Core Features (Implemented / In Progress)

- Public feed of articles (Medium-like experience)
- Individual article pages (rich content-ready)
- Authoring workflow (create/update articles)
- Shared runtime + build‑time validation via Zod (in `@ishonpanda/medium-common`)
- Modular monorepo design (separation of concerns)
- Highly responsive UI (Tailwind CSS 4 + modern React)
- Client-side routing (React Router 7)
- Optimized development tooling (Vite, ES modules)
- Ready for authentication, tags, search, and role-based features


---

## 📦 Packages

```
medium/
├─ frontend/          # React UI (pages, components, routing, data fetching)
├─ common/            # Shared Zod schemas, (future) enums, DTOs
└─ medium-backend/    # Backend (Prisma-generated client, business logic & APIs)
```

---

## 🔌 API (High-Level Placeholder)

Planned / Typical Endpoints (REST-style or adaptable to GraphQL later):

| Method | Endpoint              | Purpose                    |
|--------|-----------------------|----------------------------|
| GET    | /api/articles         | List / feed                |
| GET    | /api/articles/:id     | Fetch single article       |
| POST   | /api/articles         | Create article (auth)      |
| PUT    | /api/articles/:id     | Update article (auth)      |
| POST   | /api/auth/login       | Session / token issuance   |
| GET    | /api/profile/:handle  | Author profile             |


---

### Clone
```bash
git clone https://github.com/ishonpanda12161/medium.git
cd medium
```

###  Install per Package
(If you convert to a workspace later, this can be simplified.)
```bash
cd common && npm install && cd ..
cd frontend && npm install && cd ..
# backend install (example)
cd medium-backend && npm install && cd ..
```

### Environment Variables (Example)
Create a `.env` in `medium-backend/`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/medium_dev
PORT=4000
JWT_SECRET=replace_me
```

### Prisma (Backend)
```bash
cd medium-backend
npx prisma generate
npx prisma migrate dev --name init
```

### Run Frontend
```bash
cd frontend
npm run dev
```
Then open: http://localhost:5173 (default Vite port)

### Backend
```bash
cd medium-backend
npm run dev
```
---

## TODO : 

- Authentication & JWT sessions
- Rich text editor integration (e.g., TipTap / Slate)
- Tagging & topic pages
- Comments & threaded replies
- Bookmarks / likes / reading history
- Full-text search (Postgres trigram or Meilisearch)
- User profiles & follower graph
- Image upload (Cloudinary / S3)
- CI (lint + type check) & test harness (Vitest / Jest)
- Issue templates & contribution guidelines

---

## Summary

| Category        | Summary |
|-----------------|---------|
| Project Type    | Medium-style article publishing platform |
| Differentiators | Monorepo + shared validation + modern React 19 |
| Technical Depth | Type safety, schema-driven design, scalable layering |
| Growth Path     | Clear roadmap with production-aware extensions |
| Value Signal    | Strong architectural intentionality + pragmatic delivery |

