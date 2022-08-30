import './index.css';
import { useState, useEffect, useRef, useContext } from "react";
import InputTodo from './Components/InputTodo'
import TodoItem from './Components/TodoItem'
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { refreshTodoData, User_sign_out, deletePatchTodoData } from "../../global/fetchAPI";

const TodoList = () => {
  const renderList = useRef(false);
  const { nickname, setToken } = useContext(AppContext);
  const [oriDataList, setOriDataList] = useState([]);
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
  const [dataList, setDataList] = useState([]);
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

  useEffect(() => {
    (async () => {
      //等待API取得Todo清單後，再設定renderList.current，方可順利初始化OriDataList)，否則會初始失敗
      await refreshTodoData(setOriDataList);
      renderList.current = true;
    })()
  }, []);
  //初始化清單內容
  useEffect(() => {
    if (!renderList.current) { return; }
    filterTodoList();
  }, [tabList, oriDataList]);

  const removeAllCompleteItem = (e) => {
    e.preventDefault();
    renderList.current = true;
    deletePatchTodoData(oriDataList.filter((x) => {
      return x.completed_at != null;
    }), setOriDataList);

  };
  const signout = (e) => {
    e.preventDefault();
    User_sign_out(setToken);
  }

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <Link to="/" style={{ pointerEvents: 'none' }}><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" />ONLINE TODO LIST</Link >
        </h1>
        <ul>
          <li className="todo_sm"><Link to="/" style={{ pointerEvents: 'none' }}><span>{`${nickname}的代辦`}</span></Link ></li>
          <li><Link to="/" onClick={signout}>登出</Link ></li>
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
                  <Link to="/" onClick={removeAllCompleteItem}>
                    清除已完成項目
                  </Link>
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
