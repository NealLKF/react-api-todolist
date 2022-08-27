import './index.css';
import { useState, useEffect, useRef, useContext } from "react";
import InputTodo from './Components/InputTodo'
import TodoItem from './Components/TodoItem'
import { AppContext } from '../App';
import { API_sign_out } from "../../global/constants";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { refreshTodoData } from "../../global/fetchAPI";

const TodoList = () => {

  const [oriDataList, setOriDataList] = useState([]);


  useEffect(() => {
    refreshTodoData(setOriDataList, setDataList);
  }, []);


  const { nickname, token } = useContext(AppContext);
  const [tabList, setTabList] = useState([
    { name: "全部", isActive: true, isDoneCondition: null },
    { name: "待完成", isActive: false, isDoneCondition: false },
    { name: "已完成", isActive: false, isDoneCondition: true }
  ]);
  const clickTab = (e) => {
    renderList.current = true;
    setTabList(
      tabList.map((x) => {
        if (x.name === e.target.text) {
          return { ...x, isActive: true };
        } else {
          return { ...x, isActive: false };
        }
      })
    );
  };
  const filterTodoList = () => {
    const isDoneFilter = tabList.filter((x) => {
      return x.isActive;
    })[0].isDoneCondition;
    if (isDoneFilter === null) {
      setDataList(oriDataList);
    } else {
      const result = oriDataList.filter((x) => {
        return (x.completed_at != null) === isDoneFilter;
      });
      if (result.length > 0) {
        setDataList(result);
      } else {
        setDataList([]);
      }
    }
    renderList.current = false;
  };


  const renderList = useRef(false);
  //初始化清單內容
  useEffect(() => {
    if (!renderList.current) { return; }
    filterTodoList();
  }, [tabList, oriDataList]);
  const [dataList, setDataList] = useState([]);
  const removeAllCompleteItem = () => {
    renderList.current = true;
    setOriDataList(
      oriDataList.filter((x) => {
        return x.completed_at != null;
      })
    );
  };
  const signout = () => {
    // console.log('sign out');      
    async function fetchSignout() {
      const postData = {
        "user": {
          "email": "mail",
          "password": "pwd"
        }
      }
      // const { nickname, message } = await fetch(API_sign_out, {
      //   method: "POST",
      //   headers: { "Content-type": "application/json", },
      //   body: JSON.stringify(postData)
      // }).then(res => res.json());
    }
  }

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="/#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm"><Link to="/" style={{ pointerEvents: 'none' }}><span>{`${nickname}的代辦`}</span></Link ></li>
          <li><Link to="/" onClick={() => { signout() }}>登出</Link ></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <InputTodo
              oriDataList={oriDataList}
              setOriDataList={setOriDataList}
              renderList={renderList}
            />
          </div>
          {oriDataList.length > 0 ? (
            <div className="todoList_list">
              <ul className="todoList_tab">
                {tabList.map((x, idx) => {
                  return (
                    <li key={idx} onClick={clickTab}>
                      <Link to="/" className={x.isActive ? "active" : ""} onClick={event => event.preventDefault()} >
                        {x.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {dataList.map((x) => {
                    return (
                      <TodoItem
                        key={x.id}
                        singleItem={x}
                        oriDataList={oriDataList}
                        setOriDataList={setOriDataList}
                        renderList={renderList}
                      />
                    );
                  })}
                </ul>
                <div className="todoList_statistics">
                  <p>
                    {
                      dataList.filter((x) => {
                        return (x.completed_at === null);
                      }).length
                    }
                    個待完成項目
                  </p>
                  <a href="/#" onClick={removeAllCompleteItem}>
                    清除已完成項目
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="todoList_items">
              <p>目前尚無待辦事項</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
