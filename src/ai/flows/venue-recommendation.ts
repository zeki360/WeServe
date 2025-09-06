'use server';

/**
 * @fileOverview An AI agent that provides recommendations for venues or menu items.
 *
 * - getVenueRecommendations - A function that generates venue or menu item recommendations.
 * - VenueRecommendationInput - The input type for the getVenueRecommendations function.
 * - VenueRecommendationOutput - The return type for the getVenueRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VenueRecommendationInputSchema = z.object({
  userData: z
    .string()
    .describe('User booking data, order history, and profile information.'),
  searchParameters: z
    .string()
    .describe('Search parameters such as date, time, location, and number of guests.'),
  recommendationType: z
    .enum(['venue', 'menuItem'])
    .describe('The type of recommendation to provide: venue or menu item.'),
});
export type VenueRecommendationInput = z.infer<typeof VenueRecommendationInputSchema>;

const VenueRecommendationOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of recommended venues or menu items.'),
  reasoning: z.string().describe('The AI reasoning behind the recommendations.'),
});
export type VenueRecommendationOutput = z.infer<typeof VenueRecommendationOutputSchema>;

export async function getVenueRecommendations(input: VenueRecommendationInput): Promise<VenueRecommendationOutput> {
  return venueRecommendationFlow(input);
}

const venueRecommendationPrompt = ai.definePrompt({
  name: 'venueRecommendationPrompt',
  input: {schema: VenueRecommendationInputSchema},
  output: {schema: VenueRecommendationOutputSchema},
  prompt: `You are an AI assistant specializing in providing recommendations for venues or menu items.

  Based on the user's booking data, order history, profile information, and search parameters, provide recommendations.
  Explain the reasoning behind the recommendations.

  User Data: {{{userData}}}
  Search Parameters: {{{searchParameters}}}
  Recommendation Type: {{{recommendationType}}}

  Provide an array of recommended venues or menu items and the reasoning behind them.
  `,
});

const venueRecommendationFlow = ai.defineFlow(
  {
    name: 'venueRecommendationFlow',
    inputSchema: VenueRecommendationInputSchema,
    outputSchema: VenueRecommendationOutputSchema,
  },
  async input => {
    const {output} = await venueRecommendationPrompt(input);
    return output!;
  }
);
