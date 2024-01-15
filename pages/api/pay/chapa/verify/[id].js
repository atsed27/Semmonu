import db from '@/utils/db';
import axios from 'axios';
import User from '@/model/User';
const chapaVerification = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await db.connect();

      let tx_ref = req.query.id;
      console.log(tx_ref);
      const option = {
        headers: {
          Authorization: process.env.chapa_id,
          'Content-Type': 'application/json',
        },
      };
      await axios
        .get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, option)
        .then(async (response) => {
          console.log(response.data);
          console.log('hy');
          const userFind = await User.findOne({ txRef: tx_ref });
          console.log(userFind);
          if (!userFind) return res.status(404).json('user is not found');
          const user = await User.findByIdAndUpdate(
            userFind._id,
            {
              $set: {
                userType: 'basic',
              },
            },
            {
              new: true,
            }
          );
          await db.disconnect();
          console.log(user);
          res.send(user);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export default chapaVerification;
