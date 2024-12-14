import { Alert } from "@nextui-org/react";

export default function AlertNext({ description, color, title }) {
  return (
    <div className="z-50 fixed top-[25px] left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[70%]  mx-auto">
      <Alert description={description} title={title} color={color} />
    </div>
  );
}
