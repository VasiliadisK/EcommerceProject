import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function ErrorBlock({ message }) {
  return (
    <div className="flex items-center gap-3 bg-red-950 border border-red-800 text-red-300 text-sm mt-4 px-4 py-3 rounded-lg">
      <FontAwesomeIcon icon={faCircleExclamation} className="text-red-400 text-base shrink-0" />
      <p>{message}</p>
    </div>
  );
}