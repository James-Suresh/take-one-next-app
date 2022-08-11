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
exports.updateUserProfileOnboarding = (req, res) => {
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

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("Onboarding Success");

      res.json({ accessToken, updatedUser });
    });
  });
};

/* ===================> Update User Profile from ADMIN <=================*/
exports.updateUserProfileAdmin = (req, res) => {
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

exports.updateUserNotesAdmin = (req, res) => {
  const { generalNotes, viewedUserId } = req.body;

  User.findOne({ _id: viewedUserId }, (err, user) => {
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

/* ===================> SETTINGS <===================*/
// ** Update user profile from user settings account-tab
exports.updateUserSettingsAccountTab = (req, res) => {
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
    user.email1 = email1;
    user.photoURL = photoURL;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ accessToken, updatedUser });
    });
  });
};

// ** Update user profile from user settings personal-tab
exports.updateUserSettingsPersonalTab = (req, res) => {
  const { address, city, postalCode, province, country } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.address = address;
    user.city = city;
    user.postalCode = postalCode;
    user.province = province;
    user.country = country;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ accessToken, updatedUser });
    });
  });
};

// ** Update user profile from user settings work-tab
exports.updateUserSettingsWorkTab = (req, res) => {
  const { shift, labour, travel, vehicle } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.shift = shift;
    user.labour = labour;
    user.travel = travel;
    user.vehicle = vehicle;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ accessToken, updatedUser });
    });
  });
};
