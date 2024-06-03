<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "description" => $this->description,
            "created_at" => (new Carbon($this->created_at))->format("Y-m-d"),
            "updated_at"=> (new Carbon($this->updated_at))->format("Y-m-d"),
            "status" => $this->status,
            "priority" => $this->priority,
            "image_path" => $this->image_path,
            "due_date" => $this->due_date,
            "created_by" => new UserResource($this->createdBy),
            "assign_user" => new UserResource($this->assignedUser),
            "project" => new ProjectResource($this->project),
            "updated_by" => new UserResource($this->updatedBy)
        ];
    }
}
