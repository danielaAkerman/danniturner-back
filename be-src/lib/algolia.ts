import algoliasearch from "algoliasearch";
import * as process from "process";

const client = algoliasearch("EQY57XWFY4", process.env.ALGOLIA_APIKey);
const index = client.initIndex("pets");

export { index };