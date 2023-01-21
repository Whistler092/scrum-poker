//Views
import ShowCardsBtn from "./views/ShowCardsBtn";
import Cards from "./views/Cards";
import UsersConnected from "./views/UsersConnected";
import UserStatus from "./views/UserStatus";

export default function Root() {
  return (
    <>
      <div id="header">
        <h1>Poker Items</h1>
      </div>
      <div id="detail">
        <UserStatus />
        <UsersConnected />
        <ShowCardsBtn />
        <hr className="dashed" />

        <Cards />
      </div>
    </>
  );
}
