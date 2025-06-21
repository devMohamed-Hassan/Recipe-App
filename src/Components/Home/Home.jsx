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

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
      setCategories(data.meals);
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
      <div className="container py-8 px-4">
        <h1 className="font-pacifico text-4xl font-bold py-2.5 bg-gradient-to-r from-[#F29624] to-[#DE6241] bg-clip-text text-transparent">
          Learn, Cook, Eat Your Food
        </h1>
        <ul className="sm:flex hidden mt-8 flex-wrap gap-4 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
          <li
            className={`${selectedCategory === "All" && styles.isActive
              } block catlink px-4 py-2 border transition-all shadow duration-100 rounded-full hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </li>
          {categories.map((cat, index) => (
            <li
              key={index}
              className={`${selectedCategory === cat.strCategory && styles.isActive
                } block catlink px-4 py-2 border cursor-pointer transition-all shadow duration-100 rounded-full hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
              onClick={() => setSelectedCategory(cat.strCategory)}
            >
              {cat.strCategory}
            </li>
          ))}
        </ul>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <GridLoader color="#F29724" size={20} />
          </div>
        ) : (
          <div className="flex flex-wrap py-10">
            {meals.map((meal) => {
              const countryCode = countryCodes[meal.strArea];
              return (
                <div
                  key={meal.idMeal}
                  className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 text-center p-4"
                >
                  <div className="group bg-white p-12 pb-4 rounded-[35px] shadow-md hover:shadow-xl transition-all duration-300 relative overflow-visible font-cursive">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full object-cover rounded-full drop-shadow-xl border-4 border-white -translate-y-16 m-auto transition-all duration-700 group-hover:rotate-[360deg]"
                    />
                    <h3 className="font-semibold -mt-12 font-Pacifico tracking-wider text-xl truncate max-w-[200px]">
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
                      className="text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:bg-emerald-600 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-2 mt-4 rounded-full block w-fit mx-auto"
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
