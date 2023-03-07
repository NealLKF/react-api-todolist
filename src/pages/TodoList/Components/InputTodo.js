import { useState } from "react";
import { useForm } from 'react-hook-form';
import { addTodoData } from "../../../global/fetchAPI";

const InputTodo = ({ oriDataList, setOriDataList, renderList }) => {
  const [newTodo, setNewTodo] = useState("");

  const { register, handleSubmit } = useForm();
  const AddNewTodo = (data, e) => {
    renderList.current = true;
    addTodoData(data, setOriDataList);
    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit(AddNewTodo)}>
      <input
        {...register("content")}
        required
        type="text"
        placeholder="請輸入待辦事項"
      />
      <button type="submit">
        <i className="fa fa-plus"></i>
      </button>
    </form>
  );
};

export default InputTodo;