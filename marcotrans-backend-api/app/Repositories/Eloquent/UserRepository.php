<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Collection;

class UserRepository implements UserRepositoryInterface
{
    public function create(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']), // Hachage automatique sécurisé
            'phone' => $data['phone']
        ]);
    }

    public function update(int $id, array $data): bool
    {
        $user = User::find($id);
        if (!$user) return false;
        return $user->update($data);
    }

    public function find(int $id): ?User
    {
        return User::with(['roles', 'driverProfile'])->find($id);
    }

    public function getAvailableDrivers(): Collection
    {
        // Récupère uniquement les utilisateurs ayant le profil de livreur ET marqués disponibles
        return User::whereHas('driverProfile', function ($query) {
            $query->where('is_available', true);
        })->with('driverProfile')->get();
    }
}
