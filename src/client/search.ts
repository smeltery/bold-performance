import { closeDialog } from "./dialog";
const dialog = document.querySelector<HTMLDialogElement>("#site-search")!;
const query = dialog.querySelector<HTMLInputElement>("input")!;
const links = [
  ...dialog.querySelectorAll<HTMLAnchorElement>(".search-results a"),
];
let opener: HTMLElement | null = null;
function filter() {
  const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  links.forEach((link) => {
    link.hidden = !terms.every((term) => link.dataset.search!.includes(term));
  });
  const count = links.filter((link) => !link.hidden).length;
  dialog.querySelector("[role=status]")!.textContent = `${count} results`;
  dialog.querySelector<HTMLElement>(".search-empty")!.hidden = count > 0;
}
async function open() {
  if (dialog.open) return;
  opener = document.activeElement as HTMLElement;
  const menu = document.querySelector<HTMLDialogElement>("#mobile-nav");
  if (menu?.open) {
    await closeDialog(menu);
    opener = document.querySelector(".menu-toggle");
  }
  requestAnimationFrame(() => {
    dialog.showModal();
    document.body.style.overflow = "hidden";
    query.value = "";
    filter();
    query.focus();
  });
}
document
  .querySelectorAll("[data-open-search]")
  .forEach((button) => button.addEventListener("click", open));
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (dialog.open) closeDialog(dialog);
    else open();
  }
});
dialog
  .querySelector("[data-close-search]")!
  .addEventListener("click", () => closeDialog(dialog));
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  opener?.focus();
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeDialog(dialog);
  }
});
query.addEventListener("input", filter);
dialog.addEventListener("keydown", (event) => {
  const visible = links.filter((link) => !link.hidden);
  const current = visible.indexOf(document.activeElement as HTMLAnchorElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (visible.length)
      visible[
        current < 0
          ? event.key === "ArrowDown"
            ? 0
            : visible.length - 1
          : (current + (event.key === "ArrowDown" ? 1 : -1) + visible.length) %
            visible.length
      ].focus();
  }
  if (event.key === "Enter") {
    const target =
      document.activeElement === query ? visible[0] : visible[current];
    if (target) {
      event.preventDefault();
      target.click();
    }
  }
});

export {};
