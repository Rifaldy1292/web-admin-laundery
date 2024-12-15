import { Card } from "@nextui-org/react";

const DetailTransaction = ({ id, data, buttonClose }) => {
  const billData = id === data?.id ? data : null;

  const { customer, user, billDetails } = billData;

  return (
    <div className=" min-h-screen">
      <Card className="w-[500px] absolute top-[50px] left-1/2 transform -translate-x-1/2 z-10">
        <div className="p-6 max-w-5xl mx-auto font-sans">
          <h2 className="text-3xl font-semibold text-gray-800">
            Detail Transaksi
          </h2>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">
              Informasi Pelanggan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <p>
                <strong>Nama:</strong> {customer?.name || "Tidak ada data"}
              </p>
              <p>
                <strong>No. Telepon:</strong>{" "}
                {customer?.phoneNumber || "Tidak ada data"}
              </p>
              <p>
                <strong>Alamat:</strong> {customer?.address || "Tidak ada data"}
              </p>
              <p>
                <strong>Dibuat Pada:</strong>{" "}
                {customer?.createdAt
                  ? new Date(customer.createdAt).toLocaleString()
                  : "Tidak ada data"}
              </p>
              <p>
                <strong>Diperbarui Pada:</strong>{" "}
                {customer?.updatedAt
                  ? new Date(customer.updatedAt).toLocaleString()
                  : "Tidak ada data"}
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">
              Informasi Admin
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <p>
                <strong>Nama:</strong> {user?.name || "Tidak ada data"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "Tidak ada data"}
              </p>
              <p>
                <strong>Username:</strong> {user?.username || "Tidak ada data"}
              </p>
              <p>
                <strong>Role:</strong> {user?.role || "Tidak ada data"}
              </p>
              <p>
                <strong>Dibuat Pada:</strong>{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "Tidak ada data"}
              </p>
              <p>
                <strong>Diperbarui Pada:</strong>{" "}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleString()
                  : "Tidak ada data"}
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-[30px]">
              Detail Produk
            </h3>
            {billDetails.length > 0 ? (
              billDetails.map((detail, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <p>
                    <strong>Produk:</strong>{" "}
                    {detail.product?.name || "Tidak ada data"}
                  </p>
                  <p>
                    <strong>
                      Harga per {detail.product?.type || "Tidak ada data"}:
                    </strong>{" "}
                    Rp {detail.product?.price?.toLocaleString() || "0"}
                  </p>
                  <p>
                    <strong>Jumlah:</strong> {detail.qty || 0}
                  </p>
                  <p>
                    <strong>Total Harga:</strong> Rp{" "}
                    {(detail.price * detail.qty).toLocaleString() || "0"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada detail produk.</p>
            )}
          </section>
        </div>{" "}
        <div className="flex gap-2 mx-auto mb-[20px]">
          <button
            onClick={buttonClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Keluar
          </button>
        </div>
      </Card>
    </div>
  );
};

export default DetailTransaction;
