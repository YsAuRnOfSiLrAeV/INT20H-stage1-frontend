import search_quest from "../assets/search_quest.png";
import CustomSelect from "../components/CustomSelect";

const QuestBar = () => {
  return (
    <section id="QuestCards" className={`w-full mx-auto bg-black z-0 h-28`} style={{paddingTop: "40px"}}>
      <div className="flex flex-row items-center w-full gap-12">
        <div className="w-1/2">
          <p
            className="text-white lg:text-[36px] sm:text-[30px] xs:text-[26px] text-[20px] lg:leading-[36px]"
            style={{ paddingLeft: "60px" }}
          >
            Онлайн квести
          </p>
        </div>
        <div>
          <form>
            <div className="flex flex-row gap-2 items-center">
              <label>
                <img
                  src={search_quest}
                  alt="Search"
                  className="h-5 w-5 block cursor-pointer"
                  style={{ paddingTop: "1px" }}
                />
              </label>
              <input
                type="text"
                placeholder="Пошук за ім’ям"
                style={{
                  padding: "4px",
                  marginTop: "3px",
                  border: "1px solid #B2ABB1",
                  borderRadius: "5px",
                  width: "350px",
                  color: "white",
                  textAlign: "center",
                }}
              />
            </div>
          </form>
        </div>
        {/* <select style={{ padding: '7px', marginTop: '3px', border: '1px solid #B2ABB1', borderRadius: '5px', color: 'white', textAlign: 'center', width: '15%', backgroundColor: '#000', appearance: 'none'}}>
                    <option value="popularity" style={{ backgroundColor: '#000', border: '1px solid #B2ABB1', borderRadius: '0 0 5px 5px'}}>
                        За популярністю
                    </option>
                    <option value="rating" style={{ backgroundColor: '#000', border: '1px solid #B2ABB1', borderRadius: '0 0 5px 5px'}}>
                        За рейтингом
                    </option>
                </select> */}
        <CustomSelect />
      </div>
    </section>
  );
};

export default QuestBar;
