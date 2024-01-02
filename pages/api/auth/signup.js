import User from '@/model/User';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await db.connect();
      const findUser = await User.findOne({ email: req.body.email });
      if (findUser) return res.status(404).json('email is already found');
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();
      await db.disconnect();
      res.status(200).json('new user is created successfully');
    } catch (error) {
      console.log(error);
    }
  }
};

export default signup;
