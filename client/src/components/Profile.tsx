export default function ProfileButton(props: { disconnect: () => void }) {
  const { disconnect } = props;

  const logout = () => {
    disconnect();
    window.location.assign("/");
  };

  return (
    <div className="profile-button">
      <button className="action" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
