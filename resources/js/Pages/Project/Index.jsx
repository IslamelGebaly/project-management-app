import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHead from "@/Components/TableHead";

const Index = ({ auth, projects, filterParams = null }) => {
  //ensures that filter params are treated as an object when its empty
  filterParams = filterParams || {};

  //Update filtering parameters and update the current route with the parameters
  const searchFieldChanged = (name, value) => {
    //Check if value is empty. If it's empty delete the filtering Parameters else update
    if (value) {
      filterParams[name] = value;
    } else {
      delete filterParams[name];
    }

    router.get(route("project.index"), filterParams);
  };

  //When the user presses enter update the field parameters
  const onKeyPress = (name, e) => {
    if (e.key != "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  //When the user clicks on a column heading change the sorting order and send the sort field.
  //Update the Route
  const sortColumn = (name) => {
    if (filterParams["sort_order"]) {
      if (filterParams["sort_order"] === "asc") {
        filterParams["sort_order"] = "desc";
      } else {
        filterParams["sort_order"] = "asc";
      }
    } else {
      filterParams["sort_order"] = "asc";
    }
    filterParams["sort_field"] = name;

    router.get(route("project.index"), filterParams);
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2
            className="font-semibold text-xl
       text-gray-800 dark:text-gray-200 leading-tight"
          >
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="text-white bg-blue-600 rounded-sm p-2"
          >
            New Project
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table
                className="w-full text-sm text-left rtl:text-right text-gray-500
              dark:text-gray-400"
              >
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"
                >
                  <tr className="text-nowrap">
                    <TableHead
                      name="id"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      ID
                    </TableHead>
                    <th className="px-3 py-3">Image</th>
                    <TableHead
                      name="name"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Name
                    </TableHead>
                    <TableHead
                      name="status"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Status
                    </TableHead>
                    <TableHead
                      name="creation_date"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Creation Date
                    </TableHead>
                    <TableHead
                      name="due_date"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Due Date
                    </TableHead>
                    <th className="px-3 py-3">Created By</th>
                    <th className="px-3 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"
                >
                  <tr className="text-nowrap">
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        placeholder="Project Name"
                        defaultValue={filterParams.name}
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full"
                        defaultValue={filterParams.status}
                        onChange={(e) =>
                          searchFieldChanged("status", e.target.value)
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="in_progress">In Progress</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3">
                      <Link
                        href={route("project.index")}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                      >
                        Clear Filter
                      </Link>
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={project.id}
                    >
                      <td className="px-3 py-2">{project.id}</td>
                      <td className="px-3 py-2">
                        <img src={project.image_path} style={{ width: 60 }} />
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          className="text-gray-400 hover:text-gray-200 hover:underline"
                          href={route("project.show", project.id)}
                        >
                          {project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-white" +
                            PROJECT_STATUS_CLASS_MAP[project.status]
                          }
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2">{project.created_at}</td>
                      <td className="px-3 py-2">{project.due_date}</td>
                      <td className="px-3 py-2">{project.created_by.name}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("project.edit", project.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route("project.destroy", project.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
