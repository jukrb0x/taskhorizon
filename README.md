<h1>
  <p align="center">
    <samp>
      Calitdone
    </samp>
  </p>
</h1>

Project Calitdone integrates To-Do list app (tasking) with Calendar app (scheduling) to make a smooth experience for
daily tasking and scheduling.

## Branches

- `main` : stable branch
- `dev` : active development
- `feat/*` : modular feature development
- `fix/*` : bug fix branch
- `release/*` : release version

## Architecture

Version `0.1 (draft)` :

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

## Development

```shell
# install dependencies
pnpm i

# start web dev server
pnpm dev

# start Tauri dev window
# -- it will start both web dev server and Tauri dev window
pnpm tauri dev

# build for production
pnpm tauri build
```

## Framework

### Infrastructure

| Name                                    | Description                                     |
|-----------------------------------------|-------------------------------------------------|
| [Tauri](https://tauri.app/)             | Cross-platform framework (Electron alternative) |
| [React](https://reactjs.org)            | Frontend UI framework                           |
| [Redux](https://redux.js.org)           | State management, Single Source of Truth (SSOT) |
| [React Router](https://reactrouter.com) | Routing for React                               |

### Frontend

| Name              | Description          |
|-------------------|----------------------|
| Tailwind CSS      | Custom UI Components |
| Semi-UI           | UI Components        |
| styled-components | Custom UI Components |

### DX

| Name        | Description           |
|-------------|-----------------------|
| Prettier    | Code formatter        |
| Stylelint   | CSS linter            |
| Husky       | Git hooks             |
| lint-staged | Git hooks             |
| Commitizen  | Git commit convention |

## Modules

> WIP

- Todo List App
- TodoEvent (Todo + Event) Data Structure
- Calendar View
- Data Persistence
- Prisma, Prisma client rust, LocalForge, Redux

## TODO

See [TODO](./TODO.md)