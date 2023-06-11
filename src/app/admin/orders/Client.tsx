"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { usePagn } from "@lib/hooks";
import { useRouter } from "next/navigation";

export const TableButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <button className='' onClick={() => router.push(id)}>
      <ChevronRightIcon width={30} />
    </button>
  );
};

export const Pagination = () => {
  const { pagn, next, prev } = usePagn();

  return (
    <div className='p-4 flex justify-end'>
      <div className='flex gap-2'>
        <button onClick={prev}>Prev</button>
        <p>{pagn}</p>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};
