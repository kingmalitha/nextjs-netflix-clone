import Image from "next/image";
import { toast } from "react-hot-toast";

interface CustomMsgAlertProps {
  t: any;
}

const CustomMsgAlert = ({ t }: CustomMsgAlertProps) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5'>
            <Image
              className='h-10 w-10 rounded-full'
              src='https://res.cloudinary.com/dorssd7la/image/upload/v1687946617/image4_thhwnz.jpg'
              alt='Developer_Picture'
              width={40}
              height={40}
            />
          </div>
          <div className='ml-3 flex-1'>
            <p className='text-sm font-semibold text-gray-900'>Hey there!</p>
            <p className='mt-1 text-sm text-gray-500'>
              To purphase plan, use following card details:
            </p>
            <p className='mt-2 text-sm text-gray-500'>
              <span className='text-gray-800 font-medium'>card no :</span> 4242
              4242 4242 4242
              <br />
              <span className='text-gray-800 font-medium'>exp date :</span> any
              future date
              <br />
              <span className='text-gray-800 font-medium'>cvc :</span> any 3
              digit number
            </p>
          </div>
        </div>
      </div>
      <div className='flex border-l border-gray-200'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-800 hover:text-[#e50914] focus:outline-none focus:ring-2 focus:ring-[#e50914] '
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomMsgAlert;
