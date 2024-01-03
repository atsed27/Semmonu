import User from '@/model/User';
import db from '@/utils/db';
import bcryptjs from 'bcryptjs';

const findUser = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      await db.connect();
      const userFind = await User.findOne({ email: req.body.email });
      if (!userFind) return res.status(404).json('email is not found');
      await db.disconnect();
      res.status(200).json(userFind);
    } catch (error) {
      console.log(error);
      res.status(500).json('server error');
    }
  }
  if (req.method === 'PUT') {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);
    try {
      await db.connect();
      const userFind = await User.findById(req.body.id);
      if (!userFind) return res.status(404).json('user is not found');
      const passCompare = await bcryptjs.compare(
        req.body.password,
        userFind.password
      );
      if (passCompare) return res.status(400).json('used password before');
      await db.disconnect();
      await User.findByIdAndUpdate(
        req.body.id,
        {
          $set: {
            password: hash,
          },
        },
        {
          $new: true,
        }
      );
      res.status(200).json('password is updated successfully');
    } catch (error) {
      console.log(error);
      res.status(500).json('serer error');
    }
  }
};

export default findUser;
