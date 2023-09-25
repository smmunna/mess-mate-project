<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dailymeal extends Model
{
    use HasFactory;
    protected $fillable = ['member_id', 'manager_email', 'name', 'mealNumber', 'date'];
}
