<h1>
  <p align="center">
    <samp>
      twain
    </samp>
  </p>
</h1>

Project twain would like to integrate a regular to-do list app (tasking) with a calendar app (scheduling) to make a smooth experience for daily tasking and scheduling.

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
