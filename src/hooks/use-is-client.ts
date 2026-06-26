import { useSyncExternalStore } from "react";

/**
 * Returns `false` during SSR and the first client render, then `true` once
 * hydrated — without calling setState inside an effect (which the React
 * hooks linter disallows). Use to gate client-only UI like theme toggles.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
