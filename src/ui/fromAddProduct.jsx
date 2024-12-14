import React from "react";
import { Form, Input, Button } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { addNewProduct } from "../reqFrontEnd/request";
import Loading from "./loading";
export default function FromAddProduct({ buttonClose, fetchAgain, addText }) {
  const [action, setAction] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    setAction(`submit ${JSON.stringify(data)}`);
    const token = localStorage.getItem("apiToken");
    const dataForBe = {
      name: data.username,
      price: parseInt(data.price, 10),
      type: "/kg",
    };

    console.log(dataForBe);
    setIsLoading(true);
    const respons = await addNewProduct(token, dataForBe);

    if (respons.status.code === 201) {
      console.log("Produk berhasil ditambahkan!");

      fetchAgain();
      buttonClose();
      setIsLoading(false);
    } else {
      console.error("Gagal menambahkan produk:", respons.status.description);

      setIsLoading(false);
    }
  };
  return (
    <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-[390px] md:w-[490px] mx-auto mb-[50px]">
      {isLoading && <Loading />}
      <Form
        className="w-full  flex flex-col gap-4"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Nama"
          labelPlacement="outside"
          name="username"
          placeholder="Masukan nama produk"
          type="text"
        />

        <Input
          isRequired
          errorMessage="Please enter a price"
          label="Harga"
          labelPlacement="outside"
          name="price"
          placeholder="Masukan harga"
          type="number"
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            {addText}
          </Button>
          <Button type="reset" variant="flat" onClick={buttonClose}>
            Batal
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>{" "}
    </Card>
  );
}
