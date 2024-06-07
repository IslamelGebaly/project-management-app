import { Head, Link } from "@inertiajs/react";
import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TaskTable from "@/Components/TaskTable";
//Get individual user page
const Show = ({ auth, user, tasks, filterParams }) => {
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2
            className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
          >
            {`User "${user.name}"`}
          </h2>
          <Link
            href={route("user.edit", user.id)}
            className="text-white bg-emerald-600 rounded-sm p-2"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`User "${user.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="p-6 text-gray-900 dark:text-gray-100 gap-1">
                <section className="mt-2">
                  <label className="font-bold text-lg">User Id</label>
                  <p className="mb-4">{user.id}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Name</label>
                  <p className="mt-b">{user.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Email</label>
                  <p className="mb-4">{user.email}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Created at</label>
                  <p className="mb-4">{user.created_at}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Show;
