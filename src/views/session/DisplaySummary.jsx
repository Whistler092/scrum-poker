import "./DisplaySummary.scss";

function UserIcon() {
  return <span className="material-symbols-outlined">person</span>;
}

export default function DisplaySummary({ currentSession }) {
  const group = currentSession.usersConnected.reduce((group, user) => {
    const { effort } = user;
    group[effort] = group[effort] ?? [];
    group[effort].push(user);
    return group;
  }, {});

  const entries = Object.entries(group);
  return (
    <div className="display-summary-container">
      {entries.map((effort) => {
        return (
          <div className="display-users-group" key={effort[0]}>
            {effort[0]}
            {Array.apply(null, { length: effort[1].length }).map((e, i) => (
              <UserIcon key={i} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
