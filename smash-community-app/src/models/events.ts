export interface SmashEvents {
  events: SmashEvent[];
}

export interface SmashEvent {
  id: number;
  creator_id: number;
  event_name: string;
  attendees: number;
  description: string;
  event_date: string;
  is_in_person: number | null;
  location: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}
