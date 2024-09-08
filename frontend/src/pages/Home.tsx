import AddTask from "../components/AddTask";
import ShowTasks from "../components/ShowTasks";

const Home = () => {
  return (
    <div>
      <ShowTasks page="home" />
      <AddTask />
    </div>
  );
};

export default Home;
