import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";

const Edit = ({ auth, project }) => {
  const { data, setData, post, reset, errors } = useForm({
    image: "",
    name: project.name || "",
    description: project.description || "",
    status: project.status || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("project.update", project.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
        >
          Edit Project "{project.name}"
        </h2>
      }
    >
      <Head title={`Edit Project "${project.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {project.image_path && (
                <div>
                  <img
                    src={project.image_path}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              <form onSubmit={submit}>
                <section className="mb-2">
                  <InputLabel
                    htmlFor="project_image_path"
                    value="Project Image"
                  />
                  <TextInput
                    className="w-3/5"
                    name="image"
                    type="file"
                    id="project_image_path"
                    onChange={(e) => {
                      setData("image", e.target.files[0]);
                    }}
                  />
                  <InputError message={errors.image} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="project_name" value="Project Name" />
                  <TextInput
                    className="w-3/5"
                    name="name"
                    id="project_name"
                    isFocused={true}
                    value={data.name}
                    onChange={(e) => {
                      setData("name", e.target.value);
                    }}
                  />
                  <InputError message={errors.name} />
                </section>
                <section className="mb-2">
                  <InputLabel
                    htmlFor="project_description"
                    value="Description"
                  />
                  <TextAreaInput
                    className="w-3/5"
                    name="description"
                    id="project_description"
                    value={data.description}
                    onChange={(e) => {
                      setData("description", e.target.value);
                    }}
                  />
                  <InputError message={errors.description} />
                </section>
                <section className="mb-2">
                  <InputLabel htmlFor="project_status" value=" Status" />
                  <SelectInput
                    name="status"
                    id="project_status"
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
                  <InputLabel htmlFor="project_due_date" value="Due Date" />
                  <TextInput
                    type="date"
                    name="due_date"
                    id="project_due_date"
                    value={data.due_date}
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                  <InputError message={errors.due_date} />
                </section>
                <div className="text-right">
                  <Link
                    href={route("project.index")}
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
