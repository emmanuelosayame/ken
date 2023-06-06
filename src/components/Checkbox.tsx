import { CheckIcon } from "@heroicons/react/20/solid";

const Checkbox = ({
  checked,
  handleChange,
}: {
  checked: boolean;
  handleChange: () => void;
}) => {
  return (
    <div className=''>
      <button
        type='button'
        onClick={handleChange}
        className={`rounded-lg  cursor-pointer group hover:brightness-75 
        flex w-6 md:w-7 h-6 md:h-7 items-center justify-center shadow-sm text-red-600 border border-red-500 ${
          checked ? "" : ""
        }`}>
        {checked && <CheckIcon width={"85%"} />}
      </button>
    </div>
  );
};

export default Checkbox;
