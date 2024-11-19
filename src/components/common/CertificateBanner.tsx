import React from 'react';
import { CertificateBannerProps } from '@/interfaces';

const CertificateBanner = ({
  backgroundColor,
  heading,
  subtext,
  icon: Icon,
  isLocked,
  onClick,
}: CertificateBannerProps) => {
  return (
    <div
      className={`${backgroundColor} text-white rounded-lg py-2 px-4 mt-6 shadow-lg flex items-center justify-between`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div>
        <h2 className='text-lg font-bold'>{heading}</h2>
        <p className='text-sm'>{subtext}</p>
      </div>
      <div className='text-2xl'>{Icon && <Icon />}</div>
    </div>
  );
};

export default CertificateBanner;
