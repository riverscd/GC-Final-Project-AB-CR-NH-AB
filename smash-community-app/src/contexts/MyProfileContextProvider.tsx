import { ReactNode, useState } from "react";
import { Event } from "../models/events";
import { TournamentNode } from "../models/smash";
import { User } from "../models/users";

export function MyProfileContextProvider(props: { children: ReactNode }) {
  const [myProfile, setMyProfile] = useState<Event[]>([]);

  function LoggedInUser(user: User) {
    if (
    !myProfile.some((LoggedInUser: User): boolean => {
      return LoggedInUser.id === event.id;
    }) ) {
      setMyProfile((prev) => [...prev, ])
    }
}
