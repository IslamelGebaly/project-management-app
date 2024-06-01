<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            //Table Attributes
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->longText("description")->nullable();
            $table->timestamp("due_date")->nullable();
            $table->string("status");
            $table->string("image_path")->nullable();

            //Foreign Keys
            $table->foreignId("created_by")->constrained("users");
            $table->foreignId("updated_by")->constrained("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
