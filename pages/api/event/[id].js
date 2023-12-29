import Events from '@/model/Events';
import db from '@/utils/db';

const GetEvent = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await db.connect();
      const findEvent = await Events.findById(req.query.id);
      if (!findEvent) {
        await db.disconnect();
        return res.status(404).json('event is not found');
      }
      await db.disconnect();
      res.status(200).json(findEvent);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default GetEvent;
