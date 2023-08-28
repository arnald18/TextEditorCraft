const butInstall = document.getElementById("buttonInstall");

let installPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  butInstall.style.visibility = "visible";
});

butInstall.addEventListener("click", async (event) => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  installPrompt = null;
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed!";
});

window.addEventListener("appinstalled", (event) => {
  console.log("appinstalled", event);
});
