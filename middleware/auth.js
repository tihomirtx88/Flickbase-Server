const passport = require("passport");
const { ApiError } = require("./apiErros");
const httpStatus = require("http-status");
const { roles } = require("../config/roles");

const verify = (req, res, rights) => async (err, user) => {
  if (err || !user) {
    return reject(
      new ApiError(httpStatus.UNAUTHORIZED, "Sorry, you are not unauthorized"),
    );
  }
  req.user = {
    _id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    verify: user.verify,
  };

  if (rights && rights.length === 2) {
    const [action, resource] = rights;

    const rolePermissions = roles.can(req.user.role);

    if (!rolePermissions || typeof rolePermissions[action] !== "function") {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Sorry, you don't have enough rights",
      );
    }

    const permission = rolePermissions[action](resource);

    if (!permission.granted) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Sorry, you don't have enough rights",
      );
    }

    res.locals.permission = permission;
  }

  resolve();
};

const auth =
  (...rights) =>
  async (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err, user, info) => {
        try {
          await verify(req, res, rights)(err, user, info);
          next();
        } catch (error) {
          next(error);
        }
      },
    )(req, res, next);
  };

module.exports = auth;
