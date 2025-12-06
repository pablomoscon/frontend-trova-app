import { DetailRowProps } from "../../../Interfaces/UserInterface";

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => (
  <div className='flex items-center gap-4'>
    {icon}
    <p className='leading-relaxed text-gray-700'>
      {label && (
        <span className='font-semibold text-gray-600 mr-1'>{label}</span>
      )}
      {value}
    </p>
  </div>
);

export default DetailRow; 