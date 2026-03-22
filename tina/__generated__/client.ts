import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '6272bc5c98bbc9d31b6979ee9bb0dcd256795dcd', queries,  });
export default client;
  