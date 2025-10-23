<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoption extends Model
{
    /**
     * 
     * 
     * @list list<string>
     */
    protected $fillable = [
        'user_id',
        'pet_id'
    ];
}
