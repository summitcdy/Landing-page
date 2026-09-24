export type FlavourId =
  | 'peri-peri'
  | 'ghee-roasted'
  | 'salt-pepper'
  | 'cheese-herbs'
  | 'mint-pudina'
  | 'himalayan-salt'
  | 'cheese'
  | 'maggie-masala'
  | 'chettinad-tomato'
  | 'cream-onion'
  | 'mint'
  | 'garlic'
  | 'sweet-chilli'
  | 'barbecue';

export type PackSize = '20g' | '40g' | '80g' | '100g' | '150g' | '200g';

export type SundayMomentId =
  | 'lazy-breakfast'
  | '4pm-craving'
  | 'movie-night'
  | 'house-party'
  | 'late-night';

export type FrontDoorTab = 'all' | 'shop-sunday' | 'shop-weekday';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface FlavourTheme {
  id: FlavourId;
  name: string;
  tagline: string;
  description: string;
  mood: string;
  badge: string;
  profileBadge?: string;
  iconName?: string;
  pouchImage: string;
  image?: string;
  pouch3dTexture?: string;
  pouchPlaceholder: string;
  accentColor: string;
  accentSecondary: string;
  bgGradient: string;
  bgGradientDark?: string;
  glowColor: string;
  cardBg: string;
  borderTint: string;
  chipColor: string;
  textColor: string;
  textColorDark?: string;
  heroLightRgb: string;
  ambientBlob1: string;
  ambientBlob2: string;
  ambientBlob3: string;
  supportingVisuals: string[];
  keyNotes: string[];
  sundayPersonality: {
    title: string;
    vibe: string;
    scenario: string;
    tagline: string;
  };
  nutritionHighlights: {
    protein: string;
    calories: string;
    fat: string;
    sodium: string;
    servingSize: string;
  };
}

export interface IngredientItem {
  id: string;
  name: string;
  subheading: string;
  description: string;
  flavourTie: FlavourId | 'all';
  iconName: string;
  origin: string;
  textureNote: string;
  glowColor: string;
}

export interface PackagingSpec {
  feature: string;
  subtitle: string;
  detail: string;
  icon: string;
  badge?: string;
}

export interface FlavourGalleryAsset {
  id: string;
  title: string;
  type: 'front' | 'macro' | 'ingredients' | 'lifestyle';
  caption: string;
  imageUrl: string;
  badge?: string;
}

export interface VariantStockStatus {
  inStock: boolean;
  stockCount: number;
  badge: 'In Stock' | 'Only Few Left' | 'Back in 24h';
}

export interface FlavourSizeVariant {
  flavourId: FlavourId;
  size: PackSize;
  sku: string;
  price: number;
  mrp: number;
  savings: number;
  stockStatus: VariantStockStatus;
  primaryImage: string;
  gallery: FlavourGalleryAsset[];
}
