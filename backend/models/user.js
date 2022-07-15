const mongoose = require("mongoose");
const crypto = require("crypto");

// User Schema
const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
      // select: false,
    },
    salt: {
      type: String,
      // select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: null,
    },

    photoURL: {
      type: String,
      default: null,
    },

    // custom fields
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    nickName: {
      type: String,
      default: null,
    },
    since: {
      type: Date,
      default: null,
    },

    phone1: {
      type: String,
      default: null,
    },
    phone2: {
      type: String,
      default: null,
    },
    email2: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    postalCode: {
      type: String,
      default: null,
    },
    province: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      enum: ["LSP", "LPA"],
      default: "LSP",
    },
    shift: {
      type: String,
      enum: ["Day", "Night", "Day, Night"],
      default: "Day",
    },

    doNotBook: {
      type: Boolean,
      default: null,
    },
    vehicle: {
      type: Boolean,
      default: null,
    },
    andyPriorityList: {
      type: Boolean,
      default: null,
    },
    legacy: {
      type: Boolean,
      default: null,
    },
    labour: {
      type: Boolean,
      default: null,
    },
    crewParking: {
      type: Boolean,
      default: null,
    },
    baseCamp: {
      type: Boolean,
      default: null,
    },
    set: {
      type: Boolean,
      default: null,
    },
    needsPotty: {
      type: Boolean,
      default: null,
    },
    asap: {
      type: Boolean,
      default: null,
    },
    travel: {
      type: Boolean,
      default: null,
    },
    requested: {
      type: Boolean,
      default: null,
    },
    burned: {
      type: Boolean,
      default: null,
    },
    availability: {
      type: Boolean,
      default: null,
    },
    generalNotes: {
      type: String,
      default: null,
    },

    // every document should have create and update at
    // createdAt: {
    //   type: Schema.Types.Date,
    //   required: true,
    //   default: () => new Date(),
    // },
    // updatedAt: {
    //   type: Schema.Types.Date,
    //   required: true,
    //   default: () => new Date(),
    // },
  },
  { timestamps: true, versionKey: false }
);

// Virtual
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("users", userSchema);

// const User = connection.model("users", userSchema);
// // User.createIndexes();

// export default User;
