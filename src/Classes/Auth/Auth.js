class Auth {}
import User from "../User/User";
import * as firebase from "firebase/app";

Auth.signUpPopUp = async function () {
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

          let user = await User.registerOrGetUser(uid, {
            email,
            displayName,
          });

          resolve({
            user: new User(user),
            email,
          });
        } catch (error) {
          reject(error);
        }
      })
      .catch((err) => reject(err));
  });
};

export default Auth;
