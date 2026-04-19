# Architecture

## Overview

Questo repository contiene un portfolio personale costruito come progetto di riferimento per applicazioni Angular moderne.  
L’obiettivo è fornire una base solida, riutilizzabile e ben documentata per futuri progetti (anche non legati a questo portfolio).

Questo documento descrive:

- Lo stack tecnologico e le sue motivazioni.
- L’architettura delle cartelle (`core`, `shared`, `features`, `libs`).
- Le convenzioni CSS (Tailwind vs Angular Material vs SCSS).
- Le linee guida per aggiungere nuove funzionalità.
- Le regole per la gestione delle traduzioni (i18n).
- Le convenzioni per i messaggi di commit (conventional commits).

---

## Tech Stack

- **Framework**: Angular 21
  - Standalone components.
  - Zoneless change detection.
- **UI**:
  - Angular Material (Material Design 3) per componenti complessi e accessibili.
  - Tailwind CSS v4 per layout, spaziature e utilità.
- **Libreria interna**:
  - `libs/ui-kit` per componenti riutilizzabili stile design system.
- **i18n**:
  - `@ngx-translate` per la gestione delle traduzioni (es. `it`, `en`).
- **Testing**:
  - `@angular/build:unit-test` con Vitest come test runner.
- **Qualità & DX**:
  - ESLint (flat config) + angular-eslint.
  - Prettier per formattazione consistente.
  - Script NPM per linting, formatting, build e test.

Motivazioni sintetiche:

- **Angular 21 + standalone**: riduce boilerplate dei moduli e si allinea alle best practice attuali del framework.
- **Zoneless**: semplifica il modello di change detection ed è più adatto alle evoluzioni future di Angular.
- **Angular Material + Tailwind**: unisce un set maturo di componenti accessibili a una utility-first CSS library flessibile.
- **ui-kit separato**: permette di usare il progetto come base per un piccolo design system riutilizzabile.

---

## Folder Structure

Struttura semplificata:

```text
src/
  app/
    core/
      services/
      interceptors/
      guards/
      ...
    shared/
      components/
      directives/
      pipes/
      ...
    features/
      home/
      about/
      ...
    app.config.ts
    app.routes.ts
  styles/
    styles.scss
    tokens.scss
    tailwind.css

libs/
  ui-kit/
    src/
      lib/
        ...
```

Significato delle principali aree:

### `core/`

- Servizi singleton e infrastruttura applicativa:
  - Gestione del tema (es. dark/light mode).
  - Interceptor HTTP.
  - Guard di routing.
  - Configurazioni globali.
- Tutto ciò che è “una volta sola per tutta l’app” vive qui.

### `shared/`

- Componenti, direttive e pipe riutilizzabili all’interno dell’app ma **specifici del dominio** (portfolio).
- Esempi:
  - `LanguageSwitcherComponent`.
  - `ThemeToggleComponent`.
  - Header/footer condivisi tra più pagine.

### `features/`

- Feature verticali/pagine:
  - `home/`, `about/`, `projects/`, ecc.
- Ogni feature contiene:
  - Componenti standalone principali.
  - (Opzionale) routing specifico della feature.
  - Stili e logica legati a quella pagina.

### `libs/ui-kit`

- Libreria di componenti riutilizzabili, indipendenti dal dominio specifico dell’app.
- Obiettivo: essere il “design system” del progetto.
- Esempi:
  - `UiButton`, `UiCard`, `UiSection`, layout generici.
- Idealmente questi componenti potrebbero essere estratti in un altro progetto senza modifiche.

---

## CSS Conventions

### Tailwind CSS

Usato per:

- Layout (flex, grid).
- Spacing (margin, padding, gap).
- Tipografia di base e sizing.
- Colori derivati dal tema.

Linee guida:

- Preferire utility class Tailwind per layout e spacing, evitando SCSS globali.
- Comporre classi Tailwind in modo leggibile, evitando “mega linee” illeggibili (estrarre componenti quando necessario).

### Angular Material

Usato per:

- Componenti UI complessi e interattivi:
  - Toolbar, menu, button, list, dialog, form control, ecc.
- Garantire accessibilità, focus management e comportamenti nativi coerenti.

Linee guida:

- Se esiste un componente Material che risolve il caso d’uso, usarlo come base.
- Wrappare in `ui-kit` se serve un componente Material “opinionated” riutilizzabile.

### Component SCSS

Usato solo quando:

- Serve un override mirato di Material non realizzabile in modo chiaro con Tailwind.
- Sono richieste animazioni custom o uno styling non banale.
- Lo stile è fortemente accoppiato a un singolo componente.

Linee guida:

- Niente nuovi SCSS globali: lavorare negli SCSS di componente.
- Mantenere gli SCSS di componente il più snelli possibile; preferire Tailwind per la parte di layout.

---

## ui-kit vs shared/components

### Quando usare `ui-kit`

Metti un componente in `libs/ui-kit` se:

- È UI generica, non legata al dominio “portfolio”.
- Potrebbe essere riutilizzata in un altro progetto (bottoni, card, layout, badge generici).
- Ha dipendenze minime e nessuna conoscenza del routing o dei testi specifici dell’app.

Esempi:

- `UiButton` (wrapper sopra `mat-button`).
- `UiCard` per contenuto generico.
- `UiPageLayout` con header/body/footer generico.

