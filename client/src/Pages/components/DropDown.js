export const DropDown = ({ elText, elId, handleClick, elsName }) => {
  return (
    <div>
      {elems.map((el) => (
        <input type="radio" key={el._id} value={el._id} name={listname}>
          {el.name}
        </input>
      ))}
    </div>
  );
};
