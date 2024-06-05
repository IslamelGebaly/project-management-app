import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import TextInput from "@/Components/TextInput";
import TableHead from "@/Components/TableHead";

const Index = ({ auth, users, filterParams = null, success }) => {
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

    router.get(route("user.index"), filterParams);
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

    router.get(route("user.index"), filterParams);
  };

  //Ask the user if he is sure he wants to delete the user
  //The go to the delete route
  const deleteRow = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    return router.delete(route("user.destroy", user.id));
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
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="text-white bg-blue-600 rounded-sm p-2"
          >
            New User
          </Link>
        </div>
      }
    >
      <Head title="Users" />

      {success && (
        <div className="bg-emerald-500 w-full text-white p-2">{success}</div>
      )}

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
                    <TableHead
                      name="name"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Name
                    </TableHead>
                    <TableHead
                      name="email"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Email
                    </TableHead>
                    <TableHead
                      name="creation_date"
                      sort_field={filterParams["sort_field"]}
                      sort_order={filterParams["sort_order"]}
                      sortColumn={sortColumn}
                    >
                      Creation Date
                    </TableHead>
                    <th className="px-3 py-3">Actions</th>
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
                        placeholder="User Name"
                        defaultValue={filterParams.name}
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        placeholder="Email"
                        defaultValue={filterParams.email}
                        onBlur={(e) =>
                          searchFieldChanged("email", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("email", e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <Link
                        href={route("user.index")}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                      >
                        Clear Filter
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={user.id}
                    >
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2">
                        <Link
                          className="text-gray-400 hover:text-gray-200 hover:underline"
                          href={route("user.show", user.id)}
                        >
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2">{user.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">
                        <Link
                          href={route("user.edit", user.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => deleteRow(user)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
