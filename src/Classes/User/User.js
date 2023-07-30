import { util } from "../Util/Util";
/**
 * Used to encapsulate the details regarding general website users
 * @class User
 */

class User {
  /**
   * @constructs User
   * @param {{displayName:string, userID:string, profileID:string, isAdmin:boolean, isMember:boolean}} details
   * @param {string} userID
   * @param {string} profileID
   * @param {boolean} isAdmin
   * @param {boolean} isMember
   */
  constructor({
    displayName,
    userID,
    profileID = "",
    isAdmin = false,
    isMember = false,
  }) {
    this.displayName = displayName;
    this.userID = userID;
    this.profileID = profileID;
    this.isAdmin = isAdmin;
    this.isMember = isMember;
  }

  /**
   * @memberof User.prototype
   * @returns {Promise<boolean>}
   */
  async isValidAdmin() {
    let result = await util.database.ref(`/admins/${this.userID}`);
    if (result) throw Error("You are not authorized for this action");
    else return true;
  }
}

/**
 * @param {string} email
 * @returns {Promise<{userID:string,displayName:string}>}
 * @throws {Error}
 */

User.isValidUser = async function (email) {
  try {
    let snapshot = await await util.database.ref(`/users`).once("value");
    let result = snapshot.val();

    if (!result) throw Error("Something went wrong :/");

    for (let key of Object.keys(result))
      if (result[key].email === email)
        return {
          userID: key,
          displayName: result[key].displayName,
          status: "present",
        };
    throw Error(`${email} is not an authorized user`);
  } catch (err) {
    throw err;
  }
};

/**
 * @async
 * @param {string} userID
 * @param {{email:string,displayName:string}} user
 * @returns {Promise<User>}
 */

User.registerOrGetUser = async function (userID, user) {
  try {
    let iUser = await getUser(userID);
    if (iUser === null) {
      return registerUser(user, userID);
    } else {
      iUser.userID = userID;
      return new User(iUser);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * @param {{email,displayName}} user
 * @param {string} userID
 * @returns {Promise<User >}
 */

function registerUser(user, userID) {
  return new Promise(async (resolve, reject) => {
    util.database
      .ref("/users")
      .child(userID)
      .set({
        isMember: false,
        isAdmin: false,
        profileID: "",
        ...user,
      })
      .then(() => {
        resolve(
          new User({
            isAdmin: false,
            isMember: false,
            profileID: "",
            ...user,
          })
        );
      })
      .catch((err) => reject(err));
  });
}

/**
 * @param {string} userID
 * @returns {Promise<any>}
 */

async function getUser(userID) {
  let result = await util.database.ref(`/users/${userID}`).once("value");
  return result.val();
}

export async function updateUserDetails(details, uid) {
  return util.database
    .ref("/users")
    .child(`/${uid}`)
    .update({
      ...details,
    });
}

export default User;
