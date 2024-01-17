import { getServerSession } from 'next-auth';
import Nextauth from '../../auth/[...nextauth]';
import User from '@/model/User';
import db from '@/utils/db';
import axios from 'axios';
const chapaHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await db.connect();
      const session = await getServerSession(req, res, Nextauth);
      if (!session) {
        return res.status(401).json('signIn is Required');
      }

      const { user } = session;

      const findUser = await User.findOne({ email: user.email });
      if (!findUser) return res.status(404).json('user is not found');
      console.log(findUser);
      const randomNumber = Math.floor(Math.random() * 10000000);
      const randomString = 'semonun-chap' + randomNumber;
      const tx = randomString;
      const option = {
        headers: {
          Authorization: process.env.chapa_id,
          'Content-Type': 'application/json',
        },
      };
      const data = {
        amount: req?.body?.Total,
        currency: 'ETB',
        email: findUser?.email,
        first_name: 'Daniel',
        last_name: 'Nigatu',
        phone_number: '0916213371',
        tx_ref: tx,
        callback_url: `https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60`,
        return_url: 'https://semmonu.vercel.app/',
      };
      await axios
        .post('https://api.chapa.co/v1/transaction/initialize', data, option)
        .then(async (response) => {
          console.log(response.data);
          await User.findByIdAndUpdate(user._id, {
            $set: {
              txRef: tx,
            },
          });
          res.send(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      await db.disconnect();
    } catch (error) {
      console.log(error);
    }
  }
};

export default chapaHandler;
