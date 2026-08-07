import { Friends } from "../components/Friends";
import ProfileButton from "../components/Profile";
import { World } from "../components/World";
import { useMovement } from "../hooks/useMovement";
import { useWorldSocket } from "../hooks/useWorldSocket";

export function WorkspacePage() {
  const { actors, move, me, disconnect } = useWorldSocket();
  useMovement(move);

  return (
    <>
      <section id="center">
        <h1>Hubspace - Workspace</h1>
        {me && <p>Welcome {me?.user.name}</p>}
        <div style={{ display: "flex", gap: "20px" }}>
          <World actors={actors} />
          <Friends userId={me?.id} actors={actors} />
        </div>
      </section>
      <section id="spacer"></section>
      <ProfileButton disconnect={disconnect} />
    </>
  );
}
