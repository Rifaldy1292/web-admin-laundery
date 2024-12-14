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
  { name: "PHONE NUMBER", uid: "price" },
  { name: "ADDRESS", uid: "update" },
  { name: "ACTIONS", uid: "actions" },
];
import { useState } from "react";
import avatarWash from "../assets/image.png";
import FromAddPelanggan from "../ui/fromAddPelanggan.jsx";
import FromEditPelanggan from "../ui/fromEditPelanggan.jsx";
import { getDataPelanggan, deletePelanggan } from "../reqFrontEnd/request";
import DeleteConfirmationPelanggan from "../ui/formDeletePelanggan.jsx";
import { useNavigate } from "react-router-dom";

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

export default function ManagementPelanggan() {
  const [showFromAddProduct, setShowFromAddProduct] = useState(false);
  const [showFromEditProduct, setShowFromEditProduct] = useState(false);
  const [users, setUsers] = useState([]);
  const [removeProduct, setRemoveProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const toke = import.meta.env.VITE_API_TOKEN;
  const token = localStorage.getItem("apiToken");
  const handleRemove = (id) => {
    setRemoveProduct(id);
    console.log(id);
    console.log(removeProduct);
  };
  const navigate = useNavigate();
  const handleEdit = (id) => {
    setShowFromEditProduct(true);
    setEditProduct(id);
    console.log(id);
    console.log("id diedit");
  };
  const fetchData = async () => {
    setUsers([
      {
        id: "loading...",
        name: "loading...",
        phoneNumber: "loading...",
        address: "loading...",
        createdAt: "loading...",
        updatedAt: "loading...",
      },
    ]);
    try {
      const respons = await getDataPelanggan(token);

      if (respons.data && respons.data.length > 0) {
        setUsers(respons.data);
      } else {
        setUsers([]);
      }
      console.log(respons.data);
      console.log(users);
    } catch (error) {
      console.log("gagal login");
      localStorage.removeItem("apiToken");
      navigate("/login");
      return;

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
              {user.phoneNumber}
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
            {user.address}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleEdit(user.id)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleRemove(user.id)}
              >
                <DeleteIcon />
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
            <TableRow key={item.id}>
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
        Tambahkan Pelanggan
      </Button>
      {showFromAddProduct && (
        <FromAddPelanggan
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
          // confirmEdit={() => handleEditConfirmation(editProduct)}
          id={editProduct}
        />
      )}
      {removeProduct && (
        <DeleteConfirmationPelanggan
          onConfirm={setRemoveProduct}
          confirmDelete={() => handleDeleteConfirmation(removeProduct)}
        ></DeleteConfirmationPelanggan>
      )}
    </div>
  );
}