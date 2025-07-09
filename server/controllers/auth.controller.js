export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const getVerifyEmailPage = (req, res) => {
  try {
    return res
      .status(200)
      .render("verifyEmail", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const signup = async (req, res) => {
  try {
  } catch (err) {
    req.flash("errors", "something went wrong");
    return res.status(400).redirect("/signup");
  }
};

export const login = async (req, res) => {
  try {
  } catch (err) {
    req.flash("errors", "something went wrong");
    return res.status(400).redirect("/login");
  }
};

export const logout = async (req, res) => {
  try {
  } catch (err) {
    req.flash("errors", "something went wrong");
    return res.status(400).redirect("/");
  }
};

export const sendEmailToken = async (req, res) => {
  try {
  } catch (err) {
    req.flash("errors", "something went wrong");
    return res.status(400).redirect("/verify/email");
  }
};

export const verifyEmail = async (req, res) => {
  try {
  } catch (err) {
    req.flash("errors", "something went wrong");
    return res.status(400).redirect("/verify/email");
  }
};
