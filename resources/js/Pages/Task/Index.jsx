import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import TaskTable from "@/Components/TaskTable";
import { Link } from "@inertiajs/react";
const Index = ({ auth, tasks, filterParams = null, success }) => {
  //ensures that filter params are treated as an object when its empty

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2
            className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
          >
            Tasks
          </h2>
          <Link
            href={route("task.create")}
            className="text-white bg-blue-600 rounded-sm p-2"
          >
            New Task
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      {success && (
        <div className="bg-emerald-500 w-full text-white p-2">{success}</div>
      )}

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TaskTable tasks={tasks} filterParams={filterParams} />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
