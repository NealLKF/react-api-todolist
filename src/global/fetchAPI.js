
import { API_get_todos, API_patch_todos_toggle } from "./constants";
import Swal from 'sweetalert2';

  //呼叫兩次，需再確認原因
export const refreshTodoData = async (setOriDataList, setDataList) => {
    const userTodos = await fetch(API_get_todos, {
      method: "Get",
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("token")
      }
    }).then(res => {
      if (res.status === 200) { return res.json() }
      throw new Error('refreshTodoData failed.');
    }).catch(err => {
      console.error(err.message);
    });
    //sorting問題待解
    console.log(userTodos.todos.sort((a,b)=>a.id > b.id));
    setOriDataList(userTodos.todos);
    setDataList(userTodos.todos);
  }
  export const toggleTodoData = async (itemid) => {
    const todoResult = await fetch(`${API_patch_todos_toggle}/${itemid}/toggle`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: window.localStorage.getItem("token")
        }
    }).then(res => {
        if (res.ok) { return res.json() }
        throw new Error('Toggle todo failed.');
    }).catch(err => {
        Swal.fire({ icon: 'error', title: err.message, });
    });
    //refreshTodoData(setOriDataList);
    //setOriDataList(userTodos.todos);
}
