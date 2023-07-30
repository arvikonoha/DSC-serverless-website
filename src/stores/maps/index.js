import { writable } from "svelte/store";
function createMap() {
  const { subscribe, update } = writable({
    isReady: false,
    map: null,
    isDone: false,
  });

  return {
    subscribe,
    mapReady: () => update((data) => ({ ...data, isReady: true })),
    mapNotReady: () => update((data) => ({ ...data, isReady: false })),
    mapInit: (map) => update((data) => ({ ...data, map })),
  };
}

export const maps = createMap();
