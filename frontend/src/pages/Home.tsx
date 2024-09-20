import AddTask from "../components/AddTask";
import ShowTasks from "../components/ShowTasks";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <>
      {isLoggedIn ? (
        <div className="mx-5">
          <AddTask />
          <ShowTasks page="all" />
        </div>
      ) : (
        <div>
          please
          <em>
            <em>
              <Link to="/login">log in</Link>
            </em>
          </em>
          to create and view your tasks
          <br />
          more features <em>coming soon</em>!
        </div>
      )}
    </>
  );
};

export default Home;
