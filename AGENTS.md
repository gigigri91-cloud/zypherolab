## Cursor / AI agent instructions — ZypheroLab

Documentația detaliată (handoff RO + ghid tehnic EN) stă în **`docs/`**:

- `docs/AGENTS.md` — instrucțiuni agenți (engleză)
- `docs/PENTRU-CHATURI-VIITOARE.md` — context complet (română)

**Folderul `docs/` este în `.gitignore`** — nu se comite și nu se publică în repo; păstrează aceste fișiere **doar local** sau copiază-le unde ai nevoie.

### Reguli Majore (IMPORTANT)

1. **ÎNAINTE DE ORICE MODIFICARE**: Citește și analizează fișierul `CURRENT-STATE-SUMMARY.md` de la rădăcina proiectului. Acolo se află statusul actualizat la zi, scris chiar de colegii tăi AI precedenți. Nu lucra în orb!

### Referință minimă arhitectură (Astro)

- **Astro 5 Architecture**: Site-ul a fost migrat integral la Astro. Codul sursă se află exclusiv în `_astro-src/`. **Nu edita fișierele .html direct din root!** Ele sunt suprascrise la fiecare build.
- **Dezvoltare**: Rulează `npm run dev` în interiorul folderului `_astro-src/`.
- **Compilare**: Rulează `npm run build` în `_astro-src/` pentru a compila proiectul.
- **Routing & i18n**: Astro se ocupă de indexarea paginilor (RO în `src/pages/` și EN în `src/pages/en/`). Asigură-te că linkurile interne au mereu slash la final (ex. `href="/contact/"`).
- **Deploy**: GitHub Pages folosește fișierele statice generate direct la rădăcină (root). Domeniul setat în `CNAME` este `zypherolab.com`.
