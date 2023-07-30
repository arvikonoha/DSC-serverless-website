import User, { updateUserDetails } from "../User";
import { util } from "../../Util/Util";

async function updateAdminProfile(details, profileID) {
  return util.database
    .ref("/team")
    .child(`/${profileID}`)
    .update({
      ...details,
    });
}

class AdminUser extends User {
  constructor({ displayName, userID, profileID }) {
    super({ displayName, userID, profileID, isAdmin: true, isMember: true });
  }

  async appointAnAdmin(email) {
    try {
      let { auth } = await AdminUser.isAuthorizedAdmin(this.userID);

      if (auth === "Success") {
        let { status, userID, displayName } = await User.isValidUser(email);

        if (status === "present") {
          let profileID = util.mapUIDtoPID(userID);
          return new Promise((resolve, reject) => {
            updateAdminList(email, userID)
              .then(() =>
                updateUserDetails(
                  {
                    isAdmin: true,
                    isMember: true,
                    profileID,
                  },
                  userID
                )
              )
              .then(() =>
                updateAdminProfile(
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
}

AdminUser.isAuthorizedAdmin = async function (adminID) {
  try {
    let snapshot = await util.database.ref(`/admins/${adminID}`).once("value");
    let result = snapshot.val();
    if (result !== null) return Promise.resolve({ auth: "Success" });
    else return Promise.reject(Error("You are not an authorized admin"));
  } catch (error) {
    return Promise.reject(error);
  }
};

async function updateAdminList(email, uid) {
  return util.database.ref("/admins").child(`/${uid}`).set({
    email,
  });
}

export default AdminUser;
