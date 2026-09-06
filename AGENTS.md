# AGENTS.md

## What this repo is

Documentation-only project (no code yet). Portafolio personal de desarrollo de software using Spec-Driven Development (SDD). All specs live in `docs/`, code goes in `src/` once implementation begins.

## Critical workflow: SDD

Every task must follow this cycle:
1. **Specify** in `docs/` (user story, business rule, or architecture decision)
2. **Reference normative framework** — identify which `docs/01-marco-normativo/` standards apply
3. **Implement** in `src/` following code conventions
4. **Validate** against the checklist (see below)
5. **Document** updates if architecture/rules changed

**Rule:** Every OpenCode task must include explicit reference to the normative file(s) it validates against.

## Directory structure

```
docs/
├── 00-insumos-brutos/     # Source docs, research, drafts
├── 01-marco-normativo/    # Standards: OWASP, ISO, WCAG, Conventional Commits
├── 02-historias-usuario/  # User stories
├── 03-reglas-negocio/     # Business rules
├── 04-agentes-negocio/    # System actors/roles
├── 05-skills/             # Technical skills inventory
├── 06-infraestructura/    # Infrastructure schemas
├── 07-arquitectura/       # Architecture decisions (ADR format)
├── 08-roadmaps/           # Feature roadmaps
├── 09-runbooks/           # Operational procedures
└── 10-bitacora/           # Development log
src/                       # [not created yet] Portfolio project code
```

## Stack (confirmed in architecture docs)

- **Frontend:** React 18+ / TypeScript / Vite 5+ / Tailwind CSS 3+ / React Router v6
- **Backend:** Vercel Functions (Node.js 20+) / Zod validation
- **Database:** Supabase (PostgreSQL 15+)
- **Auth:** Supabase Auth (JWT)
- **Hosting:** Vercel (Edge Network)
- **CI/CD:** GitHub + Vercel integration

## Commands (will be available once src/ exists)

```bash
npm run dev          # Vite dev server (localhost:5173)
npm run build        # tsc && vite build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # Vitest
git push origin main # Auto-deploys via Vercel
```

## Commit conventions (mandatory)

Conventional Commits format: `<type>[scope]: <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

Rules: imperative present tense, lowercase, no period, atomic commits.

## Quality checklist (pre-deploy)

Every change must pass:
- [ ] Commits follow Conventional Commits
- [ ] Semantic HTML, skip-to-content included
- [ ] WCAG 2.2 AA: keyboard nav, contrast 4.5:1, `:focus-visible`, alt text
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Security: OWASP headers, honeypot on forms, no secrets in repo
- [ ] Linters pass, code is modular
- [ ] Normative framework validated

## Key constraints

- **No secrets in repo.** Use `.env.local` (gitignored). Supabase keys go there.
- **Honeypot over CAPTCHA** for spam protection on contact forms.
- **Server-side validation** with Zod schemas, never trust client input.
- **Mobile-first** layouts, touch targets ≥ 24px.
- **Bento Grid** layout via CSS Grid with 16-24px gap.
- **Color ratio:** 60% neutral base, 30% structure, 10% accent.
- **Max 2 font families:** sans-serif for text, monospace for code/metadata.

## Where to look for specifics

| Topic | File |
|:------|:-----|
| Normative standards index | `docs/01-marco-normativo/00-README-indice.md` |
| Architecture decisions | `docs/07-arquitectura/00-README-indice.md` |
| Feature roadmaps | `docs/08-roadmaps/00-README-indice.md` |
| Setup & dev flow | `docs/09-runbooks/01-runbook-setup-entorno-local.md` |
| Full contribution guide | `CONTRIBUTING.md` |
