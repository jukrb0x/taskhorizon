#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::error::Error;
use tauri::{Manager, RunEvent};
use tracing::{debug, error};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command(async)]
async fn app_ready(app_handle: tauri::AppHandle) {
    let window = app_handle.get_window("main").unwrap();
    window.show().unwrap();
    println!("app is ready");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let app = tauri::Builder::default()
        .setup(|app| {
            let app = app.handle();

            app.windows().iter().for_each(|(_, window)| {
                // just for testing
                // window.hide().unwrap();

                #[cfg(target_os = "windows")]
                window.set_decorations(true).unwrap();

                #[cfg(target_os = "macos")]
                {
                    // let window = window.ns_window().unwrap();
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![app_ready])
        .build(tauri::generate_context!())?;

    app.run(move |app_handler, event| {
        if let RunEvent::ExitRequested { .. } = event {
            debug!("Closing all open windows...");
            app_handler
                .windows()
                .iter()
                .for_each(|(window_name, window)| {
                    debug!("closing window: {window_name}");
                    if let Err(e) = window.close() {
                        error!("failed to close window '{}': {:#?}", window_name, e);
                    }
                });

            app_handler.exit(0);
        }
    });

    Ok(())
}
