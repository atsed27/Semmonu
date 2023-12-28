import Users from '@/model/User';
import db from '../../utils/db';
import data from '@/utils/data';
import Events from '@/model/Events';

const handler = async (req, res) => {
  await db.connect();
  await Users.deleteMany();
  await Users.insertMany(data.users);
  await Events.deleteMany();
  await Events.insertMany(data.events);
  db.disconnect();
  res.send('ok');
};

export default handler;
