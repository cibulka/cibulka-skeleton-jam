import sanityClientCaller from '@sanity/client';

// CLIENT
// =============================================================================

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_PROJECT_VERSION;

function replaceVariablesInQuery(query: string, replacements: Record<string, string>): string {
  let result = query;
  Object.keys(replacements).forEach((key: string) => {
    result = result.replace(`$${key}`, replacements[key]);
  });
  return result;
}

export function queryToUrl(query: string, replacements: Record<string, string>): string {
  let usedQuery = query;
  if (replacements) usedQuery = replaceVariablesInQuery(query, replacements);

  return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    usedQuery,
  )}`;
}

export const sanityClient = sanityClientCaller({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});
