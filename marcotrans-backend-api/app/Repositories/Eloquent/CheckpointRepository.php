<?php

namespace App\Repositories\Eloquent;

use App\Models\ShipmentCheckpoint;
use App\Repositories\Contracts\CheckpointRepositoryInterface;
use Illuminate\Support\Collection;

class CheckpointRepository implements CheckpointRepositoryInterface
{
    private $relations = ['shipmentCheckpoints'];

    public function getCheckpointsForPackage(int $packageId, $relations = []): Collection
    {
        return ShipmentCheckpoint::where('package_id', $packageId)->get();
    }
}
