import { readable } from "svelte/store";
import Firebase from "../../Firebase/Firebase";

function createFBInstance() {
  return readable(new Firebase());
}

export const fbInstance = createFBInstance();
