<?php

namespace App\Http\Controllers;


use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        $data = $request->validated();
        /** @var $image UploadedFile */

        $image = $data["image"] ?? null;
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        if($image){
            $data["image_path"] = $image->store('task/' . Str::random(), 'public');
        }

        Task::create($data);

        return to_route("task.index")->with("success", "task was created successfully!");
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
        return inertia("Task/Edit", [
            "task" => new TaskResource($task)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $name = $data["name"];
        $image = $data["image"] ?? null;
        $data["updated_by"] = Auth::id();

        //If the task has an image then delete it and add a new image
        if($image){
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data["image_path"] = $image->store('task/' . Str::random(), 'public');
        }

        $task->update($data);

        return to_route("task.index")->with("success", "Task \"$name\" was edited successfully!");
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        //Delete the task image directory
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route("task.index")->with("success", "Task \"$name\" was deleted successfully!");
    }
}
