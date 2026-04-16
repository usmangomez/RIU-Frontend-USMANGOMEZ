# Riu Challenge — Superheroes App

A superheroes CRUD application built as a technical challenge. Browse, search, create, edit and delete heroes, each linked to a power and a publisher.

## Tech stack

- **Angular 20** — standalone components, zoneless change detection, signal inputs/outputs
- **NgRx Signals** — `signalStore` for global state management
- **Angular Material** — UI components
- **Angular CDK Portal** — projects child actions into the parent layout header
- **json-server** — mock REST API (`db.json`)
- **Karma + Jasmine** — unit tests (~88% coverage)

## Features

- Hero list with name search (debounced) and pagination
- Hero detail view with power and publisher info
- Add / Edit hero via a shared reactive form
- Delete hero with confirmation dialog
- Loading indicator via HTTP interceptor (request counter)
- `appToUpperCase` directive for input fields

## Getting started

```bash
npm install
```

Run the app and the mock API together:

```bash
npm run dev
```

Or separately:

```bash
npm run start   # Angular dev server → http://localhost:4200
npm run server  # json-server → http://localhost:3000
```

## Tests

```bash
npm test               # watch mode
npm run test:coverage  # single run with coverage report
```

Coverage report is generated at `coverage/riu-challenge/index.html`.

## Project structure

```
src/app/
├── core/
│   ├── directives/       # toUpperCase directive
│   ├── interceptors/     # loading interceptor
│   ├── layout/           # navbar, footer, main shell
│   └── services/         # LoadingService
├── feature/heroes/
│   ├── components/       # HeroCard, HeroForm
│   ├── layout/           # SecondLevel layout with portal outlet
│   ├── models/           # Hero, HeroDetail, Power, Publisher, Paginated
│   ├── pages/            # Heroes list, Detail, Add, Edit
│   ├── services/         # HeroesApi, SecondLevelService
│   └── store/            # HeroesStore (NgRx Signals)
└── shared/
    └── components/       # ConfirmDialog
```
