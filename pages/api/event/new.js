import { getServerSession } from 'next-auth';
import Nextauth from '../auth/[...nextauth]';
import Events from '@/model/Events';
import db from '@/utils/db';
import User from '@/model/User';
const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await db.connect();
      const session = await getServerSession(req, res, Nextauth);
      if (!session) {
        return res.status(403).json('user Login is required');
      }
      const { user } = session;
      const findUser = await User.findOne({ email: user.email });
      if (!findUser) return res.status(404).json('user is not found');
      const createEvent = new Events({
        ...req.body.createEvent,
        userId: findUser._id,
        countInStock: req.body.createEvent.total,
        totalTicket: req.body.createEvent.total,
      });
      await createEvent.save();
      await db.disconnect();
      res.status(201).json('event is created');
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default handler;
