import { useModal } from "@/context/ModalContext";
import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Form = ({ refetch }: { refetch: UseQueryResult["refetch"] }) => {
  const { setOpen } = useModal();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const gender = formData.get("gender") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const data = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      emailAddress,
    };

    axios
      .post("https://interview.canduit.org/api/users", data, {
        headers: {
          "x-api-key": "63cfb3f2-4e2f-47f9-9ae8-cc5af4cc30dd",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data?.data?.success) {
          toast.success("User created successfully!");
          refetch();
          form.reset();
          setOpen(false);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex flex-col w-full p-6 rounded-md sm:p-10">
      <div className="mb-4 md:mb-8 text-center">
        <h1 className="my-1 lg:my-2 text-xl lg:text-3xl font-bold text-black">
          Create new user
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-600">
          Enter details to create user account.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 text-black">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm capitalize"
            >
              First name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm capitalize">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2 text-sm">
              Gender
            </label>
            <select
              name="gender"
              className="w-full px-3 py-2.5 border rounded-md border-gray-300 bg-gray-50"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="dob" className="block mb-2 text-sm capitalize">
              Date of birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-black"
              required
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="emailAddress"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-2 font-semibold rounded-md bg-[#1565C0] text-white cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
