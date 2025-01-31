export function smoothScroll(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  // @ts-ignore
  const blockID = e.target?.hash;
  const blockEl: HTMLElement | undefined = document.querySelector(blockID);
  if (!blockEl) return;

  e.preventDefault();
  blockEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
