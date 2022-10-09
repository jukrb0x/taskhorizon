<h1>
  <p align="center">
    <samp>
      CalItDone
    </samp>
  </p>
</h1>

Project CalItDone integrates To-Do list app (tasking) with Calendar app (scheduling) to make a smooth experience for
daily tasking and scheduling.

## Branches

- `main` : stable branch
- `dev` : active development
- `feat/*` : modular feature development
- `fix/*` : bug fix branch
- `release/*` : release version

## Architecture

Version `0.1` :

```mermaid
graph TB;
    A{Tauri Core} <-- Command & Event --> B[WebView]
    A --> Notification
    B --> React[React] <-- States & Data--> rd_store[Redux Store] -- Data Persistence --> ls[(LocalStorage)]
    React -- Render --> vdom[VirtualDOM]
    vdom --> cv(Calendar View)
    vdom --> tv(Todo View)
    React -. IPC through Tauri Core .-> Notification

```

## Tech Todo
## Infrastructure
- [x] React (TypeScript)
- [x] Tauri
- [ ] Redux
- [x] React-Router

## Toolchain
- [ ] husky
- [ ] lint-staged
- [ ] stylelint
- [ ] prettier
- [ ] commitlint