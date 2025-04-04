import { createClient } from '@sanity/client';
import config from '../../sanity.config';

export const sanityClient = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: true,
  apiVersion: '2024-04-01',
});
