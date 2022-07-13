const AvailabilitiesSchema = require("../models/availabilities");
const { error, success, notFound } = require("../utils/response");

// ----------------- GET REQUEST USER ----------------//
exports.getAvalability = (req, res) => {
  const userId = req.user._id;

  const onSuccess = success(res);
  const onError = error(res);
  console.log(userId);

  AvailabilitiesSchema.find({ userId }).then(onSuccess).catch(onError);
};

// ----------------- GET REQUEST ADMIN----------------//
exports.getAvalabilityAdmin = (req, res) => {
  const { _id } = req.params;
  const userId = _id;

  const onSuccess = success(res);
  const onError = error(res);

  AvailabilitiesSchema.find({ userId }).then(onSuccess).catch(onError);
};

// ----------------- POST REQUEST ----------------//
exports.createAvalability = (req, res) => {
  const { shift, availabilityDate } = req.body;
  const userId = req.user._id;

  const onSuccess = success(res);
  const onError = error(res);
  console.log(userId);

  return AvailabilitiesSchema.create({ shift, availabilityDate, userId })
    .then(onSuccess)
    .catch(onError);
};

// ----------------- DELETE REQUEST ----------------//
exports.deleteAvalability = (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  const onSuccess = success(res);
  const onError = error(res);

  AvailabilitiesSchema.deleteOne({ _id }).then(onSuccess).catch(onError);
};

// ----------------- DELETE REQUEST ----------------//
// exports.deletePastAvalabilities = (req, res) => {
//   const { authId } = req.params;

//   const onSuccess = success(res);
//   const onError = error(res);

//   AvailabilitiesSchema.delete({ userId: authId && availabilityDate })
//     .then(onSuccess)
//     .catch(onError);
// };

// ----------------- UPDATE REQUEST ----------------//
//   exports.updateAvalability = (req, res) => {
//     const { _id } = req.params;
//     const userId = req.header(userIdHeader);

//     const data = req.body;

//     const onSuccess = success(res);
//     const onError = error(res);

//     return AvailabilitiesSchema.updateOne(
//       //matching key value pairs -- FILTER DATA -- //
//       { _id, userId },

//       // the object that we want to save -- UPDATE DATA -- //
//       { ...data },
//       // options -- DATA OPTIONS -- //
//       {
//         runValidators: true,
//         upsert: true,
//       }
//     )
//       .then(onSuccess)
//       .catch(onError);
//   };
