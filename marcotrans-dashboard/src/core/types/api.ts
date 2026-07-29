// src/core/types/api.ts

// ==========================================
// 1. LES ENVELOPPES DE RÉPONSE API (GÉNÉRIQUES)
// ==========================================

/**
 * Pour les réponses standards d'un modèle unique (ex: Détails d'une commande)
 * Laravel Resource retourne souvent : { data: { id: 1, reference: '...' } }
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * Pour la pagination de Laravel (LengthAwarePaginator)
 * L'API renvoie un objet avec les données dans 'data' et la pagination au même niveau ou dans 'meta'
 */
export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[]; // Le tableau d'éléments génériques (ex: Order[], Package[])
  meta: PaginationMeta;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// ==========================================
// 2. VOS ENTITÉS MÉTIERS INDIVIDUELLES
// ==========================================

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles?: UserRole[];
  driver_profile?: {
    vehicle_type: "moto" | "triporteur" | "camionnette" | "cargo";
    license_plate: string | null;
    is_available: boolean;
  };
}

export interface UserRole {
  id: number;
  name: string;
  description: string;
}

export interface Article {
  id: number;
  designation: string;
  nature: string;
  unit_weight: number;
  unit_volume: number;
}

export interface PackageItem {
  id: number;
  package_id?: number;
  article_id?: number | null;
  designation: string;
  nature: string;
  quantity: number;
}

export interface PackageOrderSummary {
  id: number;
  reference: string;
  status: string;
  type: string;
  client?: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export type CheckpointStatus = "pending" | "completed";

export interface Checkpoint {
  id: number;
  sequence_order: number;
  location_name: string;
  status: CheckpointStatus;
  description_note: string;
  validated_at: string | null;
}

export interface Package {
  id: number;
  order_id: number;
  type: string;
  weight: number;
  volume?: number;
  dimensions: string;
  status: string;
  order?: PackageOrderSummary;
  tracking_timeline?: Checkpoint[];
  articles?: Article[];
  package_items?: PackageItem[];
  created_at: string;
}

export type OrderType = "urban" | "interurban" | "international";
export type OrderStatut =
  | "pending"
  | "processing"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface Order {
  id: number;
  reference: string;
  type: OrderType;
  status: OrderStatut;
  departure_address: string;
  delivery_address: string;
  total_price: number;
  created_at: string;
  client?: User;
  articles?: Article[];
  packages?: Package[];
}
