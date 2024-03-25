import { Card } from "./../components/Card";

export const Signup = () => {
  return (
    <div className="bg-background_gray h-screen flex items-center justify-center">
      <Card
        signIn={false}
        message={"Enter your information to create an account"}
      ></Card>
    </div>
  );
};
