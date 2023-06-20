import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import CourseInputInner from "../CourseInput/CourseInputInner";
import CourseGoalList from "../CourseGoalList/CourseGoalList";
import "./CourseGoalItem.css";

const CourseGoalItem = (props) => {
  // const [deleteText, setDeleteText] = useState('');
  let [clicked, setClicked] = useState("");
  const deleteHandler = () => {
    setClicked("clicked");
    setTimeout(() => {
      props.onDelete(props.id);
    }, 250);
    // setDeleteText('(Deleted!)');
  };
  const [courseGoals, setCourseGoals] = useState([]);

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("courseGoals"));
    if (storedGoals) {
      setCourseGoals(storedGoals);
    }
  }, []);

  useState(() => {
    localStorage.setItem("courseGoals", JSON.stringify(courseGoals));
  }, [courseGoals]);
  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };
  const addGoalHandler = (enteredText) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
  };

  let content = <p style={{ textAlign: "center" }}></p>;

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList
        items={courseGoals}
        onDeleteItem={deleteItemHandler}
      ></CourseGoalList>
    );
  }

  return (
    <li className={`goal-item ${clicked}`}>
      {props.children}
      <AiOutlineCheck onClick={deleteHandler} className={`icon ${clicked}`} />
      <CourseInputInner onAddGoal={addGoalHandler}></CourseInputInner>
      <section id="goals">{content}</section>
    </li>
  );
};

export default CourseGoalItem;
