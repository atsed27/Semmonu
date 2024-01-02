import User from '@/model/User';
import db from '@/utils/db';
import { getServerSession } from 'next-auth';

const findUser = async (req, res) => {
  if (req.method == 'GET') {
    try {
      const session = await getServerSession(req, res);
      const { user } = session;
      if (!session) return res.status(401).json('sign is required');
      db.connect();
      const find = await User.findOne({ email: user.email });
      if (!find) return res.status(404).json('user is not found');
      db.disconnect();
      res.status(200).json(find);
      //const findUser = await User.findOne({email:req.body.email})
    } catch (error) {
      console.log(error);
    }
  }
};

export default findUser;
