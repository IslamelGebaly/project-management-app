<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCrudResource;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Get all users
        $query = User::query();

        //Get sort parameters
        $sort_field = request("sort_field", "id");
        $sort_order = request("sort_order","asc");

        //filter by name
        if(request("name"))
            $query->where("name", "like","%". request("name") ."%");

        //filter by status
        if(request("status"))
            $query->where("email", request("email"));

        //Show one user on each page
        $users = $query
                          ->orderBy($sort_field, $sort_order)
                          ->paginate(10)
                          ->onEachSide(1);

        //Return the react page
        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            "filterParams" => request()->query() ?: null,
            "success" => session("success"),
            "failure"=> session("failure"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data["email_verified_at"] = time();
        $data["password"] = bcrypt($data["password"]);

        User::create($data);

        return to_route("user.index")->with("success", "user was created successfully!");
    }
    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia("User/Show", ["user" => new UserCrudResource($user)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit", [
            "user" => new UserCrudResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data["email_verified_at"] = time();
        if($data["password"])
            $data["password"] = bcrypt($data["password"]) ?? null;
        else
            unset($data["password"]);
        $user->update($data);

        return to_route("user.index")->with("success", "User \"$user->name\" was edited successfully!");
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;

        //If the user still has some tasks to do return a failure
        if(! $user->tasks->isEmpty())
            return to_route("user.index")->with("failure", "User \"$name\" still has tasks to do");

        $user->delete();

        return to_route("user.index")->with("success", "User \"$name\" was deleted successfully!");
    }
}
