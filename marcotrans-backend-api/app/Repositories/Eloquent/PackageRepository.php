<?php

namespace App\Repositories\Eloquent;

use App\Models\Package;
use App\Models\PackageItem;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Support\Collection;

class PackageRepository implements PackageRepositoryInterface
{
    private $relations = ['order.client', 'shipmentCheckpoints', 'articles', 'items'];
    public function create(array $data): Package
    {
        return Package::create($data);
    }
    public function getAll(array $filters = [])
    {
        $query = Package::query()->with($this->relations)->orderBy('created_at', 'desc');

        if (!empty($filters['status'])) {
            $query->where('delivery_status', $filters['status']);
        }

        if (!empty($filters['client_id'])) {
            $clientId = $filters['client_id'];
            $query->whereHas('order', function ($q) use ($clientId) {
                $q->where('client_id', $clientId);
            });
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('dimensions', 'like', "%{$search}%")
                  ->orWhere('package_type', 'like', "%{$search}%")
                  ->orWhereHas('order', function ($orderQuery) use ($search) {
                      $orderQuery->where('reference', 'like', "%{$search}%")
                                 ->orWhereHas('client', function ($clientQuery) use ($search) {
                                     $clientQuery->where('name', 'like', "%{$search}%");
                                 });
                  });
            });
        }

        if (isset($filters['per_page'])) {
            $perPage = (int) $filters['per_page'];
            return $query->paginate($perPage);
        }

        return $query->paginate(15);
    }

    public function findWithTracking(int $id): ?Package
    {
        // Charge le colis avec sa frise chronologique triée de manière séquentielle
        return Package::with(['order', 'shipmentCheckpoints'])->find($id);
    }

    public function updateDeliveryStatus(int $packageId, string $status): bool
    {
        $package = Package::find($packageId);
        if (!$package) return false;
        return $package->update(['delivery_status' => $status]);
    }

    public function addCheckpoint(int $packageId, array $checkpointData): bool
    {
        $package = Package::find($packageId);
        if (!$package) return false;

        $package->shipmentCheckpoints()->create($checkpointData);
        return true;
    }

    public function getPackagesByStatus(string $status): Collection
    {
        return Package::where('delivery_status', $status)->with('order.client')->get();
    }
    public function getPackageForOrder(string $reference, $relations = ['client', 'packages']): Collection
    {
        // return Package::with($this->relations)->where('reference', $reference)->first();
        return Package::whereHas('order', function ($query) use ($reference) {
            $query->where('reference', $reference);
        })->get();
    }
    public function getItemsForPackage(int $packageId, $relations = ['items']): Collection
    {
        return PackageItem::where('package_id', $packageId)->get();
    }
}
