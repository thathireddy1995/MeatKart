export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
};

export const categories = ["All", "Store special", "By Product", "Cut Pieces", "Value Ads", "Whole Bird"];

export const products: Product[] = [
  { id: "1", name: "Biriyani cut without skin", price: 300, unit: "kg", category: "Cut Pieces", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80" },
  { id: "2", name: "Biriyani cut with skin", price: 270, unit: "kg", category: "Cut Pieces", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80" },
  { id: "3", name: "Breast Bone Less BBL", price: 380, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1602470521006-bbf6e1d6cca8?w=600&q=80" },
  { id: "4", name: "Curry cut without skin", price: 300, unit: "kg", category: "Cut Pieces", image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&q=80" },
  { id: "5", name: "Curry cut with skin", price: 270, unit: "kg", category: "Cut Pieces", image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600&q=80" },
  { id: "6", name: "Drumstick without skin", price: 360, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80" },
  { id: "7", name: "Drumstick with skin", price: 350, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80" },
  { id: "8", name: "Eggs", price: 7, unit: "pcs", category: "Store special", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80" },
  { id: "9", name: "Feet", price: 10, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80" },
  { id: "10", name: "Gizzard", price: 100, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&q=80" },
  { id: "11", name: "Janatha", price: 50, unit: "kg", category: "Value Ads", image: "https://images.unsplash.com/photo-1602470521006-bbf6e1d6cca8?w=600&q=80" },
  { id: "12", name: "Leg Bone Less LBL", price: 420, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600&q=80" },
  { id: "13", name: "Liver", price: 100, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80" },
  { id: "14", name: "Lollipop big to 50 gm", price: 360, unit: "kg", category: "Value Ads", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80" },
  { id: "15", name: "Mince (Kheema)", price: 400, unit: "kg", category: "Value Ads", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80" },
  { id: "16", name: "Pet feast", price: 70, unit: "kg", category: "Value Ads", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80" },
  { id: "17", name: "Skinless whole bird", price: 300, unit: "kg", category: "Whole Bird", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80" },
  { id: "18", name: "Soup Bones", price: 50, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&q=80" },
  { id: "19", name: "Waste skin", price: 40, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600&q=80" },
  { id: "20", name: "Whole leg skin", price: 350, unit: "kg", category: "By Product", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80" },
  { id: "21", name: "Whole bird with skin", price: 230, unit: "kg", category: "Whole Bird", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80" },
];
