<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "max:255"],
            "project_id" => ["nullable","integer", "exists:projects,id"],
            "assigned_user_id" => ["nullable", "integer", "exists:users,id"],
            "image" => ["nullable", "image"],
            "status" => ["required", Rule::in(["in_progress", "pending", "completed"])],
            "priority" => ["required", Rule::in(["low", "medium", "high"])],
            "due_date" => ["nullable", 'date']
        ];
    }
}
