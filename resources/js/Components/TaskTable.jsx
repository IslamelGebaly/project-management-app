import React from "react";
import TableHead from "./TableHead";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { Link, router } from "@inertiajs/react";
import {
  TASK_STATUS_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
} from "@/constants";
import Pagination from "./Pagination";
const TaskTable = ({ tasks, filterParams, hideProjectColumn = false }) => {
  filterParams = filterParams || {};

  //Update filtering parameters and update the current route with the parameters
  const searchFieldChanged = (name, value) => {
    //Check if value is empty. If it's empty delete the filtering Parameters else update
    if (value) {
      filterParams[name] = value;
    } else {
      delete filterParams[name];
    }

    router.get(route("task.index"), filterParams);
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

    router.get(route("task.index"), filterParams);
  };

  const deleteRow = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    return router.delete(route("project.destroy", task.id));
  };

  return (
    <>
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500
dark:text-gray-400 overflow-auto"
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
            {!hideProjectColumn && (
              <TableHead
                name="project_name"
                sort_field={filterParams["sort_field"]}
                sort_order={filterParams["sort_order"]}
                sortColumn={sortColumn}
              >
                Project Name
              </TableHead>
            )}
            <TableHead
              name="status"
              sort_field={filterParams["sort_field"]}
              sort_order={filterParams["sort_order"]}
              sortColumn={sortColumn}
            >
              Status
            </TableHead>
            <TableHead
              name="priority"
              sort_field={filterParams["sort_field"]}
              sort_order={filterParams["sort_order"]}
              sortColumn={sortColumn}
            >
              Priority
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
  dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 w-auto"
        >
          <tr className="text-nowrap">
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3">
              <TextInput
                className="w-full"
                placeholder="Task Name"
                defaultValue={filterParams.name}
                onBlur={(e) => searchFieldChanged("name", e.target.value)}
                onKeyPress={(e) => onKeyPress("name", e)}
              />
            </th>
            <th className="px-3 py-3">
              <SelectInput
                className="w-full"
                defaultValue={filterParams.status}
                onChange={(e) => searchFieldChanged("status", e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
              </SelectInput>
            </th>
            <th className="px-3 py-3">
              <Link
                href={route("task.index")}
                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
              >
                Clear Filter
              </Link>
            </th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3 text-right"></th>
            <th className="px-3 py-3 text-right"></th>
            {!hideProjectColumn && <th className="px-3 py-3 text-right"></th>}
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={task.id}
            >
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <img src={task.image_path} style={{ width: 60 }} />
              </td>
              <td className="px-3 py-2">
                <Link
                  href={route("task.show", task.id)}
                  className="hover:text-white hover:underline"
                >
                  {task.name}
                </Link>
              </td>
              {!hideProjectColumn && (
                <td className="px-3 py-2">{task.project.name}</td>
              )}
              <td className="px-3 py-2">
                <span
                  className={
                    "px-2 py-1 rounded text-white" +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              <td className="px-3 py-2">
                <span
                  className={
                    "px-2 py-1 rounded text-white" +
                    TASK_PRIORITY_CLASS_MAP[task.priority]
                  }
                >
                  {TASK_PRIORITY_TEXT_MAP[task.priority]}
                </span>
              </td>
              <td className="px-3 py-2">{task.created_at}</td>
              <td className="px-3 py-2">{task.due_date}</td>
              <td className="px-3 py-2">{task.created_by.name}</td>
              <td className="px-3 py-2">
                <div className="text-right flex justify-between">
                  <Link
                    href={route("task.edit", task.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deleteRow(task)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </>
  );
};

export default TaskTable;
