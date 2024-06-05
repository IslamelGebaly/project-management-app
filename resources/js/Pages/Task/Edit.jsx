import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";

const Edit = ({ auth, task }) => {
  const { data, setData, post, processing, errors } = useForm({
    image: "",
    name: task.name || "",
    project_id: task.project.id || "",
    status: task.status || "",
    priority: task.priority || "",
    due_date: task.due_date || "",
    assigned_user_id: task.assigned_user.id || "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("task.update", task.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
        >
          New Task
        </h2>
      }
    >
      <Head title="New Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={submit}>
                <div>
                  <img
                    src={task.image_path}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <section className="mb-2">
                  <InputLabel htmlFor="task_image" value="Task Image" />
                  <TextInput
                    className="w-3/5"
                    name="image"
                    type="file"
                    id="task_image"
                    onChange={(e) => {
                      setData("image", e.target.files[0]);
                    }}
                  />
                  <InputError message={errors.image} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="task_name" value="Task Name" />
                  <TextInput
                    className="w-3/5"
                    name="name"
                    id="task_name"
                    value={data.name}
                    onChange={(e) => {
                      setData("name", e.target.value);
                    }}
                  />
                  <InputError message={errors.name} />
                </section>
                <section className="mb-2">
                  <InputLabel
                    htmlFor="task_project_id"
                    value="Assign Project"
                  />

                  <TextInput
                    className="w-3/5"
                    name="project_id"
                    id="task_project_id"
                    value={data.project_id}
                    onChange={(e) => {
                      setData("project_id", e.target.value);
                    }}
                  />
                  <InputError message={errors.project_id} />
                </section>
                <section className="mb-2">
                  <InputLabel
                    htmlFor="task_assigned_user"
                    value="Assign User"
                  />

                  <TextInput
                    className="w-3/5"
                    name="assigned_user"
                    id="task_assigned_user"
                    value={data.assigned_user_id}
                    onChange={(e) => {
                      setData("assigned_user_id", e.target.value);
                    }}
                  />
                  <InputError message={errors.assigned_user_id} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="task_status" value="Status" />

                  <SelectInput
                    name="status"
                    id="task_status"
                    value={data.status}
                    onChange={(e) => {
                      setData("status", e.target.value);
                    }}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <InputError message={errors.status} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="task_priority" value="Priority" />

                  <SelectInput
                    name="priority"
                    id="task_priority"
                    value={data.priority}
                    onChange={(e) => {
                      setData("priority", e.target.value);
                    }}
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectInput>
                  <InputError message={errors.priority} />
                </section>
                <section className="mb-2">
                  <label htmlFor="due_date" className="mb-4">
                    Due Date
                  </label>
                  <br />
                  <TextInput
                    type="date"
                    name="due_date"
                    id="task_due_date"
                    value={data.due_date}
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                  <InputError message={errors.due_date} />
                </section>
                <div className="text-right">
                  <Link
                    href={route("task.index")}
                    className="p-2 text-gray-800 bg-gray-100 rounded transition-all hover:bg-gray-200 mr-2 text-sm"
                  >
                    Cancel
                  </Link>
                  <input
                    type="submit"
                    value="Submit"
                    className="p-2 text-white bg-blue-600 rounded hover:bg-blue-800 text-sm"
                  />
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
