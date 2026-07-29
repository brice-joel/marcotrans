<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Contracts\OrderRepositoryInterface;
use App\Repositories\Eloquent\OrderRepository;
use App\Repositories\Contracts\PackageRepositoryInterface;
use App\Repositories\Eloquent\PackageRepository;

// lie les interfaces à leurs implementations
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Enregistre les liaisons dans le conteneur de services IoC de Laravel.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(OrderRepositoryInterface::class, OrderRepository::class);
        $this->app->bind(PackageRepositoryInterface::class, PackageRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
