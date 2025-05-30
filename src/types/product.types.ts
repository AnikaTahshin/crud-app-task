export interface ProductData {
  id: number;
  product_name: string;
  slug: string | null;
  product_description: string;
  product_price: string;
  product_quantity: number;
  product_category: string;
  product_brand: string;
  rating: string;
  in_stock: boolean;
  created_at: string;
  sku: string;
  discount_percentage: number;
  is_featured: boolean;
  shipping_weight: string;
}

export interface ProductResponse {
  data: {
    results: ProductData[];
    total_items: number;
    // ...other pagination fields
  };
}
