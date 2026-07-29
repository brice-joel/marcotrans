<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface CheckpointRepositoryInterface
{

    public function getCheckpointsForPackage(int $packageId): Collection;
}
