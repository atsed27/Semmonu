import React from 'react';
import Image from 'next/image';
import awash from '../public/Image/Pay/Awash.png';
import CBE from '../public/Image/Pay/CBE.png';
import Abisiniya from '../public/Image/Pay/Abisiniya.png';
import Zemen from '../public/Image/Pay/zemen.png';

function Slider() {
  return (
    <div className="logo">
      <div className="logo-slider ">
        <Image src={awash} alt="awash" />

        <Image src={CBE} alt="awash" />
        <Image src={Abisiniya} alt="awash" />

        <Image src={Zemen} alt="Zemen" />
      </div>
    </div>
  );
}

export default Slider;
