const User = require('./model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ✅ CREATE a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, role, category } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) return res.status(400).json({ message: 'user already exists' });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({
      username: username,
      password: hash,
      role: role,
      category: category,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ READ all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ READ single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { username, role, category, password } = req.body;

 const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username : username, role : role, category : category, password : hash},
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    console.log(password, user);
    let decrypt = await bcrypt.compare(password, user.password);
    if (!decrypt) {
      throw new Error("invalid user credentials");
    } else {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.jwt_key || "shhhh");
      res.status(201).json({
        data: { accessToken: accessToken },
        success: true,
        message: "user logged in successfully"
      })
    }
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}