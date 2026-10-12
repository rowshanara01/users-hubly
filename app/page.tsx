"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import Pagination from "@/components/Pagination";
import PaginationDetails from "@/components/PaginationDetails";
import TableSkeleton from "@/components/TableSkeleton";
import { Modal, ModalBody } from "@/components/Modal";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import Form from "@/components/Form";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  emailAddress: string;
  createdAt: string;
}

const UsersPage = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["usersData", page],
    queryFn: async () => {
      const res = await axios(
        `https://interview.canduit.org/api/users?page=${page}`,
        {
          headers: {
            "x-api-key": "63cfb3f2-4e2f-47f9-9ae8-cc5af4cc30dd",
          },
        }
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          Error loading users:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="p-3 sm:p-6 overflow-hidden space-y-4 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold text-[#1565C0]">
          User List
        </h2>
        <Modal>
          <ModalTriggerButton title="Upload" icon={<FaPlus />} />
          <ModalBody>
            <Form refetch={refetch} />
          </ModalBody>
        </Modal>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[#F2F2F2] text-black">
            <tr>
              <th className="px-4 py-1 md:py-3">Name</th>
              <th className="px-4 py-1 md:py-3">Email</th>
              <th className="px-4 py-1 md:py-3">Gender</th>
              <th className="px-4 py-1 md:py-3">Birth Date</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <TableSkeleton />
            ) : data?.users?.length ? (
              data.users.map((user: IUser, idx: number) => (
                <tr
                  key={user._id}
                  className={
                    data?.users?.length !== idx + 1
                      ? "border-b border-b-gray-300"
                      : ""
                  }
                >
                  <td className="px-4 py-3 font-medium capitalize">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-3">{user.emailAddress}</td>
                  <td className="px-4 py-3 capitalize">{user.gender}</td>
                  <td className="px-4 py-3">
                    {new Date(user.dateOfBirth).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 pb-2 mt-auto gap-3">
        <PaginationDetails pagination={data?.pagination} />

        <Pagination
          pages={data?.pagination?.pages}
          handlePageChange={handlePageChange}
          page={page}
        />
      </div>
    </section>
  );
};

export default UsersPage;