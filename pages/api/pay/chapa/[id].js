import User from '@/model/User';
import db from '@/utils/db';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const chapaPay = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      if (session === null) {
        return res.status(400).json('sign in requierd');
      }
      const { user } = session;
      await db.connect();
      const findUser = await User.findById(user._id);
      if (!findUser) return res.status(404).json('user not found');
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
        amount: 12,
        currency: 'ETB',
        email: 'danielnigatu09@gmail.com',
        first_name: 'Daniel',
        last_name: 'Nigatu',
        phone_number: '0916213371',
        tx_ref: tx,
        callback_url: `https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60`,
        return_url: 'https://www.google.com/',
      };
      await axios
        .post('https://api.chapa.co/v1/transaction/initialize', data, option)
        .then(async (response) => {
          console.log(response.data);
          await User.findByIdAndUpdate(user._id,{
            $set:{
              txRef:tx
            }
          })
          res.send(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export default chapaPay;
