import React from "react";

class ToDoList extends React.Component {
  state = {
    list: ["Clean house", "Wash dishes", "Go shopping"],
    invalid: false,
    newItem: "",
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    console.log(this.state.invalid);
    if (this.state.invalid) {
      const newItem = this.state.newItem;
      const restOfWord = newItem.slice(1);
      const firstLetter = newItem[0].toUpperCase();
      const capitalisedWord = firstLetter + restOfWord;

      this.setState((currentState) => {
        return {
          invalid: !currentState.invalid,
          list: [capitalisedWord, ...currentState.list],
          newItem: "",
        };
      });
    }
  };
  handleInput = (inputEvent) => {
    const input = inputEvent.target.value;
    const containsSpecialChar = /[!@#$%^&*£)(+=._-]/.test(input);
    if (!containsSpecialChar) {
      this.setState((currentState) => {
        console.log(currentState);
        return { newItem: input, invalid: true };
      });
    }
  };

  handleDelete = (clickEvent) => {
    const itemName = clickEvent.target.id;
    const listArray = this.state.list;
    const ArrayWithRemovedItem = listArray.filter((item) => {
      return item !== itemName;
    });
    this.setState(() => {
      return { list: ArrayWithRemovedItem };
    });
  };
  render() {
    return (
      <div>
        <h2>CheckList</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            Add to checklist:
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.newItem}
            />
          </label>
          <button>Submit</button>
        </form>
        <ul id="list">
          {this.state.list.map((item, index) => {
            return (
              <li key={item}>
                <p>
                  {`
                  ${item} | DateDue: 23/09/2020  |`}
                  <button
                    id={item}
                    className="listButton"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
