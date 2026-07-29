<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Repositories\Eloquent\PackageRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderPackageController extends Controller
{
    private $packageRepository;

    public function __construct(PackageRepository $packageRepository)
    {
        $this->packageRepository = $packageRepository;
    }

    /**
     * Obtenir les colis d'une commande spécifique.
     */
    public function index(string $order_reference): AnonymousResourceCollection
    {

        $packages_order = $this->packageRepository->getPackageForOrder($order_reference);
        /*
        if (!$packages_order) {
            return response()->json(['message' => 'Les colis de cette commande sont introuvables.'], 404);
        }
            */
        $packages_order->load(['shipmentCheckpoints', 'items']);
        return  PackageResource::collection($packages_order);
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
