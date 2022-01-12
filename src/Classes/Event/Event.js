import AdminUser from "../User/AdminUser/AdminUser";
import { util } from "../Util/Util";

class Event {
  constructor({
    title,
    description,
    enddate,
    startdate,
    location,
    completed,
    domain,
    category,
    level,
  }) {
    this.title = title;
    this.description = description;
    this.enddate = enddate;
    this.startdate = startdate;
    this.location = location;
    this.completed = completed;
    this.domain = domain;
    this.category = category;
    this.level = level;
  }
}

Event.updateAuthEvent = async function (event, userID, progressCB) {
  return new Promise(async (resolve, reject) => {
    try {
      let { auth } = await AdminUser.isAuthorizedAdmin(userID);
      if (auth === "Success") {
        let { imageFile, imageRef, imageURL, eventID, ...eventData } = event;
        if (imageFile) {
          ({ imageURL, imageRef } = await util.uploadFile(
            "events/EIM",
            progressCB,
            imageFile,
            imageRef
          ));
          updateEvent(
            {
              imageRef,
              imageURL,
              ...eventData,
            },
            eventID
          )
            .then(() => resolve([imageURL, imageRef]))
            .catch((error) => reject(error));
        } else {
          updateEvent(
            {
              ...eventData,
            },
            eventID
          )
            .then(() => resolve({ status: "Success " }))
            .catch((error) => reject(error));
        }
      } else throw Error("You are not authorized for this action");
    } catch (error) {
      reject(error);
    }
  });
};

Event.addAuthEvent = async function (event, userID, progressCB) {
  return new Promise(async (resolve, reject) => {
    try {
      let { auth } = await AdminUser.isAuthorizedAdmin(userID);
      if (auth === "Success") {
        let { imageFile, ...eventData } = event;
        let { imageURL, imageRef } = await util.uploadFile(
          "events/EIM",
          progressCB,
          imageFile
        );
        addEvent({
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
};

Event.deleteAuthEvent = async function (userID, eventID, imageRef) {
  return new Promise(async (resolve, reject) => {
    try {
      let { auth } = await AdminUser.isAuthorizedAdmin(userID);
      if (auth === "Success") {
        util
          .deleteFile(imageRef)
          .then(() => {
            deleteEvent(eventID)
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
};

async function updateEvent(details, eventID) {
  return util.database
    .ref("/events")
    .child(`/${eventID}`)
    .update({
      ...details,
    });
}

async function addEvent(details) {
  return util.database
    .ref()
    .child("/events")
    .push()
    .set({
      ...details,
    });
}

async function deleteEvent(eventID) {
  return util.database.ref(`/events/${eventID}`).remove();
}

export default Event;
