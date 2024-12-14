import React from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { postDataLogin } from "../reqFrontEnd/request";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../ui/loading";
import AlertNext from "../ui/alert";
export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = React.useState(false);

  const [isAlertFail, setIsAlertFail] = React.useState(false);
  const showAlert = () => {
    setIsAlert(true);

    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };
  const showAlertFail = () => {
    setIsAlertFail(true);

    setTimeout(() => {
      setIsAlertFail(false);
    }, 3000);
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    try {
      const respons = await postDataLogin(data);

      if (respons.status.code === 201) {
        localStorage.setItem("apiToken", respons.data.token);
        console.log("Login sukses");
        showAlert();
        navigate("/");
      } else {
        console.log("Login gagal:", respons.status.description);
      }
    } catch (error) {
      showAlertFail();
      console.error("Terjadi kesalahan saat login:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen items-center flex">
      {isAlert && <AlertNext color={"success"} title={"Login Berhasil"} />}
      {isAlertFail && (
        <AlertNext color={"danger"} title={"Data Tidak ada di database"} />
      )}
      {isLoading && <Loading />}
      <Card className=" p-5 w-[390px] md:w-[490px] mx-auto mb-[50px] flex justify-center items-center">
        <span className="text-xl font-bold mb-[50px]">
          Enigma Laundry - Admin Login
        </span>
        <Form
          className=" flex flex-col gap-4 mx-auto  w-[300px] md:w-[400px]"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Username"
            labelPlacement="outside"
            name="Username"
            placeholder="Enter your username"
            type="text"
            className="font-semibold"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="Password"
            labelPlacement="outside"
            name="Password"
            placeholder="Enter your password"
            type="Password"
            className="font-semibold"
          />
          <div>
            belum punya akun?{" "}
            <span className="font-semibold cursor-pointer">
              <Link to="/sign-up">Daftar</Link>
            </span>
          </div>
          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>{" "}
      </Card>{" "}
    </div>
  );
}
