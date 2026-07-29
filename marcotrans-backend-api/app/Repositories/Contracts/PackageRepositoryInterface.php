<?php

namespace App\Repositories\Contracts;

use App\Models\Package;
use Illuminate\Support\Collection;

interface PackageRepositoryInterface
{
    public function create(array $data): Package;
    public function getAll(array $filters = []);
    public function findWithTracking(int $id): ?Package;
    public function updateDeliveryStatus(int $packageId, string $status): bool;
    public function addCheckpoint(int $packageId, array $checkpointData): bool;
    public function getPackagesByStatus(string $status): Collection; // Utile pour filtrer sur le dashboard commercial
    public function getPackageForOrder(string $reference): Collection;
    public function getItemsForPackage(int $packageId): Collection;
}
