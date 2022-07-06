const WhitelistUser = require("../models/whitelist");
const { error, success, notFound } = require("../utils/response");

/* ===================> Get <=================*/
exports.getWhitelistEmail = (req, res) => {
  const { email } = req.params;
  const onSuccess = success(res);
  const onError = error(res);
  const invalidRequest = notFound(res);

  return WhitelistUser.findOne({ email })
    .then((data) => (data ? onSuccess(data) : invalidRequest(data)))
    .catch(onError);
};

/* ===================> Add <=================*/
exports.createWhitelistEmail = (req, res) => {
  const { email } = req.body;
  // const { role } = req.body;
  const onSuccess = success(res);
  const onError = error(res);

  return WhitelistUser.create({ email }).then(onSuccess).catch(onError);
};

/* ===================> Delete <=================*/
exports.deleteWhitelistEmail = (req, res) => {
  const { email } = req.params;
  const onSuccess = success(res);
  const onError = error(res);

  return WhitelistUser.deleteOne({ email }).then(onSuccess).catch(onError);
};
