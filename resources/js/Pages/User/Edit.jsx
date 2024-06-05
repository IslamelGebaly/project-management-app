import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";

const Edit = ({ auth, user }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
        >
          Edit User "{user.name}"
        </h2>
      }
    >
      <Head title={`Edit User "${user.name}"`} />
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={submit}>
                <section className="mb-2">
                  <InputLabel htmlFor="user_name" value="User Name" />
                  <TextInput
                    className="w-3/5"
                    name="name"
                    id="user_name"
                    value={data.name}
                    onChange={(e) => {
                      setData("name", e.target.value);
                    }}
                  />
                  <InputError message={errors.name} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="email" value="Email" />
                  <TextInput
                    className="w-3/5"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => {
                      setData("email", e.target.value);
                    }}
                  />
                  <InputError message={errors.email} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="password" value="Password" />
                  <TextInput
                    type="password"
                    className="w-3/5"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => {
                      setData("password", e.target.value);
                    }}
                  />
                  <InputError message={errors.password} />
                </section>
                <section className="mb-2">
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                  />
                  <TextInput
                    type="password"
                    className="w-3/5"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => {
                      setData("password_confirmation", e.target.value);
                    }}
                  />
                  <InputError message={errors.password_confirmation} />
                </section>
                <div className="text-right">
                  <Link
                    href={route("user.index")}
                    className="p-2 text-gray-800 bg-gray-100 rounded transition-all hover:bg-gray-200 mr-2 text-sm"
                  >
                    Cancel
                  </Link>
                  <button className="p-2 text-white bg-blue-600 rounded hover:bg-blue-800 text-sm">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Edit;
