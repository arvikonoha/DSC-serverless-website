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

class FirebaseOP {
  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  constructor() {
    this.init();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  async signUpPopUp() {
    return new Promise(async (resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          try {
            let result = await firebase.auth().signInWithPopup(provider);
            let {
              user: { displayName, uid },
              additionalUserInfo: {
                profile: { email },
              },
            } = result;
            let user = await this.registerOrGetUser(uid, {
              email,
              displayName,
            });
            let { isMember, isAdmin, profileID } = user;
            resolve({
              user: { displayName, profileID },
              email,
              isMember,
              isAdmin,
              uid,
            });
          } catch (error) {
            reject(error);
          }
        })
        .catch((err) => reject(err));
    });
  }

  async appointAnAdmin(userID, email) {
    try {
      let { auth } = await this.isAuthorizedAdmin(userID);

      if (auth === "Success") {
        let { status, uid, displayName } = await this.isUser(email);

        if (status === "present") {
          let profileID = this.mapUIDtoPID(uid);
          return new Promise((resolve, reject) => {
            this.updateAdminList(email, uid)
              .then(() =>
                this.updateUserDetails(
                  {
                    isAdmin: true,
                    isMember: true,
                    profileID,
                  },
                  uid
                )
              )
              .then(() =>
                this.updateProfileDetails(
                  {
                    gmail: email,
                    imageURL: `https://avatar.oxro.io/avatar.svg?name=${email}`,
                    position: "Core Member",
                    linkedin: "",
                    twitter: "",
                    name: displayName,
                  },
                  profileID
                )
              )
              .then(() => resolve(email))
              .catch((err) => {
                reject(Error("Something went wrong"));
                console.log(err);
              });
          });
        } else throw Error(`${email} is not a user of this website`);
      } else throw Error("You are not authorized for this action");
    } catch (err) {
      throw err;
    }
  }

  mapUIDtoPID(uid) {
    return (
      uid
        .split("")
        .filter((letter) => isNaN(letter))
        .join("") + Date.now()
    );
  }

  async updateAdminList(email, uid) {
    return this.database.ref("/admins").child(`/${uid}`).set({
      email,
    });
  }

  async updateUserDetails(details, uid) {
    return this.database
      .ref("/users")
      .child(`/${uid}`)
      .update({
        ...details,
      });
  }

  async updateProfileDetails(details, profileID) {
    return this.database
      .ref("/team")
      .child(`/${profileID}`)
      .update({
        ...details,
      });
  }

  async authUpdateProfile(details, uid, profileID, progressCB) {
    try {
      let { auth } = await this.isAuthorizedAdmin(uid);
      if (auth === "Success") {
        return new Promise(async (resolve, reject) => {
          let imageFile = details.imageFile;
          delete details.imageFile;
          if (imageFile) {
            let { imageURL, imageRef } = await this.uploadFile(
              "profile/PRF",
              progressCB,
              imageFile,
              details.imageRef
            );
            details.imageURL = imageURL;
            details.imageRef = imageRef;
            this.updateProfileDetails(details, profileID)
              .then(() => resolve([imageURL, imageRef]))
              .catch(() => reject(Error("Something went wrong")));
          } else {
            this.updateProfileDetails(details, profileID)
              .then(() => resolve({ status: "Success" }))
              .catch(() => reject(Error("Something went wrong")));
          }
        });
      }
      throw Error("You are not authorized to do this action");
    } catch (err) {
      throw err;
    }
  }

  async isAuthorizedAdmin(adminID) {
    try {
      let snapshot = await this.database
        .ref(`/admins/${adminID}`)
        .once("value");
      let result = snapshot.val();
      if (result !== null) return Promise.resolve({ auth: "Success" });
      else return Promise.reject();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async isUser(email) {
    try {
      let snapshot = await this.database.ref(`/users`).once("value");
      let result = snapshot.val();
      if (result !== null) {
        for (let key of Object.keys(result))
          if (result[key]["email"] === email)
            return {
              uid: key,
              status: "present",
              displayName: result[key].displayName,
            };
        throw Error(`${email} is not a user of this website.`);
      } else throw Error(`Something went wrong`);
    } catch (error) {
      throw error;
    }
  }

  async registerOrGetUser(userID, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let snapshot = await this.database
          .ref(`/users/${userID}`)
          .once("value");

        let result = snapshot.val();

        if (result === null) {
          this.database
            .ref("/users")
            .child(userID)
            .set({
              isMember: false,
              isAdmin: false,
              profileID: "",
              ...user,
            })
            .then(() => {
              resolve(user);
            });
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async getEvents() {
    try {
      let snapshot = await this.database.ref("/events").once("value");

      let result = snapshot.val();

      if (result === null) return [];
      else return result;
    } catch (error) {
      throw error;
    }
  }

  async addAuthEvent(event, userID, progressCB) {
    return new Promise(async (resolve, reject) => {
      try {
        let { auth } = await this.isAuthorizedAdmin(userID);
        if (auth === "Success") {
          let { imageFile, ...eventData } = event;
          let { imageURL, imageRef } = await this.uploadFile(
            "events/EIM",
            progressCB,
            imageFile
          );
          this.database
            .ref()
            .child("/events")
            .push()
            .set({
              imageRef,
              imageURL,
              ...eventData,
            })
            .then(() => resolve({ status: "Success " }))
            .catch((error) => reject(error));
        } else throw Error("You are not authorized for this action");
      } catch (error) {
        reject(error);
      }
    });
  }

  async getProfile(profileID) {
    try {
      let result = await this.database.ref(`/team/${profileID}`).once("value");
      return result.val();
    } catch (err) {
      throw err;
    }
  }

  async getTeam() {
    try {
      let result = await this.database.ref(`/team`).once("value");
      return result.val();
    } catch (err) {
      throw err;
    }
  }

  async updateAuthEvent(event, userID, progressCB) {
    return new Promise(async (resolve, reject) => {
      try {
        let { auth } = await this.isAuthorizedAdmin(userID);
        if (auth === "Success") {
          let { imageFile, imageRef, imageURL, eventID, ...eventData } = event;
          if (imageFile) {
            ({ imageURL, imageRef } = await this.uploadFile(
              "events/EIM",
              progressCB,
              imageFile,
              imageRef
            ));
            this.database
              .ref()
              .child(`/events/${eventID}`)
              .update({
                imageRef,
                imageURL,
                ...eventData,
              })
              .then(() => resolve([imageURL, imageRef]))
              .catch((error) => reject(error));
          } else {
            this.database
              .ref()
              .child(`/events/${eventID}`)
              .update({
                ...eventData,
              })
              .then(() => resolve({ status: "Success " }))
              .catch((error) => reject(error));
          }
        } else throw Error("You are not authorized for this action");
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteAuthEvent(userID, eventID, imageRef) {
    return new Promise(async (resolve, reject) => {
      try {
        let { auth } = await this.isAuthorizedAdmin(userID);
        if (auth === "Success") {
          this.storage
            .ref(imageRef)
            .delete()
            .then(() => {
              this.database
                .ref(`/events/${eventID}`)
                .remove()
                .then(() => {
                  resolve({ status: "Success" });
                })
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        } else throw Error("You are not authorized for this action");
      } catch (error) {
        reject(error);
      }
    });
  }

  async uploadFile(fileUrl, progressCB, imageFile, prevRef) {
    return new Promise(async (resolve, reject) => {
      let imageRef = "";
      if (prevRef) imageRef = prevRef;
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
}

export default FirebaseOP;
