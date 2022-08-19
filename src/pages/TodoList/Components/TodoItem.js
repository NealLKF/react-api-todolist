
const TodoItem = ({ x, oriDataList, setOriDataList, renderList }) => {
    const removeSingleItem = (ikey) => {
        renderList.current = true;
        setOriDataList(
            oriDataList.filter((x) => {
                return x.ikey !== ikey;
            })
        );
    };

    const updateStatus = (e) => {
        renderList.current = true;
        const updatedDataList = oriDataList.map((x) => {
            return {
                ...x,
                isDone: x.ikey === e.target.value ? e.target.checked : x.isDone
            };
        });
        setOriDataList(updatedDataList);
    };

    return (
        <li key={x.ikey}>
            <label className="todoList_label">
                <input
                    className="todoList_input"
                    type="checkbox"
                    defaultChecked={x.isDone}
                    onChange={updateStatus}
                    value={x.ikey}
                />
                <span> {x.note}</span>
            </label>
            <a href="#!" onClick={() => removeSingleItem(x.ikey)}>
                <i className="fa fa-times"></i>
            </a>
        </li>
    );
};
export default TodoItem;