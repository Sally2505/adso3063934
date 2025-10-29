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
    // RelationShip: Adoption belongs to User
    public function user()
    {
        return $this->belongsTo(user::class);
    }

    // RelationShip: Adoption belongs to pet
    public function pet()
    {
        return $this->belongsTo(pet::class);
    }
}
