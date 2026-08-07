import { useEffect, useState } from "react";
import type { UserFriends } from "../../../shared/user";
import type { ReadOnlyActors } from "../../../shared/world";
import { getUserFriends } from "../api/client";
import { UserItem } from "./UserItem";

export function Friends(props: {
  userId: number | void;
  actors: ReadOnlyActors;
}) {
  const { userId } = props;
  const [data, setData] = useState<UserFriends>();

  useEffect(() => {
    if (userId) getUserFriends().then(setData).catch(console.error);
  }, [userId]);

  if (!data || !data.me) return <ul />;

  // TODO leverage actors to see who is online
  return (
    <div id="presence">
      <h3 style={{ textAlign: "left" }}>Connected Users</h3>
      <div id="presence">
        <ul id="user-list">
          <UserItem
            name={data.me.name}
            email={data.me.email}
            color={data.me.color}
          ></UserItem>
          {data.friends?.map(({ id, ...others }) => (
            <UserItem key={id} {...others}></UserItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
