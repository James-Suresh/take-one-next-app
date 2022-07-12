const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { error, success, notFound } = require("../utils/response");

/* ===================> READ User Profile from ADMIN <=================*/
exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

/* ===================> Update User Profile from USER ONBOARDING <=================*/
exports.updateUserProfile = (req, res) => {
  //   console.log("update-user - req.user", req.user, "Update Data", req.body);
  const {
    firstName,
    lastName,
    nickName,
    since,
    phone1,
    phone2,
    email2,
    address,
    city,
    postalCode,
    province,
    country,
    position,
    shift,
    labour,
    vehicle,
    travel,
    photoURL,
  } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.nickName = nickName;
    user.since = since;
    user.phone1 = phone1;
    user.phone2 = phone2;
    user.email2 = email2;
    user.address = address;
    user.city = city;
    user.postalCode = postalCode;
    user.province = province;
    user.country = country;
    user.position = position;
    user.shift = shift;
    user.labour = labour;
    user.vehicle = vehicle;
    user.travel = travel;
    user.photoURL = photoURL;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }

      // console.log("USER ID", { _id: req.user._id });

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // console.log("AC TOKEN", accessToken);
      console.log("Onboarding Success");

      res.json({ accessToken, updatedUser });
      // res.json(updatedUser);
    });
  });
};

/* ===================> Update User Profile from USER SETTINGS ACCOUNT <=================*/
exports.updateUserSettingsAccount = (req, res) => {
  //   console.log("update-user - req.user", req.user, "Update Data", req.body);
  const {
    firstName,
    lastName,
    nickName,
    since,
    phone1,
    phone2,
    email1,
    email2,
    photoURL,
  } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.nickName = nickName;
    user.since = since;
    user.phone1 = phone1;
    user.phone2 = phone2;
    user.email2 = email2;
    user.email1 = email2;
    user.photoURL = photoURL;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      res.json(updatedUser);
    });
  });
};

/* ===================> Update User Profile from ADMIN <=================*/
exports.updateUserProfileAdmin = (req, res) => {
  //   console.log("update-user - req.user", req.user, "Update Data", req.body);
  const {
    legacy,
    crewParking,
    baseCamp,
    travel,
    requested,
    set,
    andyPriorityList,
    needsPotty,
    burned,
    doNotBook,
    viewedUserId,
  } = req.body;

  User.findByIdAndUpdate(
    viewedUserId,
    {
      $set: {
        legacy: legacy,
        crewParking: crewParking,
        baseCamp: baseCamp,
        travel: travel,
        requested: requested,
        set: set,
        andyPriorityList: andyPriorityList,
        needsPotty: needsPotty,
        burned: burned,
        doNotBook: doNotBook,
        viewedUserId: viewedUserId,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      res.json(updatedUser);
    }
  );
};

// User.findOne({ viewedUserId }, (err, user) => {
//   if (err || !user) {
//     return res.status(400).json({
//       error: "User not found",
//     });
//   }

//   user.legacy = legacy;
//   user.crewParking = crewParking;
//   user.baseCamp = baseCamp;
//   user.travel = travel;
//   user.requested = requested;
//   user.set = set;
//   user.andyPriorityList = andyPriorityList;
//   user.needsPotty = needsPotty;
//   user.burned = burned;
//   user.doNotBook = doNotBook;

//   user.save((err, updatedUser) => {
//     if (err) {
//       console.log("User update err", err);
//       return res.status(400).json({
//         error: "User update failed",
//       });
//     }
// res.json(updatedUser);
// });
//   });
// };

exports.updateUserNotesAdmin = (req, res) => {
  //   console.log("update-user - req.user", req.user, "Update Data", req.body);
  const { generalNotes, viewedUserId } = req.body;

  User.findOne({ viewedUserId }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.generalNotes = generalNotes;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      res.json(updatedUser);
    });
  });
};

// if (!email) {
//   return res.status(400).json({
//     error: "Email is required",
//   });
// } else {
//   user.email = email;
// }

// if (password) {
//   if (password.length < 6) {
//     return res.status(400).json({
//       error: "Password should be min 6 char long",
//     });
//   } else {
//     user.password = password;
//   }
// }

/* ===================> Update User Avatar <=================*/
exports.updateUserAvatar = (req, res) => {
  const { photoURL } = req.body;
  console.log("Avatar file URL", photoURL);
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.photoURL = photoURL;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("Avatar file URL update err", err);
        return res.status(400).json({
          error: "Avatar file URL update err",
        });
      }
      res.json(updatedUser);
    });
  });
};

/* ===================> Update User Avatar <=================*/
exports.getAllUsers = (req, res) => {
  const onSuccess = success(res);
  const onError = error(res);
  const invalidRequest = notFound(res);

  return User.find()
    .then((data) => (data ? onSuccess(data) : invalidRequest(data)))
    .catch(onError);
};

/* ===================> GET number of ADMINS <=================*/
exports.getNumAdmins = async (req, res) => {
  const onSuccess = success(res);
  const onError = error(res);
  const invalidRequest = notFound(res);

  return User.find({ role: "admin" })
    .then((data) => (data ? onSuccess(data) : invalidRequest(data)))
    .catch(onError);
};

/* ===================> GET number of USERS <=================*/
exports.getNumUsers = async (req, res) => {
  const onSuccess = success(res);
  const onError = error(res);
  const invalidRequest = notFound(res);

  return User.find({ role: "user" })
    .then((data) => (data ? onSuccess(data) : invalidRequest(data)))
    .catch(onError);
};
