# Teamify

Angular single-page app that forms teams from participants: time slots and
prior knowledge are defined, persons choose slots (with priority) and carry
knowledge, then teams are assembled per time slot and adjusted by drag and
drop. No backend – all data lives in the browser's `localStorage`.

## Commands

Use `pnpm`, never `npm`/`npx` (the README still shows `npm`).

- `pnpm start` – dev server, source locale (English)
- `pnpm start-de` / `pnpm start-en` – dev server with a translated locale
- `pnpm build` – production build of all locales into `dist/teamify/browser/<locale>`
- `pnpm test` – Karma/Jasmine; single run: `pnpm test --watch=false`
- `pnpm lint` – angular-eslint over `src/**/*.ts` and `src/**/*.html`
- `pnpm ng extract-i18n` – writes `messages.xlf` in the project root
- `pnpm run build:cloudflare` – production build of the source locale only,
  as deployed
- `pnpm preview` – serves that build locally in the Workers runtime
- `pnpm run deploy` – builds and publishes to the Cloudflare Worker at
  `teamify.skillbird.de`; the `Deploy` workflow runs it on every push to
  `main`

## Architecture

Feature folders under `src/app/`: `start`, `timeslots`, `prior-knowledge`,
`persons`, `teams`, `settings` (import/export), `navigation`, `shared`.
Each holds `components/`, `models/`, `services/` as needed. Routes are flat
in `app.routes.ts`; `data.title`/`data.icon` drive the navigation.

### State and events

- Each feature service (`PersonService`, `TeamService`, `TimeSlotService`,
  `PriorKnowledgeService`) owns its state in `BehaviorSubject`s with a public
  `…$` observable and a getter; sort/filter settings are signals.
- Every mutating service method emits a `BusEvent` via `EventBusService`.
- `DomainLogicService` (started by `provideAppInitializer`) listens to all
  events, runs the matching handlers, then calls
  `PersistenceService.saveAllData()`.
- A mutation that emits no event is not persisted. New mutating methods must
  emit an event.
- Cross-feature consequences (e.g. deleting a slot removes its team and the
  slot from every person) go into a handler in `shared/event-handler/<feature>/`
  implementing `EventHandler`, registered in the `handler` list of
  `DomainLogicService`. Do not call other feature services from a service's
  mutation method for this.
- Restore paths (`PersistenceService.read…`) pass `isRestore = true` so no
  events are emitted while loading.
- `PersonService` keeps four lists: all, filtered, available (not in a team),
  filtered-available. Keep all of them in sync when changing persons.

### Models

- Models are interfaces plus a `create…()` factory (ids via
  `crypto.randomUUID()`) and an `ObjectValidator` used by the JSON import.
- Changing a model's fields requires updating its validator and the
  export/import models in `settings/models/`, or imports will be rejected.

### Team assembly

`TeamAssemblyService.assembleTeams()` first gives every team one person per
prior-knowledge entry (picked from the team's slot, ordered by slot
priority), then fills teams randomly up to an even size from available
persons of that slot.

## Conventions

- Standalone components, `inject()` instead of constructor injection,
  signal `input()`/`output()`, built-in control flow (`@if`, `@for`).
- Selector prefix `app` (enforced by ESLint).
- Single quotes in TypeScript (`.editorconfig`), 2-space indent, SCSS.
- Shared styles live in `src/app/styles/`; Bootstrap 5 via
  `@ng-bootstrap/ng-bootstrap` and `bootstrap-icons` (`bi-…` classes).
- Respect the production budget of 4 kB warning / 8 kB error per component
  stylesheet; move larger styles into `src/app/styles/`.

## Internationalization

- Source locale is English; translations in `src/locale/messages.de.xlf`
  and `src/locale/messages.en.xlf`.
- Every user-facing text needs `i18n` (templates) or `$localize` (code)
  with an explicit ID in the form `@@t.<name>`.
- After adding or changing texts: run `pnpm ng extract-i18n`, then copy the
  new `trans-unit`s from root `messages.xlf` into both files in `src/locale/`
  and add the `<target>`. German targets follow German typography (ä ö ü ß,
  „…“, –).
- Missing translations only warn at build time; check the `de` build output
  for warnings.

## Testing

- Specs sit next to their source file (`*.spec.ts`).
- `test-import-data/` (git-ignored) holds sample files for manually testing
  the import in Settings, including deliberately invalid ones.
