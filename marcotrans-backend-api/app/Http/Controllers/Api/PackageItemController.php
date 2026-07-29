<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageItemResource;
use App\Models\Package;
use App\Models\PackageItem;
use App\Repositories\Eloquent\PackageRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PackageItemController extends Controller
{
    private $packageRepository;
    public function __construct(PackageRepository $packageRepository)
    {
        $this->packageRepository = $packageRepository;
    }


    /**
     * Obtenir les articles et contenus  d'un colis spécifique.
     */
    public function index(int $package_id): AnonymousResourceCollection
    {
        $items_package = $this->packageRepository->getItemsForPackage($package_id);
        return  PackageItemResource::collection($items_package);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
