<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Get all projects
        $query = Project::query();

        //Get sort parameters
        $sort_field = request("sort_field", "id");
        $sort_order = request("sort_order","asc");

        //filter by name
        if(request("name"))
            $query->where("name", "like","%". request("name") ."%");

        //filter by status
        if(request("status"))
            $query->where("status", request("status"));

        //Show one project on each page
        $projects = $query
                          ->orderBy($sort_field, $sort_order)
                          ->paginate(10)
                          ->onEachSide(1);

        //Return the react page
        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "filterParams" => request()->query() ?: null,
            "success" => session("success")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image UploadedFile */
        $image = $data["image"] ?? null;
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        if($image){
            $data["image_path"] = $image->store('project/' . Str::random(), 'public');
        }

        Project::create($data);

        return to_route("project.index")->with("success", "project was created successfully!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = $project->tasks();

        //Get sort parameters
        $sort_field = request("sort_field", "id");
        $sort_order = request("sort_order","asc");

        //filter by name
        if(request("name"))
            $tasks->where("name", "like","%". request("name") ."%");

        //filter by status
        if(request("status"))
            $tasks->where("status", request("status"));

        $tasks = $tasks
                        ->orderBy($sort_field, $sort_order)
                        ->paginate(10)
                        ->onEachSide(1);

        return inertia("Project/Show",
            [
                "project" => new ProjectResource($project),
                "tasks" => TaskResource::collection($tasks),
                "filterParams" => request()->query() ?: null
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia("Project/Edit", [
            "project" => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $name = $data["name"];
        $image = $data["image"] ?? null;
        $data["updated_by"] = Auth::id();

        //If the project has an image then delete it and add a new image
        if($image){
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data["image_path"] = $image->store('project/' . Str::random(), 'public');
        }

        $project->update($data);

        return to_route("project.index")->with("success", "Project \"$name\" was edited successfully!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project->delete();
        //Delete the project image directory
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route("project.index")->with("success", "Project \"$name\" was deleted successfully!");
    }
}
