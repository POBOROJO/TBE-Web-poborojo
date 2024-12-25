import { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { User } from '@/interfaces'; 

interface UseCertificateProps {
  user: User | null;
}

interface UseCertificateReturn {
  certificateRef: React.RefObject<HTMLDivElement>;
  handleDownload: () => Promise<void>;
  userName: string;
  userEmail: string;
}

export const useCertificate = ({ user }: UseCertificateProps): UseCertificateReturn => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setUserEmail(user.email || '');
    }
  }, [user]);

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, { quality: 1 });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${userName}-webinar-certificate.png`;
        link.click();
      } catch (error) {
        console.error('Error generating certificate image:', error);
      }
    }
  };

  return {
    certificateRef,
    handleDownload,
    userName,
    userEmail,
  };
};