<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'phone', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }





    // Relation N-N : Un utilisateur possède plusieurs rôles
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    // Relation 1-1 : Un utilisateur peut avoir un profil de livreur
    public function driverProfile()
    {
        return $this->hasOne(DriverProfile::class);
    }

    // Relation 1-N : Un client peut passer plusieurs commandes
    public function orders()
    {
        return $this->hasMany(Order::class, 'client_id');
    }

    // Fonction d'aide pour vérifier un rôle simplement dans les Services ou Middlewares
    public function hasRole(string $roleName): bool
    {
        return $this->roles()->where('name', $roleName)->exists();
    }
}
