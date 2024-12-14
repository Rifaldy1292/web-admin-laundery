import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Form, Input, Button } from "@nextui-org/react";
export const columns = [
  { name: "NAME", uid: "name" },
  { name: "PRODUK YANG DI BELI", uid: "price" },
  { name: "TOTAL BAYAR", uid: "update" },
  { name: "ACTIONS", uid: "actions" },
];
import { useState } from "react";
import avatarWash from "../assets/image.png";
import FormAddTransaksi from "../ui/fromAddTransaksi.jsx";
import FromEditPelanggan from "../ui/fromEditPelanggan.jsx";
import {
  getDataTransaction,
  deletePelanggan,
  getDataSpecificTransaction,
} from "../reqFrontEnd/request";
import DeleteConfirmationPelanggan from "../ui/formDeletePelanggan.jsx";
import { v4 as uuidv4 } from "uuid";
import DetailTrasaction from "./detailTransaction.jsx";
import Loading from "../ui/loading.jsx";
export const EyeIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Transaction() {
  const [showFromAddProduct, setShowFromAddProduct] = useState(false);
  const [showFromEditProduct, setShowFromEditProduct] = useState(false);
  const [users, setUsers] = useState([]);
  const [removeProduct, setRemoveProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const token = localStorage.getItem("apiToken");
  const [detailTrasaction, setDetailTrasaction] = useState(false);
  const [idTransaction, setIdTransaction] = useState(false);
  const [dataTrasaction, setDataTrasaction] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleShowTransaksi = async (id) => {
    setIdTransaction(id);
    try {
      setIsLoading(true);
      const respons = await getDataSpecificTransaction(token, id);
      setDataTrasaction(respons.data);
      console.log(respons.data);
      console.log(users);
      setDetailTrasaction(true);
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error!", error);
      setIsLoading(false);
    }

    console.log(id);
  };
  const fetchData = async () => {
    setUsers([
      {
        idCustomer: "loading...",
        id: "loading...",
        name: "loading...",
        phoneNumber: "loading...",
        address: "loading...",
        createdAt: "loading...",
        updatedAt: "loading...",
        idTransaksi: "loading...",
        idAdmin: "loading...",
        nameAdmin: "loading...",
        idBill: "loading...",
        qtyBill: 0,
        billPrice: 0,
        billName: "loading...",
        totalPrice: 0,
      },
    ]);
    try {
      const respons = await getDataTransaction(token);
      if (respons.data && respons.data.length > 0) {
        const result = {
          status: respons.status, // Mengambil status dari respons
          data: respons.data.map((item) => ({
            idCustomer: item.customer.id,
            id: uuidv4(),
            name: item.customer.name,
            phoneNumber: item.customer.phoneNumber,
            address: item.customer.address,
            createdAt: item.customer.createdAt,
            updatedAt: item.customer.updatedAt,
            idTransaksi: item.id, // Mengambil id transaksi dari root objek
            idAdmin: item.user.id, // Mengambil id admin dari user
            nameAdmin: item.user.name, // Mengambil nama admin dari user
            idBill: item.billDetails[0].billId, // Mengambil id bill dari billDetails
            qtyBill: item.billDetails[0].qty, // Mengambil qty dari billDetails
            billPrice: item.billDetails[0].price,
            billName: item.billDetails[0].product.name, // Mengambil price dari billDetails
            totalPrice: item.billDetails[0].price * item.billDetails[0].qty,
          })),
          paging: respons.paging, // Menyimpan data paging seperti yang ada pada respons
        };
        console.log("inni bro", result.data);
        setUsers(result.data);
        setIsLoading(false); // Menyimpan data yang sudah dimodifikasi ke dalam state
      } else {
        setUsers([]);
        // Atur data kosong jika tidak ada produk
      }
      console.log("ini data asli", respons.data);
      console.log(users);
    } catch (error) {
      console.error("There was an error!", error);
      setUsers([]);
    }
  };
  const handleDeleteConfirmation = async (productId) => {
    console.log("Menghapus produk dengan ID:", productId);
    const respons = await deletePelanggan(token, productId);

    fetchData();
    setRemoveProduct(false);
  };
  useEffect(() => {
    console.log("useEffect dijalankan");
    fetchData();
  }, []);
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        console.log("Customer Data:"); // Menampilkan seluruh objek user untuk memeriksa isinya

        return (
          <User
            avatarProps={{ radius: "lg", src: avatarWash }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.billName}
            </p>
          </div>
        );
      case "update":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.update]}
            size="sm"
            variant="flat"
          >
            {user.totalPrice}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleShowTransaksi(user.idBill)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-[300px]  md:w-[1000px] mx-auto">
      {isLoading && <Loading />}
      <Table
        aria-label="Example table with custom cells"
        className=" mt-[30px]"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.idBill}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button
        className="w-full mt-[30px] mb-[40px]"
        color="primary"
        type="submit"
        onClick={() => setShowFromAddProduct(true)}
      >
        Tambah Transaksi
      </Button>
      {showFromAddProduct && (
        <FormAddTransaksi
          buttonClose={() => setShowFromAddProduct(false)}
          fetchAgain={fetchData}
          addText={"Tambahkan"}
        />
      )}
      {showFromEditProduct && (
        <FromEditPelanggan
          buttonClose={() => setShowFromEditProduct(false)}
          fetchAgain={fetchData}
          addText={"Edit"}
          id={editProduct}
        />
      )}
      {removeProduct && (
        <DeleteConfirmationPelanggan
          onConfirm={setRemoveProduct}
          confirmDelete={() => handleDeleteConfirmation(removeProduct)}
        ></DeleteConfirmationPelanggan>
      )}
      {detailTrasaction && (
        <DetailTrasaction
          id={idTransaction}
          data={dataTrasaction}
          buttonClose={() => setDetailTrasaction(false)}
        ></DetailTrasaction>
      )}
    </div>
  );
}
