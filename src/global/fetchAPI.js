import { API_get_todos, API_patch_todos_toggle, API_post_todos, API_delete_todos, API_sign_out } from "./constants";
import Swal from 'sweetalert2';

//呼叫兩次，需再確認原因
export const refreshTodoData = async (setOriDataList) => {
  const userTodos = await fetch(API_get_todos, {
    method: "Get",
    headers: {
      "Content-type": "application/json",
      Authorization: window.localStorage.getItem("token")
    }
  }).then(res => {
    if (res.status === 200) {
      return res.json()
    }
    throw new Error('refreshTodoData failed.');
  }).then(result => {
    setOriDataList(result.todos);
    return result;
  }).catch(err => {
    console.error(err.message);
  });
  return userTodos;
  //sorting問題待解
  // console.log(userTodos.todos.sort((a, b) => a.id > b.id));

  //setDataList(userTodos.todos);

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
export const addTodoData = async (newitem, setOriDataList) => {
  const postData = {
    "todo": { ...newitem }
  }
  await fetch(API_post_todos, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: window.localStorage.getItem("token")
    },
    body: JSON.stringify(postData)
  }).then(res => {
    if (res.ok) {
      Swal.fire({ icon: 'info', title: '新增成功', });
      refreshTodoData(setOriDataList);
      return res.json();
    }
    throw new Error('Add new todo failed.');
  }).catch(err => {
    Swal.fire({ icon: 'error', title: err.message, });
  });
}
export const deleteTodoData = async (itemid, setOriDataList) => {
  await fetch(`${API_delete_todos}/${itemid}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: window.localStorage.getItem("token")
    }
  }).then(res => {
    if (res.ok) {
      Swal.fire({ icon: 'info', title: '刪除成功', });
      refreshTodoData(setOriDataList);
      return res.json();
    }
    throw new Error('Add new todo failed.');
  }).catch(err => {
    Swal.fire({ icon: 'error', title: err.message, });
  });
}
export const deletePatchTodoData = async (arrayItem, setOriDataList) => {
  let RemoveAllDone = true;
  for (let i of arrayItem) {
    const { id } = i;
    await fetch(`${API_delete_todos}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("token")
      }
    }).then(res => {
      if (res.ok) {
        return true;
      }
      throw new Error('Delete todo failed.');
    }).catch(err => {
      RemoveAllDone = false;
      Swal.fire({ icon: 'error', title: err.message, });
    });
  }
  if (RemoveAllDone) {
    refreshTodoData(setOriDataList);
  }
}
export const User_sign_out = async (setToken) => {
  const result = await fetch(API_sign_out, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: window.localStorage.getItem("token")
    }
  }).then(res => {
    if (res.ok) { return res.json(); }
    throw new Error('Sign out failed.');
  }).catch(err => {
    Swal.fire({ icon: 'error', title: err.message, });
  });

  Swal.fire({ icon: 'info', title: result.message, });
  setToken(null);  
  window.localStorage.removeItem("token");

}