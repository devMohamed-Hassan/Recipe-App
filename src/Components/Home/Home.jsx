import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

function Home() {
  const countryCodes = {
    "American": "us",
    "British": "gb",
    "Canadian": "ca",
    "Chinese": "cn",
    "Croatian": "hr",
    "Dutch": "nl",
    "Egyptian": "eg",
    "Filipino": "ph",
    "French": "fr",
    "Greek": "gr",
    "Indian": "in",
    "Irish": "ie",
    "Italian": "it",
    "Jamaican": "jm",
    "Japanese": "jp",
    "Kenyan": "ke",
    "Malaysian": "my",
    "Mexican": "mx",
    "Moroccan": "ma",
    "Polish": "pl",
    "Portuguese": "pt",
    "Russian": "ru",
    "Spanish": "es",
    "Thai": "th",
    "Tunisian": "tn",
    "Turkish": "tr",
    "Ukrainian": "ua",
    "Uruguayan": "uy",
    "Vietnamese": "vn"
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      setCategories(data.categories);
      //console.log(data.categories)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMeals = async (category) => {
    try {
      setLoading(true);
      const url =
        category === "All"
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=`
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const { data } = await axios.get(url);
      setMeals(data.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getMeals(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="container py-4 px-4 lg:py-8 lg:px-6">
        <h1 className="font-pacifico text-2xl sm:text-3xl lg:text-4xl font-bold py-2.5 bg-gradient-to-r from-[#F29624] to-[#DE6241] bg-clip-text text-transparent text-center">
          Learn, Cook, Eat Your Food
        </h1>
        <div className="lg:hidden mt-6">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium  font-cursive">
              {selectedCategory}
            </span>
            <i className={`fas fa-chevron-${showCategories ? 'up' : 'down'} text-gray-500`}></i>
          </button>
          {showCategories && (
            <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div
                className={`px-4 py-3 cursor-pointer shadow transition-colors font-cursive flex items-center gap-3 ${selectedCategory === 'All' ? 'bg-[#F29724] text-white hover:bg-orange-400' : 'hover:bg-gray-50'
                  }`}
                onClick={() => {
                  setSelectedCategory("All");
                  setShowCategories(false);
                }}
              >
                All
              </div>
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 cursor-pointer  transition-colors font-cursive flex items-center gap-3 rounded-md ${selectedCategory === cat.strCategory ? 'bg-[#F29724] text-white hover:bg-orange-400' : 'hover:bg-gray-50'
                    }`}
                  onClick={() => {
                    setSelectedCategory(cat.strCategory);
                    setShowCategories(false);
                  }}
                >
                  <img
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <span>{cat.strCategory}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="hidden lg:block mt-8 overflow-x-auto custom-scrollbar bg-white border border-gray-200 shadow-xl rounded-lg font-cursive">
          <ul className="relative flex gap-3 min-w-max px-4 py-2">
            <li
              className={`cursor-pointer text-sm font-semibold transition-all duration-200 px-6 py-2 rounded-full
        ${selectedCategory === "All"
                  ? "bg-orange-500 text-white shadow-md "
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm "}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </li>
            {categories.map((cat, index) => (
              <li
                key={index}
                className={`cursor-pointer text-sm font-semibold transition-all duration-200 px-6 py-2 rounded-full
          ${selectedCategory === cat.strCategory
                    ? "bg-orange-500 text-white shadow-md "
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm "}`}
                onClick={() => setSelectedCategory(cat.strCategory)}
              >
                {cat.strCategory}
              </li>
            ))}
          </ul>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64 lg:h-screen">
            <GridLoader color="#F29724" size={20} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 py-6 lg:py-10">
            {meals.map((meal) => {
              const countryCode = countryCodes[meal.strArea];
              return (
                <div
                  key={meal.idMeal}
                  className="text-center"
                >
                  <div className="group bg-white p-6 lg:p-12 pb-4 rounded-[35px] shadow-md hover:shadow-xl transition-all duration-300 relative overflow-visible font-cursive">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full object-cover rounded-full drop-shadow-xl border-4 border-white -translate-y-8 lg:-translate-y-16 m-auto transition-all duration-700 group-hover:rotate-[360deg]"
                    />
                    <h3 className="font-semibold -mt-8 lg:-mt-12 font-Pacifico tracking-wider text-lg lg:text-xl truncate max-w-[200px] mx-auto">
                      {meal.strMeal}
                    </h3>

                    {meal.strArea && (
                      <h5 className="flex justify-center items-center gap-2 text-emerald-600 text-sm mt-2">
                        {countryCode && (
                          <img
                            src={`https://flagcdn.com/w40/${countryCode}.png`}
                            alt={meal.strArea}
                            className="w-5 h-4 object-cover rounded-sm border"
                          />
                        )}
                        {meal.strArea}
                      </h5>
                    )}
                    <Link
                      to={`/mealdetails/${meal.idMeal}`}
                      className="text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:bg-emerald-600 font-semibold hover:shadow-lg transition-all duration-300 px-6 lg:px-8 py-2 mt-4 rounded-full block w-fit mx-auto text-sm lg:text-base"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
