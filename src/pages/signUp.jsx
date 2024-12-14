import React from "react";
import { Form, Input, Checkbox, Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { div } from "framer-motion/client";
import { postDataSignUp } from "../reqFrontEnd/request";
import { Link } from "react-router-dom";
import Loading from "../ui/loading";
import AlertNext from "../ui/alert";
export default function App() {
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [passwordTouched, setPasswordTouched] = React.useState(false);
  const [rePasswordTouched, setRePasswordTouched] = React.useState(false);
  const [isAlert, setIsAlert] = React.useState(false);
  const showAlert = () => {
    setIsAlert(true);

    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const getPasswordError = (value, reValue) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if (value !== reValue) {
      return "Password must match";
    }

    return null;
  };

  const getRePasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }

    return null;
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password, data.rePassword);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    // Terms validation - check if the checkbox is checked

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Prevent form submission if there are errors
    }

    const dataSignUp = {
      name: data.name,
      email: data.email,
      username: data.name,
      password: data.password,
      role: data.terms ? "admin" : "employee",
    };
    console.log(dataSignUp);
    const respons = await postDataSignUp(dataSignUp);
    setIsLoading(false);
    if (respons.status.code == 201) {
      console.log("tes");
      showAlert(); // Tampilkan alert sukses
    }
    console.log(respons);
    // Clear errors and submit
    setErrors({});
  };

  return (
    <div className="h-screen items-center flex">
      {isAlert && (
        <AlertNext
          description={"Silakan Login"}
          color={"success"}
          title={"Daftar Berhasil"}
        />
      )}
      <Card className="  p-5 w-[390px] md:w-[490px] mx-auto mb-[50px] flex justify-center items-center">
        <span className="text-xl font-bold mb-[50px]">
          Enigma Laundry - SignUp
        </span>
        <Form
          className="justify-center items-center w-full space-y-4"
          validationBehavior="native"
          validationErrors={errors}
          onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 w-[300px] md:w-[400px]">
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your name";
                }
                return errors.name;
              }}
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
            />

            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your email";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid email address";
                }
              }}
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />

            <Input
              isRequired
              errorMessage={
                passwordTouched ? getPasswordError(password, rePassword) : null
              }
              isInvalid={
                passwordTouched &&
                getPasswordError(password, rePassword) !== null
              }
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={(value) => {
                setPassword(value);
                setPasswordTouched(true); // Tandai password sudah disentuh
              }}
            />
            <Input
              isRequired
              errorMessage={
                rePasswordTouched ? getRePasswordError(rePassword) : null
              }
              isInvalid={
                rePasswordTouched && getRePasswordError(rePassword) !== null
              }
              label="Re-enter your password"
              labelPlacement="outside"
              name="reEnterPassword"
              placeholder="Re-enter your password"
              type="password"
              value={rePassword}
              onValueChange={(value) => {
                setRePassword(value);
                setRePasswordTouched(true); // Tandai rePassword sudah disentuh
              }}
            />
            <Checkbox
              isRequired
              classNames={{
                label: "text-small",
              }}
              isInvalid={!!errors.terms}
              name="terms"
              validationBehavior="aria"
              value="true"
              onValueChange={() =>
                setErrors((prev) => ({ ...prev, terms: undefined }))
              }
            >
              ceklist untuk admin user
            </Checkbox>
            <span>
              Sudah punya akun?{" "}
              <span className="font-semibold cursor-pointer">
                <Link to="/login">Login</Link>
              </span>
            </span>
            {errors.terms && (
              <span className="text-danger text-small">{errors.terms}</span>
            )}

            <div className="flex gap-4">
              <Button className="w-full" color="primary" type="submit">
                Daftar
              </Button>
            </div>
          </div>
        </Form>
      </Card>{" "}
      {isLoading && <Loading />}
    </div>
  );
}
