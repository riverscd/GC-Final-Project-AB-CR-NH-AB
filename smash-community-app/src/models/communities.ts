export interface Communities {
  communities: Community[];
}

export interface Community {
  id: number;
  community_name: string;
  creator_id: number;
  community_members: number[];
  location: string;
  posts: number[];
  community_profile_img: null | string;
  description: string;
}
