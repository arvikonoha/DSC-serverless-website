import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PID,
  storageBucket: BUCKET,
  messagingSenderId: MSG_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

console.log(firebaseConfig)

class Util {
  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  constructor() {
    this.init();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth = firebase.auth();
  }

  async uploadFile(fileUrl, progressCB, imageFile, prevRef) {
    return new Promise(async (resolve, reject) => {
      let imageRef = "";

      // if already a reference to the image exists then update it
      if (prevRef) imageRef = prevRef;
      // if not make a new image reference
      else
        imageRef = `${fileUrl}-${
          Date.now() + imageFile.name.match(/\..*$/)[0]
        }`;

      let uploadTask = this.storage.ref(imageRef).put(imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          progressCB(
            Math.round(
              (snapshot.task.snapshot.bytesTransferred * 100) /
                snapshot.totalBytes
            )
          );
        },
        (error) => {
          reject(error);
        },
        async () => {
          let imageURL = await uploadTask.snapshot.ref.getDownloadURL();
          resolve({ imageURL, imageRef });
        }
      );
    });
  }

  mapUIDtoPID(uid) {
    return (
      uid
        .split("")
        .filter((letter) => isNaN(letter))
        .join("") + Date.now()
    );
  }

  deleteFile(fileRef) {
    return this.storage.ref(fileRef).delete();
  }

  async signOut() {
    return this.auth.signOut();
  }
}

export const util = new Util();
