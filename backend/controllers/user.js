const User = require("../models/user");
const { error, success, notFound } = require("../utils/response");

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

// mock.onGet('/apps/user').reply(config => {
//   const { id } = config.params
//   const userData = data.users.filter(user => user.id === parseInt(id, 10))
//   if (userData.length) {
//     return [200, userData[0]]
//   } else {
//     return [404, { message: 'Unable to find the requested user!' }]
//   }
// })

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
    user.legacy = legacy;
    user.crewParking = crewParking;
    user.baseCamp = baseCamp;
    user.travel = travel;
    user.requested = requested;
    user.set = set;
    user.andyPriorityList = andyPriorityList;
    user.needsPotty = needsPotty;
    user.burned = burned;
    user.doNotBook = doNotBook;

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
