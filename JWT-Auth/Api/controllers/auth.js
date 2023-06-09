const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    if (req.body.password.length < 8) {
      return res
        .status(401)
        .json('Password length should be atleast 8 characters long');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.validate();
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError('Please provide both email and password', 403);
    }

    const user = await User.findOne({ email: email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json('Wrong password');
    }
    const id = user._id;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    // this token should be stored in the client as it is used for authentication and authorization in the later requests
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(404).json('User not found');
  }
};
const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};

module.exports = { register, login, logout };
