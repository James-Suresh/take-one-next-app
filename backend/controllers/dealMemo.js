const dealMemoSchema = require("../models/dealMemo");
const { error, success, notFound } = require("../utils/response");

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId, {
    hashed_password: 0,
    salt: 0
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    
    res.json(user);
  });
};

/* ===================> Get <=================*/
exports.getAllDealMemos = (req, res) => {
  const onSuccess = success(res);
  const onError = error(res);
  const invalidRequest = notFound(res);

  return dealMemoSchema
    .find()
    .then((data) => (data ? onSuccess(data) : invalidRequest(data)))
    .catch(onError);
};

/* ===================> Add <=================*/
exports.createNewDealMemo = (req, res) => {
  const {
    showName,
    season,
    seasonStartDate,
    payrollPhone,
    payrollEmail,
    onboardingURL,
    dealMemoURL,
  } = req.body;

  console.log(dealMemoURL);

  const onSuccess = success(res);
  const onError = error(res);

  return dealMemoSchema
    .create({
      showName,
      season,
      seasonStartDate,
      payrollPhone,
      payrollEmail,
      onboardingURL,
      dealMemoURL,
    })
    .then(onSuccess)
    .catch(onError);
};

/* ===================> Delete <=================*/
exports.deleteDealMemo = (req, res) => {
  const { phoneNumber } = req.params;

  const onSuccess = success(res);
  const onError = error(res);

  return dealMemoSchema
    .deleteOne({ phoneNumber })
    .then(onSuccess)
    .catch(onError);
};

/* ===================> Update <=================*/
exports.updateDealMemo = (req, res) => {
  const { phoneNumber } = req.params;

  const onSuccess = success(res);
  const onError = error(res);

  return dealMemoSchema
    .deleteOne({ phoneNumber })
    .then(onSuccess)
    .catch(onError);
};
