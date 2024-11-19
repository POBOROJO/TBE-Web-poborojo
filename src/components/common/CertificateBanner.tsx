import { CertificateBannerProps } from '@/interfaces';
import { FaTrophy, FaLock } from 'react-icons/fa';

const CertificateBanner = ({ totalChapters, completedChapters }: CertificateBannerProps) => {
  if (completedChapters < totalChapters) {
    // Locked Banner
    return (
      <div className='bg-purple-400 text-white rounded-lg p-4 mt-6 shadow-md flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold'>Download Certificate</h2>
          <p className='text-sm'>Complete All to Get Your Certificate.</p>
        </div>
        <div className='text-2xl'> <FaLock /> </div> 
      </div>
    );
  }

  // Unlocked Banner
  return (
    <div className='bg-purple-600 text-white rounded-lg p-4 mt-6 shadow-md flex items-center justify-between'>
      <div>
        <h2 className='text-lg font-bold'>Congratulations! Certificate Unlocked</h2>
      </div>
      <div className='text-2xl'><FaTrophy /></div> 
    </div>
  );
};

export default CertificateBanner;
