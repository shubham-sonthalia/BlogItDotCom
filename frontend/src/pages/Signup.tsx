import { Card } from "./../components/Card";

export const Signup = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <Card signIn={false} message={""}></Card>
        <div className="bg-background_gray flex flex-col justify-center pl-10">
          <div className="font-extrabold text-3xl font-sans max-w-5xl">
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="font-sans text-sm font-bold text-black mt-2">
            Jules Winnfield
          </div>
          <div className="font-sans text-sec_text_gray text-sm mt-1">
            CEO, Acme Inc
          </div>
        </div>
      </div>
    </>
  );
};
