import React, { useState } from "react";

const DeleteConfirmationPelanggan = ({ onConfirm, confirmDelete }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Konfirmasi Hapus
          </h2>
          <p className="text-gray-600 mt-2">
            Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat
            dibatalkan.
          </p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={() => onConfirm(false)}
            >
              Tidak
            </button>
            <button
              onClick={confirmDelete}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationPelanggan;
