import { Head } from "@inertiajs/react";
import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TaskTable from "@/Components/TaskTable";
//Get individual project page
const Show = ({ auth, project, tasks, filterParams }) => {
  return (
    <Authenticated
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
        >
          {`Project "${project.name}"`}
        </h2>
      }
    >
      <Head title={`Project "${project.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <img
                className="w-full h-64 object-cover"
                src={project.image_path}
              />
              <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-2 mt-2 gap-1">
                <section className="mt-2">
                  <label className="font-bold text-lg">Project Id</label>
                  <p className="mt-4">{project.id}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Name</label>
                  <p className="mt-4">{project.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Description</label>
                  <p className="mt-4">{project.description}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Status</label>
                  <p className="mt-4">{project.status}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Created by</label>
                  <p className="mt-4">{project.created_by.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Updated by</label>
                  <p className="mt-4">{project.updated_by.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Due Date</label>
                  <p className="mt-4">{project.due_date}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Created at</label>
                  <p className="mt-4">{project.created_at}</p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <TaskTable
            tasks={tasks}
            filterParams={filterParams}
            hideProjectColumn={true}
          />
        </div>
      </div>
    </Authenticated>
  );
};

export default Show;
