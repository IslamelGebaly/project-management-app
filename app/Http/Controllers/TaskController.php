<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Get all tasks
        $query = task::query();

        //Get sort parameters
        $sort_field = request("sort_field", "id");
        $sort_order = request("sort_order","asc");

        //filter by name
        if(request("name"))
            $query->where("name", "like","%". request("name") ."%");

        //filter by status
        if(request("status"))
            $query->where("status", request("status"));

        //Show one task on each page
        $tasks = $query
                          ->orderBy($sort_field, $sort_order)
                          ->paginate(10)
                          ->onEachSide(1);

        //Return the react page
        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "filterParams" => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Task/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia("Task/Show", [
            "task" => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
