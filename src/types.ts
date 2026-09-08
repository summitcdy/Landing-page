export type FlavourId = 'himalayan-salt' | 'cheese' | 'peri-peri';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface FlavourTheme {
  id: FlavourId;
  name: string;
  tagline: string;
  description: string;
  mood: string;
  badge: string;
  pouchImage: string;
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
