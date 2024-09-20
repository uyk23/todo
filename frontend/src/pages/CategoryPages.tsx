import ShowTasks from "../components/ShowTasks";

interface Props {
  page: string;
}

const CategoryPages = ({ page }: Props) => {
  return (
    <div>
      <ShowTasks page={page} />
    </div>
  );
};

export default CategoryPages;
