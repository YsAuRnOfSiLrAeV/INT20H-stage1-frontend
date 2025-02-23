import search_quest from "../assets/search_quest.png";
import CustomSelect from "../components/CustomSelect";

const QuestBar = () => {
  return (
    <section className="w-full mx-auto bg-black z-0 py-4" id="QuestCards">
      <div className="flex flex-col sm:flex-row items-center w-full gap-8 sm:gap-12 mb-5 lg:mb-2">
        <div className="w-full sm:w-1/2 text-center sm:text-left">
          <p className="text-white text-[28px] sm:text-[30px] lg:text-[36px] leading-[1.2] px-4 sm:px-16">
            Онлайн квести
          </p>
        </div>
        <div className="w-full sm:w-auto px-4">
          <form>
            <div className="flex flex-row gap-2 items-center justify-center sm:justify-start">
              <label>
                <img
                  src={search_quest}
                  alt="Search"
                  className="h-5 w-5 block cursor-pointer"
                />
              </label>
              <input
                type="text"
                placeholder="Пошук за ім’ям"
                className="p-1 border border-gray-400 rounded-md w-full sm:w-[350px] bg-black text-white text-center"
              />
            </div>
          </form>
        </div>
          <CustomSelect />
      </div>
    </section>
  );
};

export default QuestBar;
