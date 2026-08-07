import type { PublicUser } from "../../../shared/user";

export function UserItem(props: Pick<PublicUser, "name" | "email" | "color">) {
  const { name, email, color } = props;
  return (
    <li className="user-item">
      <span
        className="user-item-dot"
        style={{ backgroundColor: color || "gray" }}
      />
      {name} &lt;{email}&gt;
    </li>
  );
}
