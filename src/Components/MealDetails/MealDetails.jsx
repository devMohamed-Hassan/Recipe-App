import React, { useEffect, useState } from 'react';
import styles from './MealDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';

function MealDetails() {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getMealDetails = async (param) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const { data } = await axios.get(`
        https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`
      );
      if (!data.meals || data.meals.length === 0) {
        throw new Error("No Meal Found!");
      }
      setMealDetails(data.meals || []);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMealDetails(id);
  }, [id]);


  if (loading) return (
    <div className="flex justify-center items-center min-h-dvh">
      <RiseLoader color="#e11d48" />
    </div>
  );

  if (errorMessage)
    return (
      <div className="flex justify-center items-center min-h-dvh bg-red-50">
        <div className="bg-white border border-gray-300 text-red-800 px-4 py-5 lg:px-6 lg:py-5 rounded-2xl shadow-md text-center max-w-md mx-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 font-pacifico bg-gradient-to-r from-[#F29624] to-[#DE6241] bg-clip-text text-transparent">
            Something went wrong
          </h2>
          <p className="text-lg lg:text-xl font-cursive text-emerald-600">{errorMessage}</p>
        </div>
      </div>
    );
  return (
    <div className="min-h-dvh container p-4 lg:p-6">
      {errorMessage && <p className="bg-red-300 p-4 text-center">{errorMessage}</p>}
      {mealDetails.map((meal) => (
        <div key={meal.idMeal}>
          <h1 className="text-3xl lg:text-5xl mb-4 lg:mb-6 font-pacifico font-bold text-center lg:text-start">{meal.strMeal}</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded-2xl mb-4"
              />
              <ul className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center mt-4">
                <li className="bg-red-600 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition duration-300">

                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <i className="fab fa-youtube"></i>
                    YouTube
                  </a>
                </li>
                {meal.strSource && (
                 <li className="bg-[#21BA75] text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 hover:bg-[#1da766]">
                    <a
                      href={meal.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <i className="fa-solid fa-globe"></i>
                      Source
                    </a>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="lg:w-1/3 font-cursive">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4">Instructions</h2>
              <p className="text-gray-700 whitespace-pre-line text-sm lg:text-base leading-relaxed">{meal.strInstructions}</p>
            </div>
          
            <div className="lg:w-1/3 font-cursive">
              <div className="bg-white rounded-2xl p-4 shadow">
                <h2 className="text-xl lg:text-2xl font-semibold pb-3 mb-4 border-b-3 border-gray-300">Ingredients</h2>
                <div className="max-h-96 overflow-y-auto">
                  {Array.from({ length: 20 }, (_, i) => {
                    const ingredient = meal[`strIngredient${i + 1}`];
                    if (ingredient && ingredient.trim() !== '') {
                      const imgUrl = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2 p-2 border-b border-gray-200 last-of-type:border-b-0"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <img
                              src={imgUrl}
                              alt={ingredient}
                              className="w-8 h-8 lg:w-10 lg:h-10 object-cover rounded-full border border-gray-300 p-1 bg-[#F4F2EE] flex-shrink-0"
                            />
                            <span className="text-sm lg:text-base truncate">{ingredient}</span>
                          </div>
                          <span className="text-sm lg:text-base text-gray-600 font-medium flex-shrink-0">{meal[`strMeasure${i + 1}`]}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealDetails;
