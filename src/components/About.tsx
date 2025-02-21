import { Dialog, Transition } from "@headlessui/react";
import SpotlightCard from "../components/SpotlightCard";
import QuestCreationModal from "./QuestCreationModal";
import { useUser } from "../context/UserContext";
import { Fragment, useState } from "react";

const About = () => {
  const { user } = useUser();
  const [isQuestModalOpen, setQuestModalOpen] = useState(false);
  const handleCreateQuestClick = () => {
    if (user) {
      setQuestModalOpen(true);
    } else {
      alert("Будь ласка, увійдіть у систему для створення квесту.");
    }
  };
  
  return (
    <section
      className={`w-full mx-auto bg-black z-0 pt-10 pb-20 md:h-screen`}
    >
      <div className="flex flex-col lg:flex-row items-center gap-18 lg:gap-35 w-full">
        <div className="lg:w-1/2">
          <p
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight px-4 sm:px-0 md:pl-16"
          >
            <text id="text">MetaQuest</text> - онлайн платформа, де саме ТИ можеш
            створювати та проходити квести як онлайн, так і наживо
          </p>
        </div>
        <div>
          <SpotlightCard
            className="custom-spotlight-card z-60 lg:top-[170px]"
            spotlightColor="rgba(255, 255, 255, 0.2)"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="flex flex-col items-center gap-3.5"
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "20px",
                paddingBottom: "0px",
              }}
            >
              <p className="text-white lg:text-[46px] sm:text-[40px] xs:text-[36px] text-[30px] lg:leading-[46px]">
                Випробуй себе
              </p>
              <p className="text-white lg:text-[46px] sm:text-[40px] xs:text-[36px] text-[30px] lg:leading-[46px]">
                вже зараз!
              </p>
              <div
                id="main-button"
                onClick={handleCreateQuestClick}
                className="cursor-pointer flex"
              >
                <a className="flex items-center text-white text-2xl sm:text-xl md:text-[26px] lg:leading-[26px]">
                  Створи свій квест! 
                </a>
              </div>
              <p>або</p>
              <div id="go_to_exhist">
                <a
                  href="#QuestCards"
                  className="text-white text-2xl sm:text-xl md:text-[26px] lg:leading-[26px]"
                >
                  Перейди до існуючих
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <Transition show={isQuestModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClose={() => setQuestModalOpen(false)}
        >
          <QuestCreationModal onClose={() => setQuestModalOpen(false)} />
        </Dialog>
      </Transition>
    </section>
  );
};

export default About;
