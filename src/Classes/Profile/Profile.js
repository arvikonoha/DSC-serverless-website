import AdminUser from "../User/AdminUser/AdminUser";
import { util } from "../Util/Util";

async function updateAdminProfile(details, profileID) {
  return util.database
    .ref("/team")
    .child(`/${profileID}`)
    .update({
      ...details,
    });
}

class Profile {
  constructor({
    gmail,
    imageURL,
    position = "Core member",
    linkedin,
    twitter,
    name,
    imageRef = "",
  }) {
    this.gmail = gmail;
    this.imageURL = imageURL;
    this.position = position;
    this.linkedin = linkedin;
    this.twitter = twitter;
    this.name = name;
    this.imageRef = imageRef;
  }
}

Profile.authUpdateProfile = async function (
  details,
  uid,
  profileID,
  progressCB
) {
  try {
    let { auth } = await AdminUser.isAuthorizedAdmin(uid);
    if (auth === "Success") {
      return new Promise(async (resolve, reject) => {
        let imageFile = details.imageFile;

        // because you are not storing imageFile in the database
        delete details.imageFile;

        if (imageFile) {
          let { imageURL, imageRef } = await util.uploadFile(
            "profile/PRF",
            progressCB,
            imageFile,
            details.imageRef
          );
          details.imageURL = imageURL;
          details.imageRef = imageRef;

          updateAdminProfile(details, profileID)
            .then(() => resolve([imageURL, imageRef]))
            .catch(() => reject(Error("Something went wrong")));
        } else {
          updateAdminProfile(details, profileID)
            .then(() => resolve({ status: "Success" }))
            .catch(() => reject(Error("Something went wrong")));
        }
      });
    }
    throw Error("You are not authorized to do this action");
  } catch (err) {
    throw err;
  }
};

Profile.getAdminProfile = async function (profileID) {
  try {
    let result = await util.database.ref(`/team/${profileID}`).once("value");
    return result.val();
  } catch (err) {
    throw err;
  }
};

Event.getTeam = async function () {
  try {
    let result = await util.database.ref(`/team`).once("value");
    return result.val();
  } catch (err) {
    throw err;
  }
};

export default Profile;
