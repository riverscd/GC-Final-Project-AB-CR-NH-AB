export interface GetTournamentsResponse {
  data: Data;
  extensions: Extensions;
  actionRecords: any[];
}

export interface Data {
  tournaments: Tournaments;
}

export interface Tournaments {
  nodes: TournamentNode[];
}

export interface TournamentNode {
  id: number;
  name: string;
  city: string;
  state: number;
  postalCode: string;
  venueName: string;
  countryCode: string;
  endAt: number;
  events: CompetitionEvent[];
  hasOfflineEvents: boolean;
  hasOnlineEvents: boolean;
  images: Image[];
  isRegistrationOpen: boolean;
  numAttendees: number;
  registrationClosesAt: number;
  slug: string;
  startAt: number;
}

export interface CompetitionEvent {
  competitionTier: number;
  name: string;
}

export interface Image {
  url: string;
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
