import ItemComponent from "@/components/Item";
import { itemS } from "@/server/db/schema";
import { db } from "@/server/drizzle";

const getData = async () => {
  try {
    const items = await db.select().from(itemS);
    if (items.length > 0) {
      return items;
    }
    throw new Error("no item");
  } catch (err) {
    const error = err as any;
    throw new Error(error);
  }
};

const MenuPage = async () => {
  const items = await getData();

  return (
    <>
      <div className='flex flex-col gap-4 w-11/12 mt-10'>
        {items.map((item) => (
          <ItemComponent key={item.id} data={item} />
        ))}
      </div>

      {/* <div className='pt-10 w-11/12'>
        <h1 className='font-medium my-2 text-xl'>Drinks</h1>
        <div className='grid grid-cols-2 gap-4 full '>
          <Drink />
          <Drink />
          <Drink />
          <Drink />
        </div>
      </div> */}
    </>
  );
};

const Drink = () => {
  return <div className='col-span-1 bg-white rounded-lg p-2 h-40'>yoo</div>;
};

export default MenuPage;
