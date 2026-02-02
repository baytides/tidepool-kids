import { AgeContent, AgeLevel } from '@/types';

/**
 * Get age-appropriate content from an AgeContent object
 * @param content - The AgeContent object with k2, grades35, grades68 fields
 * @param ageLevel - The current user's age level (null defaults to grades35)
 * @returns The appropriate string content for the age level
 */
export function getAgeContent(content: AgeContent, ageLevel: AgeLevel | null): string {
  if (!ageLevel) return content.grades35; // Default to middle grade
  return content[ageLevel];
}

/**
 * Get age-appropriate content with fallback for legacy string content
 * This is useful during the migration period when some content may not
 * have been converted to AgeContent format yet.
 *
 * @param content - Either an AgeContent object or a plain string
 * @param ageLevel - The current user's age level
 * @returns The appropriate string content
 */
export function getContent(
  content: AgeContent | string | undefined,
  ageLevel: AgeLevel | null
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return getAgeContent(content, ageLevel);
}

/**
 * Check if content is AgeContent (has all three age level keys)
 */
export function isAgeContent(content: unknown): content is AgeContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'k2' in content &&
    'grades35' in content &&
    'grades68' in content
  );
}

/**
 * UI configuration for each age level
 * Used for styling, labels, and personality variations
 */
export const ageLevelConfig = {
  k2: {
    label: 'K-2',
    icon: '⭐',
    title: 'Explorer',
    description: 'Kindergarten through 2nd grade',
    fontSize: 'text-lg',      // Larger text for young readers
    paragraphLength: 'short', // 1-2 sentences max
    vocabulary: 'simple',     // No words over 3 syllables
    coralVoice: 'excited',    // Uses exclamations, "Wow!", "Look!"
    coralAppearance: 'frequent', // Shows often with bounce animations
  },
  grades35: {
    label: '3-5',
    icon: '🔍',
    title: 'Investigator',
    description: '3rd through 5th grade',
    fontSize: 'text-base',    // Standard text
    paragraphLength: 'medium', // 3-4 sentences
    vocabulary: 'growing',    // Some science terms with context
    coralVoice: 'curious',    // Uses "Did you know...", "I wonder..."
    coralAppearance: 'moderate', // Shows at key moments
  },
  grades68: {
    label: '6-8',
    icon: '🔬',
    title: 'Scientist',
    description: '6th through 8th grade',
    fontSize: 'text-sm',      // Smaller, denser text
    paragraphLength: 'full',  // Full paragraphs
    vocabulary: 'scientific', // Full terminology
    coralVoice: 'informative', // Uses "Scientists discovered...", "Research shows..."
    coralAppearance: 'sparse',  // Appears less, more substantial when present
  },
} as const;

/**
 * Get the config for an age level
 */
export function getAgeLevelConfig(ageLevel: AgeLevel | null) {
  if (!ageLevel) return ageLevelConfig.grades35;
  return ageLevelConfig[ageLevel];
}
