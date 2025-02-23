import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { db } from "../lib/firebase";
import { collection, getDocs } from 'firebase/firestore';

const Quest = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Тимчасові питання для перевірки прогресу
        const testQuestions = [
            { questionText: "Питання 1", answers: ["Відповідь A", "Відповідь B", "Відповідь C", "Відповідь D"] },
            { questionText: "Питання 2", answers: ["Відповідь X", "Відповідь Y", "Відповідь Z", "Відповідь C"] },
            { questionText: "Питання 3", answers: ["Відповідь 1", "Відповідь 2", "Відповідь 3", "Відповідь 4"] },
            { questionText: "Питання 4", answers: ["Відповідь 1", "Відповідь 2", "Відповідь 3", "Відповідь 4"] },
            { questionText: "Питання 5", answers: ["Відповідь 1", "Відповідь 2", "Відповідь 3", "Відповідь 4"] }
        ];
        setQuestions(testQuestions);
    }, []);

    const handleStepChange = (value) => {
        setCurrentIndex(value);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <section className="relative w-full h-screen mx-auto bg-black flex flex-col gap-10 items-center p-5">
            <div className="w-4/5 overflow-x-auto custom-steps-container">
                <Steps
                    size="small"
                    current={currentIndex}
                    onChange={handleStepChange}
                    direction="horizontal"
                    items={questions.map((_, index) => ({ title: isMobile ? "" : `Крок ${index + 1}` }))}
                    className="custom-steps"
                />
            </div>
            <div className="min-h-24 p-4 border border-gray-500 rounded w-4/5 text-white text-left">
                <p className="text-lg font-semibold">
                    {questions.length > 0 ? questions[currentIndex].questionText : 'Завантаження...'}
                </p>
            </div>
            <div className="min-h-48 p-4 border border-gray-500 rounded w-4/5 text-white text-left">
                {questions.length > 0 && questions[currentIndex].answers.map((answer, i) => (
                    <button
                        key={i}
                        onClick={() => console.log(`Вибрано: ${answer}`)}
                        className="block w-full text-left px-4 py-2 my-2 border rounded bg-[#b3b3c7] hover:bg-gray-200 hover:cursor-pointer transition duration-200 text-[#222]"
                    >
                        {answer}
                    </button>
                ))}
            </div>
            <div className="w-full flex justify-center gap-5">
                <button onClick={prevQuestion} disabled={currentIndex === 0} className="bg-[#CFCFE3] hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer min-w-30 text-[#333]">
                    &lt; Попереднє
                </button>
                <button onClick={nextQuestion} disabled={currentIndex === questions.length - 1} className="bg-[#CFCFE3] hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer min-w-30 text-[#333]">
                    Наступне &gt;
                </button>
            </div>
            <button
                onClick={() => console.log('Тест завершено')}
                className="mt-4 px-6 py-3 bg-red-400 text-white font-bold rounded-lg hover:bg-red-600 hover:cursor-pointer transition duration-200"
            >
                Завершити тест
            </button>
            <style jsx>{`
                @keyframes move {
                    0% {
                        background-position: 0 0;
                    }

                    25% {
                        background-position: 100% 0;
                    }

                    50% {
                        background-position: 100% 100%;
                    }

                    75% {
                        background-position: 0 100%;
                    }

                    100% {
                        background-position: 0 0;
                    }
                }

                .custom-steps .ant-steps-item {
                    color: white;
                }
                .custom-steps .ant-steps-item-process .ant-steps-item-icon {
                    color: white;
                    background-image: linear-gradient(45deg, #2F6ADC, #B163FF);
                    background-size: 200% 200%;
                    animation: move 4s ease infinite;
                }
                .custom-steps .ant-steps-item-finish .ant-steps-item-icon {
                    background-color: #CFCFE3;
                    border-color: #CFCFE3;
                    
                }
                .custom-steps .ant-steps-item-title {
                    color: white !important;
                }
                
                /* Стили для мобильного экрана */
                @media (max-width: 768px) {
                    .custom-steps-container {
                        overflow-x: auto !important;
                        white-space: nowrap !important;
                        width: 100% !important;
                        display: flex;
                        justify-content: center;
                    }
                    .custom-steps {
                        display: flex !important;
                        flex-direction: row !important;
                        flex-wrap: nowrap !important;
                        scroll-snap-type: x mandatory;
                        overflow-x: auto !important;
                        width: max-content !important;
                        max-width: 100%;
                    }
                    .custom-steps .ant-steps-item {
                        flex: none !important;
                        scroll-snap-align: center;
                        min-width: 40px !important;
                    }
                    .custom-steps .ant-steps-item-title {
                        display: none !important;
                    }
                    .custom-steps .ant-steps-item-tail {
                        display: none !important;
                    }

                    /* Стили для будущих (неактивных) шагов */
                    .custom-steps .ant-steps-item-wait .ant-steps-item-icon {
                        background-color: transparent !important;
                        border-color: transparent !important;
                        color: white !important; /* Делаем цифры белыми */
                    }
                }
            `}</style>
        </section>
    );
};

export default Quest;