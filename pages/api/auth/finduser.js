import User from '@/model/User';
import db from '@/utils/db';

const findUser = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      await db.connect();
      const userFind = await User.findOne({ email: req.body.email });
      if (!userFind) return res.status(404).json('email is not found');
      await db.disconnect();
      res.status(200).json('ok');
    } catch (error) {
      console.log(error);
      res.status(500).json('server error');
    }
  }
};

export default findUser;
