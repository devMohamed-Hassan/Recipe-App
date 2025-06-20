import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

function Home() {
  const [categories, setCastegories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
      //console.log(data.meals);
      setCastegories(data.meals);
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const getMeals = async (category) => {
    try {
      setLoading(true);
      const url = category === "All"
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const { data } = await axios.get(url);
      //console.log(data.meals);
      setMeals(data.meals);

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getCategories();

  }, []);

  useEffect(() => {
    getMeals(selectedCategory);

  }, [selectedCategory]);


  return (
    <>
      <div className="min-h-dvh">
        <h1 className="text-4xl font-bold py-2.5">Learn, Cook, Eat Your Food</h1>
        <ul className="flex flex-wrap gap-x-2 gap-y-2">
          <li className={`${selectedCategory === "All" && styles.isActive} border border-gray-300 py-1 px-1.5 rounded-2xl bg-red-300 text-white font-bold cursor-pointer text-xl`}
            onClick={() => setSelectedCategory("All")}
          >All</li>
          {categories.map((cat, index) => <li key={index}
            className={`${selectedCategory === cat.strCategory && styles.isActive} border border-gray-300 py-1 px-1.5 rounded-2xl bg-red-300 text-white font-bold cursor-pointer text-xl`}
            onClick={() => setSelectedCategory(cat.strCategory)}
          >
            {cat.strCategory}</li>
          )}
        </ul>
        {loading === true ? <BeatLoader className="m-auto text-orange-400" /> : <div className="flex flex-wrap py-10">
          {meals.map((meal) => <div key={meal.idMeal}
            className="sm:w-full md:w-[50%] lg:w-[33.3333%] xl:w-[25%] text-center p-5"
          >
            <div className="inner bg-white rounded-2xl pb-3">
              <img src={meal.strMealThumb} alt={meal.strMeal}
                className="w-[50%] rounded-full m-auto"

              />
              <h2>{meal.strMeal}</h2>
              <h3>{meal.strArea}</h3>
              <Link to={"/mealdetails/${meal.idMeal}"} className="bg-[#21BA75] text-white p-3 rounded-2xl w-fit block m-auto my-2">Veiw Recipe</Link>


            </div>

          </div>)}

        </div>}

      </div>
    </>

  )
}

export default Home