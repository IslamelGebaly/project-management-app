import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Create = ({ auth }) => {
  return (
    <Authenticated
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
        >
          New Project
        </h2>
      }
    >
      <Head title="New Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <section className="mb-2">
                <label htmlFor="name" className="mb-4">
                  Name
                </label>
                <br />
                <TextInput className="w-3/5" />
              </section>
              <section className="mb-2">
                <label htmlFor="description" className="mb-4">
                  Description
                </label>
                <br />
                <TextAreaInput className="w-3/5" />
              </section>
              <section className="mb-2">
                <label htmlFor="status" className="mb-4">
                  Status
                </label>
                <br />
                <SelectInput>
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </section>
              <section className="mb-2">
                <label htmlFor="due_date" className="mb-4">
                  Due Date
                </label>
                <br />
                <TextInput
                  type="date"
                  name="due_date"
                  id="project_due_date"
                  value={data.due_date}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Create;
