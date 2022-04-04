export interface GetTournamentsResponse {
  data: Data;
  extensions: Extensions;
  actionRecords: any[];
}

export interface Data {
  tournaments: Tournaments;
}

export interface Tournaments {
  nodes: Node[];
}

export interface Node {
  id: number;
  name: string;
  slug: string;
}

export interface Extensions {
  cacheControl: CacheControl;
  queryComplexity: number;
}

export interface CacheControl {
  version: number;
  hints: Hint[];
}

export interface Hint {
  path: string[];
  maxAge: number;
  scope: string;
}
