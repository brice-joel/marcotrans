<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Http\Resources\PackageResource;
use App\Models\PackageItem;
use App\Repositories\Contracts\OrderRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * Liste des commandes du client connecté (Historique).
     */
    #[OA\Get(
        path: "/api/orders",
        summary: "Liste des commandes",
        tags: ["Commandes"],
        responses: [
            new OA\Response(response: 200, description: "Liste des commandes récupérée avec succès")
        ]
    )]
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = Auth::user();
        $filters = $request->all();

        /*
        if ($user->role === 'client') {
            $orders = $this->orderRepository->getOrdersForUser($user->id, $filters);
        }
*/
        //  $orders = \App\Models\Order::with(['packages', 'packages.items', 'packages.articles',])->limit(5)->get();    
        $orders = $this->orderRepository->getAllOrders($filters, ['client']);
        return OrderResource::collection($orders);
    }

    /**
     * Création d'une nouvelle commande avec ses articles (Transaction sécurisée).
     */
    public function store(StoreOrderRequest $request): OrderResource
    {
        // Extraction des données de la commande et du tableau d'articles
        $orderData = $request->only(['client_id', 'order_type', 'delivery_address', 'total_price']);
        $items = $request->input('items');

        // Génération automatique d'une référence unique pour MarcoTrans
        $orderData['reference'] = 'MT-' . now()->year . '-' . strtoupper(bin2hex(random_bytes(3)));
        $orderData['order_status'] = 'pending';

        // Persistance via la couche Repository
        $order = $this->orderRepository->createWithItems($orderData, $items);

        return new OrderResource($order);
    }

    /**
     * Obtenir les détails d'une commande spécifique via sa référence unique (Suivi Client).
     */
    public function show(string $reference)
    {
        $order = $this->orderRepository->findByReference($reference);

        if (!$order) {
            return response()->json(['message' => 'Commande introuvable.'], 404);
        }

        // On charge dynamiquement les colis et leurs frises chronologiques (checkpoints)
        // $order->load(['packages', 'packages.shipmentCheckpoints']);

        return new OrderResource($order);
    }
}
