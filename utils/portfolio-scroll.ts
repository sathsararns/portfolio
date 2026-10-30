const storageKey = "portfolio-return-position";

export function rememberProjectPosition(slug: string) {
  try {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({ slug, top: window.scrollY, width: window.innerWidth })
    );
  } catch {
    // The project anchor still works when browser storage is unavailable.
  }
}

export function getProjectPosition(slug: string): number | null {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (
      saved?.slug === slug &&
      saved.width === window.innerWidth &&
      typeof saved.top === "number" &&
      Number.isFinite(saved.top) &&
      saved.top >= 0
    ) {
      return saved.top;
    }
  } catch {
    // Fall back to the project anchor if storage is unavailable or invalid.
  }
  return null;
}
