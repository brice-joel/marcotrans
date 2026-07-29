<?php

namespace App\Repositories\Contracts;

use App\Models\Order;
use Illuminate\Support\Collection;

interface OrderRepositoryInterface
{
    public function createWithItems(array $orderData, array $items): Order;
    public function findByReference(string $reference): ?Order;
    public function getAllOrders(array $filters, array $relation);
    public function getOrdersForUser(int $user_id, array $filters);
    public function updateStatus(int $orderId, string $status): bool;
}
