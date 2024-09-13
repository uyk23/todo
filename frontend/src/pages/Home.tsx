import AddTask from "../components/AddTask";
import ShowTasks from "../components/ShowTasks";

const Home = () => {
  return (
    <div className="mx-5">
      <AddTask />
      <ShowTasks page="all" />
    </div>
  );
};

export default Home;
