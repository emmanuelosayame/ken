import { ContactForm } from "./Client";

const FaqPage = () => {
  return (
    <div className='pt-10 w-[95%]'>
      <h1 className='text-xl font-semibold text-center'>
        Frequently Asked Questions
      </h1>

      <div className='list-disc ml-2 my-4'>
        <li className='text-base font-medium'>How to place an Order</li>
        <p className='text-sm ml-4 mb-2'>
          Ordering on our platform is very easy. You can order directly or
          create a profile, then select between delivery or carry out, choose
          your store, pick your favorite meal, pay and its done! If you need any
          help, feel free to call your store directly. See list of stores here.
        </p>

        <li className='text-base font-medium'>
          How much is your delivery fee?
        </li>
        <p className='text-sm ml-4 mb-2'>
          Delivery is absolutely free, however we only accept delivery for
          orders of 1’500 ₦ and above.
        </p>

        <li className='text-base font-medium'>
          Do you accept payment via bank transfer?
        </li>
        <p className='text-sm ml-4 mb-2'>
          Our payment options are: online payment, cash or POS.
        </p>

        <li className='text-base font-medium'>
          I am not satisfied with my purchase, what can I do?
        </li>
        <p className='text-sm ml-4 mb-2'>
          We are always Hungry to Be Better and love to hear from you. Write us
          an email: food@delorand.com with your feedback and we will make it
          right for you.
        </p>

        <li className='text-base font-medium'>
          Why should I create a Food Profile?
        </li>
        <p className='text-sm ml-4 mb-2'>
          {
            "Are you hungry and don't want to waste time? With your Pizza Profile on dominos.ng you can order pizza within seconds, access your last 5 orders and don’t need to type your address ever again."
          }
        </p>
      </div>

      <ContactForm />
    </div>
  );
};

export default FaqPage;
