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
        className={`rounded-lg  cursor-pointer group hover:bg-neutral-400 
        flex w-6 md:w-7 h-6 md:h-7 items-center justify-center shadow-md text-red-600 ${
          checked ? "bg-red-300" : "bg-neutral-300"
        }`}>
        {checked && <CheckIcon width={"85%"} />}
      </button>
    </div>
  );
};

export default Checkbox;
