import './index.css';
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import InputTodo from './Components/InputTodo'
import TodoItem from './Components/TodoItem'

const TodoList = () => {
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
    console.log('filterTodoList');
    const isDoneFilter = tabList.filter((x) => {
      return x.isActive;
    })[0].isDoneCondition;

    if (isDoneFilter === null) {
      setDataList(oriDataList);
    } else {
      const result = oriDataList.filter((x) => {
        return x.isDone === isDoneFilter;
      });
      if (result.length > 0) {
        setDataList(result);
      } else {
        setDataList([]);
      }
    }    
    renderList.current = false;
  };

  const [oriDataList, setOriDataList] = useState([
    { ikey: v4(), note: "把冰箱發霉的檸檬拿去丟", isDone: true },
    { ikey: v4(), note: "打電話叫媽媽匯款給我", isDone: false },
    { ikey: v4(), note: "整理電腦資料夾", isDone: true },
    { ikey: v4(), note: "繳電費水費瓦斯費", isDone: false },
    { ikey: v4(), note: "約vicky禮拜三泡溫泉", isDone: false },
    { ikey: v4(), note: "約ada禮拜四吃晚餐", isDone: false }
  ]);
  
  const renderList = useRef(false);
  //初始化清單內容
  useEffect(() => {    
    if (!renderList.current) {return;}
    filterTodoList();
  }, [tabList, oriDataList]);
  const [dataList, setDataList] = useState(oriDataList);
  const removeAllCompleteItem = () => {
    renderList.current = true;
    setOriDataList(
      oriDataList.filter((x) => {
        return !x.isDone;
      })
    );
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="/#">ONLINE TODO LIST</a>
        </h1>
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
          <div className="todoList_list">
            <ul className="todoList_tab">
              {tabList.map((x, idx) => {
                return (
                  <li key={idx} onClick={clickTab}>
                    <a href="/#" className={x.isActive ? "active" : ""}>
                      {x.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                {dataList.map((x) => {
                  return (
                    <TodoItem
                      key={x.ikey}
                      x={x}
                      oriDataList={oriDataList}
                      setOriDataList={setOriDataList}
                      renderList = {renderList}
                    />
                  );
                })}
              </ul>
              <div className="todoList_statistics">
                <p>
                  {
                    dataList.filter((x) => {
                      return x.isDone;
                    }).length
                  }
                  個已完成項目
                </p>
                <a href="/#" onClick={removeAllCompleteItem}>
                  清除已完成項目
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
