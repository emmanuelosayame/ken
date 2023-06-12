import Select from "@/components/radix/Select";
import { Content, Root, Trigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export const Filter = () => {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-between p-3 w-full'>
        <Root>
          <Trigger
            disabled
            className='bg-white rounded-lg py-1 w-40 sm:w-44 shadow-sm border text-sm sm:text-base disabled:opacity-70'>
            Last 3 months
          </Trigger>
          <Content className='fixed center-x top-36 w-44 h-44 rounded-xl bg-white/75 shadow-md p-3'>
            <div className=''>
              <h2>yoo</h2>
            </div>
          </Content>
        </Root>
        <Select
          contentStyles='bg-white'
          triggerStyles='w-36 sm:w-40 bg-white'
          onValueChange={(e) => {
            router.replace(`/my-orders?status=${e}`);
          }}
          defaultSelected='all'
          selectList={[
            { item: "All", value: "all" },
            { item: "Pending", value: "pending" },
            { item: "Paid", value: "paid" },
            { item: "Prepred", value: "prepared" },
            { item: "Delivered", value: "delivered" },
          ]}
        />
      </div>
    </>
  );
};
