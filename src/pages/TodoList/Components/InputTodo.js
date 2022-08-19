
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { v4 } from "uuid";

const InputTodo = ({ oriDataList, setOriDataList, renderList }) => {
    const [newTodo, setNewTodo] = useState("");
    const ChangeNewTodo = (e) => {
      setNewTodo(e.target.value);
    };
    const { register, handleSubmit } = useForm();
    const AddNewTodo = (data) => {
    renderList.current = true;
      setOriDataList([
        { ...data, ikey: v4(), isDone: false },
        ...oriDataList
      ]);
      setNewTodo("");
    };
    return (
      <form onSubmit={handleSubmit(AddNewTodo)}>
        <input
          {...register("note")}
          required
          type="text"
          placeholder="請輸入待辦事項"
          value={newTodo}
          onChange={ChangeNewTodo}
        />
        <button type="submit">
            <i className="fa fa-plus"></i>
        </button>
      </form>
    );
  };
  
export default InputTodo;