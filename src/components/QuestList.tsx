import React, { useEffect, useState } from "react";
import QuestCard from "./QuestCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const ITEMS_PER_PAGE = 16;

interface Quest {
  id: string;
  title: string;
  description: string;
  duration: string;
  questType: string;
  imageUrl: string;
  createdBy: string;
  createdAt: any; // Firestore timestamp
}

const QuestList: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(quests.length / ITEMS_PER_PAGE);

  console.log("QUESTS", quests);

  // Load quests from Firestore
  useEffect(() => {
    const fetchQuests = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "quests"));
        const questsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Quest[];

        // Load authors
        const questsWithAuthors = await Promise.all(
          questsData.map(async (quest) => {
            if (quest.createdBy) {
              const userRef = doc(db, "users", quest.createdBy);
              const userSnap = await getDoc(userRef);

              if (userSnap.exists()) {
                const userData = userSnap.data();
                console.log("USER INFO", userData);
                return {
                  ...quest,
                  authorName: userData.displayName || "Анонім",
                  authorAvatar: userData.photoURL || "/default-avatar.png",
                };
              }
            }
            return {
              ...quest,
              authorName: "Анонім",
              authorAvatar: "/default-avatar.png",
            };
          })
        );

        setQuests(questsWithAuthors);
      } catch (error) {
        console.error("Помилка завантаження квестів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  const paginatedQuests = quests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center bg-black">
      {loading ? (
        <p className="text-white text-xl">Завантаження...</p>
      ) : quests.length === 0 ? (
        <p className="text-white text-xl">Поки що немає квестів</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {paginatedQuests.map((quest) => (
              <QuestCard key={quest.id} {...quest} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex gap-4 items-center text-white mt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full cursor-pointer ${
                  currentPage === 1 ? "opacity-50" : "hover:bg-blue-600"
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  id={`${ currentPage === i + 1 ? "current_page" : "other_page"}`}
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`p-2 rounded-full cursor-pointer ${
                    currentPage === i + 1
                      ? ""
                      : "hover:bg-blue-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full cursor-pointer ${
                  currentPage === totalPages
                    ? "opacity-50"
                    : "hover:bg-blue-600"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestList;
