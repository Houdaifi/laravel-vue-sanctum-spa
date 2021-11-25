<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reclamation extends Model
{
    use HasFactory;

    protected $table = 'reclamtions';

    protected $guarded = [];

    public function users()
    {
        return $this->hasMany(User::class, 'id', 'user_id');
    }

    public function types()
    {
        return $this->hasMany(Type::class, 'id', 'type_id');
    }

    public function status()
    {
        return $this->hasMany(Statut::class, 'id', 'statut_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return (New Carbon($value))->diffForHumans();
    }
}
