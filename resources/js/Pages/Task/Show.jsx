import { Head } from "@inertiajs/react";
import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TaskTable from "@/Components/TaskTable";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
//Get individual task page
const Show = ({ auth, task, tasks, filterParams }) => {
  return (
    <Authenticated
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
        >
          {`Task "${task.name}"`}
        </h2>
      }
    >
      <Head title={`Task "${task.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <img className="w-full h-64 object-cover" src={task.image_path} />
              <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-2 mt-2 gap-1">
                <section className="mt-2">
                  <label className="font-bold text-lg">Task Id</label>
                  <p className="mt-4">{task.id}</p>
                </section>

                <section className="mt-2">
                  <label className="font-bold text-lg">Status</label>
                  <p className="mt-4">
                    <span
                      className={
                        "px-2 py-1 rounded text-white" +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </p>
                </section>

                <section className="mt-2">
                  <label className="font-bold text-lg">Name</label>
                  <p className="mt-4">{task.name}</p>
                </section>

                <section className="mt-2">
                  <label className="font-bold text-lg">Priority</label>
                  <p className="mt-4">
                    <span
                      className={
                        "px-2 py-1 rounded text-white" +
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </p>
                </section>

                <section className="mt-2">
                  <label className="font-bold text-lg">Project Name</label>
                  <p className="mt-4">{task.project.name}</p>
                </section>

                <section className="mt-2">
                  <label className="font-bold text-lg">Assigned User</label>
                  <p className="mt-4">{task.assign_user.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Created by</label>
                  <p className="mt-4">{task.created_by.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Updated by</label>
                  <p className="mt-4">{task.updated_by.name}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Due Date</label>
                  <p className="mt-4">{task.due_date}</p>
                </section>
                <section className="mt-2">
                  <label className="font-bold text-lg">Created at</label>
                  <p className="mt-4">{task.created_at}</p>
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
