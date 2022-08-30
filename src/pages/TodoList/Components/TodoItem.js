import { useContext } from "react";
import { API_patch_todos_toggle } from "../../../global/constants";
import Swal from 'sweetalert2';
import { AppContext } from '../../App';
import { toggleTodoData, deleteTodoData } from "../../../global/fetchAPI";
import { Link } from 'react-router-dom';

const TodoItem = ({ singleItem, oriDataList, setOriDataList, renderList }) => {
    const { token } = useContext(AppContext);
    const removeSingleItem = (e, id) => {
        e.preventDefault();

        Swal.fire({
            icon: 'question',
            title: '刪除確認?',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
        }).then((result) => {
            if (result.isConfirmed) {
                renderList.current = true;
                deleteTodoData(id, setOriDataList);
            }
        })

        // setOriDataList(
        //     oriDataList.filter((x) => {
        //         return x.id !== id;
        //     })
        // );
    };

    //為了前端操作流暢，將oriDataList與toggleTodoData以非同步進行，不等待fetch api結果。
    const changeItemStatus = (e) => {
        toggleTodoData(e.target.value);
        renderList.current = true;
        const updatedDataList = oriDataList.map((x) => {
            return {
                ...x,
                completed_at: x.id === e.target.value ? (e.target.checked ? new Date().toString() : null) : x.completed_at
            };
        });
        setOriDataList(updatedDataList);
    };

    return (
        <li key={singleItem.id}>
            <label className="todoList_label">
                <input
                    className="todoList_input"
                    type="checkbox"
                    defaultChecked={(singleItem.completed_at != null)}
                    onChange={changeItemStatus}
                    value={singleItem.id}
                />
                <span> {singleItem.content}</span>
            </label>

            <Link to="/" onClick={(e) => removeSingleItem(e, singleItem.id)} >
                <i className="fa fa-times"></i>
            </Link>

        </li>
    );
};
export default TodoItem;