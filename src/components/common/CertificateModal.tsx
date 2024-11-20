import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useRef } from 'react';
import { toPng } from 'html-to-image'; // Library for generating images from HTML

const CertificateModal = ({
  isOpen,
  closeModal,
  certificateContent,
}: {
  isOpen: boolean;
  closeModal: () => void;
  certificateContent: React.ReactNode;
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, { quality: 1 });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'certificate.png';
        link.click();
      } catch (error) {
        console.error('Error generating certificate image:', error);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10'
      onClose={closeModal}
    >
      <div className='fixed inset-0 bg-black bg-opacity-30' />
      <div className='fixed inset-0 z-10 flex items-center justify-center p-4'>
        <DialogPanel className='w-full max-w-lg rounded-lg bg-white shadow-lg p-4'>
          <div className='flex justify-between items-center'>
            <DialogTitle className='text-lg font-semibold'>
              Your Certificate
            </DialogTitle>
            <button onClick={closeModal} className='text-sm'>
              ✖
            </button>
          </div>
          <div
            ref={certificateRef}
            className='mt-4 bg-gray-100 p-4 border rounded-md'
          >
            {certificateContent}
          </div>
          <div className='mt-6 text-center'>
            <button
              onClick={handleDownload}
              className='rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none'
            >
              Download Certificate
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CertificateModal;
