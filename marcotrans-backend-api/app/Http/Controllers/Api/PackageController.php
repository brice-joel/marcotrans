<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdateDeliveryStatusRequest;
use App\Http\Requests\StoreCheckpointRequest;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class PackageController extends Controller
{
    protected $packageRepository;

    public function __construct(PackageRepositoryInterface $packageRepository)
    {
        $this->packageRepository = $packageRepository;
    }

    /**
     * Liste des colis  du client connecté (Historique).
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = Auth::user();
        $filters = $request->all();

        //        dd($packages);
        $packages = $this->packageRepository->getAll($filters);
        return PackageResource::collection($packages);
    }





    /**
     * Enregistrer un colis physique en agence.
     */
    public function store(StorePackageRequest $request): PackageResource
    {
        $packageData = $request->validated();
        $packageData['delivery_status'] = 'received'; // Statut initial par défaut issu de la V1 corrigée

        $package = $this->packageRepository->create($packageData);

        return new PackageResource($package);
    }

    /**
     * Mettre à jour le statut logistique d'un colis (ex: 'customs_export', 'in_transit').
     */
    public function updateStatus(UpdateDeliveryStatusRequest $request, int $id): JsonResponse
    {
        $updated = $this->packageRepository->updateDeliveryStatus($id, $request->delivery_status);

        if (!$updated) {
            return response()->json(['message' => 'Colis introuvable ou erreur de mise à jour.'], 404);
        }

        return response()->json([
            'message' => 'Statut du colis mis à jour avec succès.',
            'current_status' => $request->delivery_status
        ]);
    }

    /**
     * Ajouter un checkpoint de suivi (Escale internationale).
     */
    public function addCheckpoint(StoreCheckpointRequest $request): JsonResponse
    {
        $checkpointData = $request->validated();

        // Si aucune date de validation n'est fournie, on prend l'heure actuelle
        if (empty($checkpointData['validated_at']) && $checkpointData['status'] === 'completed') {
            $checkpointData['validated_at'] = now();
        }

        $added = $this->packageRepository->addCheckpoint($checkpointData['package_id'], $checkpointData);

        if (!$added) {
            return response()->json(['message' => 'Impossible d\'ajouter le checkpoint.'], 422);
        }

        return response()->json([
            'message' => 'Étape de transit enregistrée et validée.'
        ]);
    }
}
