import React from 'react';
import { CertificateContentProps } from '@/interfaces';

const CertificateContent = ({
  username,
  courseName,
  date,
}: CertificateContentProps) => {
  return (
    <div
      className='certificate-container relative text-center py-16 px-12 bg-white border rounded-md'
      style={{
        width: '100%',
        maxWidth: '800px',
        height: '565px', 
        margin: 'auto',
        backgroundImage: 'url(/images/Certificate_tbe.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className='absolute'
        style={{
          top: '270px', 
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '30px',
          fontWeight: 'bold',
          maxWidth: '85%', 
          overflow: 'hidden', 
          whiteSpace: 'nowrap', 
          textOverflow: 'ellipsis', 
        }}
      >
        {username}
      </div>
      <div
        className='absolute'
        style={{
          top: '332px', 
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '18px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        {courseName}
      </div>
      <div
        className='absolute'
        style={{
          top: '375px', 
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '18px',
        }}
      >
        {date}
      </div>
    </div>
  );
};

export default CertificateContent;
