import { writable } from "svelte/store";
function createAuth() {
  const { subscribe, update } = writable({
    isAuth: false,
    user: null,
  });

  return {
    subscribe,
    authorize: (user) =>
      update((auth) => ({
        ...auth,
        isAuth: true,
        user,
      })),
    logout: () =>
      update((auth) => ({
        ...auth,
        user: null,
        isAuth: false,
      })),
  };
}

export const auth = createAuth();
