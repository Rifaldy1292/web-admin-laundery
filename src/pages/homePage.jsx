import React, { useState } from "react";
import ManagementProduct from "../component/managementProduct";
import MyNavbar from "../component/navbar";
import ManagementPelanggan from "../component/managementPelanggan";
import Transaction from "../component/transaction";
const Homepage = () => {
  const [menuSelect, setMenuSelect] = useState("");
  const handleMenuSelect = (childData) => {
    setMenuSelect(childData);
  };

  return (
    <div>
      <MyNavbar showMenu={handleMenuSelect} />

      {menuSelect === "management-product" && <ManagementProduct />}
      {menuSelect === "manajemen-pelanggan" && <ManagementPelanggan />}
      {menuSelect === "transaksi" && <Transaction />}
    </div>
  );
};

export default Homepage;
