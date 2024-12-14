// DropdownComponent.jsx
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { div } from "framer-motion/client";
import {
  addNewTransaction,
  getDataPelanggan,
  getDataProduct,
} from "../reqFrontEnd/request";
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
import Loading from "./loading";
const FormAddTransaksi = ({ buttonClose, fetchAgain }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [qty, setQty] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [action, setAction] = React.useState(null);
  const token = localStorage.getItem("apiToken");
  const [customers, setCustomers] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchData = async () => {
    try {
      const responsDataCustomer = await getDataPelanggan(token);
      const responsDataPackage = await getDataProduct(token);
      if (
        responsDataCustomer.data &&
        responsDataPackage.data &&
        responsDataCustomer.data.length > 0 &&
        responsDataPackage.data.length > 0
      ) {
        console.log(
          "ini data nya bro ",
          responsDataCustomer,
          "kalo ini yang ke 2",
          responsDataPackage
        );

        console.log(responsDataCustomer);
        setPackages(responsDataPackage.data);
        setCustomers(responsDataCustomer.data);
      } else {
        setCustomers([]); // Atur data kosong jika tidak ada produk
      }
    } catch (error) {
      console.error("There was an error!", error);
      setCustomers([]);
    }
  };
  useEffect(() => {
    console.log("useEffect dijalankan");
    fetchData();
  }, []);

  const handleCustomerChange = (e) => {
    const selectedId = e.target.value;
    const selected = customers.find((cust) => cust.id == selectedId);
    setSelectedCustomer(selected);
    setIsConfirmed(false);
  };

  const handlePackageChange = (e) => {
    const selectedId = e.target.value;
    const selected = packages.find((pkg) => pkg.id == selectedId);
    setSelectedPackage(selected);
    setIsConfirmed(false);
    console.log(selected);
  };

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQty(value);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    console.log(selectedCustomer, selectedPackage, qty);
    if (!selectedCustomer || !selectedPackage || !qty) {
      console.log("Data tidak lengkap, salah satu elemen kosong.");

      return;
    }
    const dataForBe = {
      customerId: selectedCustomer.id,
      billDetails: [
        {
          product: {
            id: selectedPackage.id,
          },
          qty: qty,
        },
      ],
    };
    console.log(dataForBe);
    setIsLoading(true);
    const respons = await addNewTransaction(token, dataForBe);
    if (respons.status.code === 201) {
      console.log("transaksi berhasil ditambahkan!");
      // Tambahkan logika lain untuk mengubah state atau UI
      fetchAgain();
      buttonClose();
      setIsLoading(false);
    }
  };

  return (
    <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-[390px] md:w-[490px] mx-auto mb-[50px]">
      {isLoading && <Loading />}

      <Form className="w-full  flex flex-col gap-4" validationBehavior="native">
        <label className="block text-gray-700 font-semibold mb-2">
          Select Customer:
        </label>
        <select
          onChange={handleCustomerChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          disabled={isConfirmed}
        >
          <option value="">Choose a customer</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>
              {cust.name}
            </option>
          ))}
        </select>

        <label className="block text-gray-700 font-semibold mb-2">
          Select Package:
        </label>
        <select
          onChange={handlePackageChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          disabled={isConfirmed}
        >
          <option value="">Choose a package</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} -{" "}
              {pkg.price ? `Rp${pkg.price}` : "Harga tidak tersedia"}
            </option>
          ))}
        </select>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Quantity:
          </label>
          <input
            type="number"
            value={qty}
            min="1"
            onChange={handleQtyChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isConfirmed}
          />
        </div>

        {selectedCustomer && selectedPackage && (
          <div className="text-gray-700 mt-4">
            <p>
              Total:{" "}
              <strong>
                Rp{(selectedPackage.price * qty).toLocaleString()}
              </strong>
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Tambahkan
          </button>
          <button
            onClick={buttonClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Batal
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default FormAddTransaksi;
