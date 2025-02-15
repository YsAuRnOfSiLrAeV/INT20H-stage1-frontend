import React, { useState } from "react";
import { GrTask } from "react-icons/gr";
import { MdOutlineWatchLater } from "react-icons/md";

interface QuestCardProps {
  imageAuthor?: string;
  title?: string;
  rating?: number;
  imageUrl?: string;
  tasks?: number;
  duration?: string;
  players?: number;
  authorName?: string;
  authorAvatar?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  rating,
  imageUrl,
  tasks = 1,
  duration,
  players,
  authorName,
  authorAvatar,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={
        "relative bg-black text-white rounded-2xl min-w-80 min-h-80 overflow-hidden opacity-100"
      }
      style={{
        border: "1px solid rgba(173, 173, 192, 0.2)",
        marginTop: "32px",
        position: "relative",
        margin: "16px"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <button
            style={{
              opacity: "90%",
              backgroundColor: "white",
              color: "black",
              fontWeight: "600",
              padding: "8px 24px",
              borderRadius: "8px",
              marginBottom: "8px",
              fontSize: "18px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "180px",
              cursor: "pointer",
            }}
          >
            Детальніше
          </button>
          <button
            style={{
              opacity: "90%",
              backgroundColor: "white",
              color: "black",
              fontWeight: "600",
              padding: "8px 24px",
              borderRadius: "8px",
              fontSize: "18px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "180px",
              cursor: "pointer",
            }}
          >
            Пройти квест
          </button>
        </div>
      )}

      <img
        src={imageUrl}
        alt={title}
        className={`${
          isHovered
            ? "w-full object-cover rounded-t-lg transition duration-300 opacity-30"
            : "w-full object-cover rounded-t-lg transition duration-300 opacity-100"
        }`}
        style={{ height: "180px" }}
      />

      <div className="flex justify-between items-center mt-4">
        <h3
          className={`${
            isHovered
              ? "text-white text-5xl font-extrabold leading-snug w-full transition duration-300 opacity-30"
              : "text-white text-5xl font-extrabold leading-snug w-full transition duration-300 opacity-100"
          }`}
          style={{
            overflowWrap: "break-word",
            fontSize: "24px",
            margin: "6px",
          }}
        >
          {title}
        </h3>
        <div className="flex items-center">
          <span
            className={`${
              isHovered
                ? "text-2xl ml-2 transition duration-300 opacity-30"
                : "text-2xl ml-2 transition duration-300 opacity-100"
            }`}
          >
            {rating?.toFixed(1)}
          </span>
          <span
            id="star"
            className={`${
              isHovered
                ? "text-2xl ml-2 transition duration-300 opacity-30"
                : "text-2xl ml-2 transition duration-300 opacity-100"
            }`}
          >
            ★
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", paddingLeft: 6 }}>
        <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <GrTask />
          {tasks}
        </span>
        <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <MdOutlineWatchLater /> {duration} хвилин
        </span>
      </div>

      <div
        className={`${
          isHovered
            ? "text-gray-400 text-lg mt-3 transition duration-300 opacity-30"
            : "text-gray-400 text-lg mt-3 transition duration-300 opacity-100"
        }`}
        style={{ marginLeft: "6px", marginTop: "2px" }}
      >
        {players ? <p>{players} пройшли тест</p> : <p>Станьте першими!</p>}
      </div>

      <div
        className={`${
          isHovered
            ? "flex items-center mt-4 text-[#CFCFE3] transition duration-300 opacity-30"
            : "flex items-center mt-4 text-[#CFCFE3] transition duration-300 opacity-100"
        }`}
      >
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-8 h-8 rounded-full mr-3"
          style={{ marginLeft: "6px", marginTop: "2px" }}
        />
        <span className="text-lg">{authorName}</span>
      </div>
    </div>
  );
};

export default QuestCard;