### Quando usare `shared/components`

Metti un componente in `shared/components` se:

- È riutilizzato in più feature **ma** è specifico dell’applicazione.
- Contiene logica o testi legati al portfolio.

Esempi:

- `LanguageSwitcherComponent`.
- `ThemeToggleComponent`.
- `PortfolioHeaderComponent`.

Regola veloce:

- “Lo userei identico in un altro progetto?” → Sì: `ui-kit`. No: `shared/components`.

---

## Come aggiungere una nuova feature/pagina

Esempio: nuova pagina “Projects”.

1. **Generare il componente feature**

   ```bash
   ng generate component features/projects --standalone --flat=false
   ```

2. **Registrare la rotta**

   In `app.routes.ts`:

   ```ts
   {
     path: 'projects',
     loadComponent: () =>
       import('./features/projects/projects.component').then(m => m.ProjectsComponent),
   }
   ```

3. **Struttura della feature**

   ```text
   src/app/features/projects/
     projects.component.ts
     projects.component.html
     projects.component.scss
   ```

4. **Usare ui-kit e shared**

   - Per layout e componenti puramente UI → usare `ui-kit`.
   - Per elementi specifici del portfolio (tag, filtri, ecc.) condivisi tra più pagine → `shared/components`.
   - Per elementi usati solo in questa pagina → tenerli dentro la cartella della feature.

5. **(Opzionale) Test**

   - Aggiungere `projects.component.spec.ts` accanto al componente.
   - Usare `TestBed` + Vitest (`describe`, `it`, `expect`) per verificare i casi principali.

---

## i18n Guidelines

Il progetto utilizza `@ngx-translate` con file JSON per le traduzioni.

### Struttura consigliata

```text
src/assets/i18n/
  en.json
  it.json
```

### Naming delle chiavi

- Organizzare per pagina/feature:

  ```json
  {
    "home": {
      "title": "Hello, portfolio"
    },
    "about": {
      "title": "About me"
    }
  }
  ```

- Evitare chiavi generiche (`title1`, `subtitle2`).
- Usare nomi parlanti basati sul contesto (`home.title`, `projects.filter.active`, `header.nav.about`).

### Aggiungere una nuova chiave

1. Aggiungere la chiave in tutte le lingue (`en.json`, `it.json`, …).
2. Usare la chiave nel template:

   ```html
   <h1>{{ 'home.title' | translate }}</h1>
   ```

3. In caso di nuova lingua:
   - Aggiungere `{lang}.json`.
   - Aggiornare la configurazione di `TranslateModule`.
   - Aggiornare il language switcher.

---

## Testing & Tooling (overview)

- **Unit test**:
  - `ng test` usa `@angular/build:unit-test` + Vitest.
  - I global (`describe`, `it`, `expect`) sono forniti da Vitest.
- **Linting**:
  - ESLint + angular-eslint per TypeScript e template.
  - Eseguito via `npm run lint`.
- **Formatting**:
  - Prettier con regole definite in `package.json` / `prettier` config.
- **CI/CD** (se configurato):
  - Lint e test possono essere eseguiti in pipeline per garantire qualità continua.

---

## Commit Conventions

Il progetto utilizza uno stile ispirato ai **Conventional Commits** per messaggi di commit chiari e filtrabili.

### Formato

```text
<type>(<scope>): <short summary>

<body opzionale con dettagli / bullet list>

<footer opzionale (es. Close #issue)>
```

- `<type>`: tipo di cambiamento.
- `<scope>`: area del codice interessata (opzionale ma raccomandata).
- `<short summary>`: descrizione breve al presente, in inglese (o coerente con lo stile del repo).

### Tipi principali

- `feat`: nuova funzionalità.
  - Esempio: `feat(home): add hero section with CTA`
- `fix`: bug fix.
  - Esempio: `fix(ui-kit): correct button hover state`
- `chore`: attività di manutenzione, tooling, refactor non funzionale.
  - Esempio: `chore(test): migrate to @angular/build:unit-test (Vitest)`
- `docs`: documentazione.
  - Esempio: `docs: add ARCHITECTURE.md`
- `refactor`: cambiamento di codice senza modifiche di comportamento.
  - Esempio: `refactor(core): simplify theme service`
- `style`: modifiche di stile senza impatto logico (spazi, virgole, formattazione).
- `test`: aggiunta o modifica dei test.
  - Esempio: `test(home): add tests for hero title`
- `build`: cambiamenti che impattano il sistema di build o le dipendenze.
- `ci`: cambiamenti alla configurazione CI.
- `perf`: miglioramenti di performance.
- `revert`: revert di un commit precedente.

### Scope (esempi)

Scope usati e suggeriti per questo progetto:

- `home`, `about`, `projects` (feature).
- `core`, `shared`, `ui-kit`.
- `styles`, `i18n`, `routing`, `test`.

Esempi concreti:

- `feat(projects): add projects listing page`
- `docs: describe css conventions in ARCHITECTURE.md`
- `chore(deps): remove Karma and Jasmine devDependencies`
- `test(ui-kit): add basic tests for UiButtonComponent`

Queste regole rendono la history più leggibile e aiutano in futuro a generare changelog o filtrare rapidamente i commit per tipo o area.

---