<?php

namespace App\Repositories\Eloquent;

use App\Models\Order;
use App\Models\Package;
use App\Repositories\Contracts\OrderRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class OrderRepository implements OrderRepositoryInterface
{
    private $relations = ['client',  'packages.articles', 'packages.items',];
    public function createWithItems(array $orderData, array $items): Order
    {
        // Utilisation d'une transaction de base de données pour garantir l'intégrité (Commande + Articles reliés)
        return DB::transaction(function () use ($orderData, $items) {
            $order = Order::create($orderData);

            foreach ($items as $item) {
                $order->articles()->attach($item['article_id'], [
                    'quantity' => $item['quantity']
                ]);
            }

            return $order->load('articles');
        });
    }

    public function findByReference(string $reference, $relations = ['client']): ?Order
    {
        return Order::with($relations)->where('reference', $reference)->first();
    }



    public function getAllOrders(array $filters = [], array $relations = [])
    {
        $query = Order::query()->with($relations)->orderBy('created_at', 'desc');

        if (!empty($filters['status'])) {
            $query->where('order_status', $filters['status']);
        }
        
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function($q) use ($search) {
                $q->where('reference', 'like', "%{$search}%")
                  ->orWhere('departure_address', 'like', "%{$search}%")
                  ->orWhere('delivery_address', 'like', "%{$search}%")
                  ->orWhereHas('client', function($clientQuery) use ($search) {
                      $clientQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $perPage = $filters['per_page'] ?? 25;
        return $query->paginate($perPage);
    }

    public function getOrdersForUser(int $user_id, array $filters)
    {
        $query = Order::query()->with($this->relations)->orderBy('created_at', 'desc');
        if (!empty($filters['status'])) {
            $query->where('order_status', $filters['status']);
        }

        $perPage = $filters['per_page'] ?? 15;
        return $query->where('client_id', $user_id)->paginate($perPage); // Remplacement du find() par un where() pour la pagination
    }

    public function updateStatus(int $orderId, string $status): bool
    {
        $order = Order::find($orderId);
        if (!$order) return false;
        return $order->update(['order_status' => $status]);
    }
}
