import React from 'react';
import Image from 'next/image';
import awash from '../public/Image/Pay/Awash.png';
import CBE from '../public/Image/Pay/CBE.png';
import Abisiniya from '../public/Image/Pay/Abisiniya.png';
import Zemen from '../public/Image/Pay/zemen.png';
import chapa from '../public/Image/Pay/chapa.png';
import TeleBirr from '../public/Image/Pay/Telebirr.png';
import Stripe from '../public/Image/Pay/stripe.png';
function Slider() {
  return (
    <div className="logo">
      <div className="logo-slider ">
        <Image src={awash} alt="awash" />
        <Image src={TeleBirr} alt="awash" />
        <Image src={CBE} alt="awash" />
        <Image src={chapa} alt="chapa" />
        <Image src={Abisiniya} alt="awash" />
        <Image src={Stripe} alt="stripe" />
        <Image src={Zemen} alt="Zemen" />
      </div>
    </div>
  );
}

export default Slider;
