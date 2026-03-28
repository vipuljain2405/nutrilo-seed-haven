import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  description: string | null;
  ingredients: string | null;
  image_url: string | null;
  badge: string | null;
  category: string | null;
  weight: string | null;
  benefits: string[];
  nutrition: { label: string; value: string }[];
  in_stock: boolean;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Product[];
    },
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as Product | null;
    },
    enabled: !!slug,
  });
};
