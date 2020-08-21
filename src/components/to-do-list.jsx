import React from "react";

class ToDoList extends React.Component {
  state = {
    list: [
      { task: "Clean house", DateDue: "01 / 09 / 2020", priority: "!" },
      { task: "Wash dishes", DateDue: "23 / 09 / 2020", priority: "!!" },
      { task: "Go shopping", DateDue: "16 / 09 / 2020", priority: "!!!" },
    ],
    invalid: false,
    task: "",
    dateDue: "",
    priority: "",
  };

  componentDidMount() {
    this.handleSavedList();
  }

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    if (this.state.invalid) {
      const priority = this.state.priority;
      const task = this.state.task;
      const date = this.state.dateDue.split("-").reverse();
      const formattedDate = date.map((num, index) => {
        if (index < 2) {
          return `${num} / `;
        } else {
          return ` ${num}`;
        }
      });
      const restOfWord = task.slice(1);
      const firstLetter = task[0].toUpperCase();
      const capitalisedWord = firstLetter + restOfWord;

      this.setState((currentState) => {
        return {
          invalid: !currentState.invalid,
          list: [
            {
              task: capitalisedWord,
              DateDue: formattedDate.join(""),
              priority: priority,
            },
            ...currentState.list,
          ],
          task: "",
          dateDue: "",
        };
      });
    }
  };
  handleInput = (inputEvent) => {
    const input = inputEvent.target.value;
    const containsSpecialChar = /[!@#$%^&*£)(+=._]/.test(input);
    if (!containsSpecialChar) {
      this.setState((currentState) => {
        return { task: input, invalid: true };
      });
    }
  };

  handleDelete = (clickEvent) => {
    const itemName = clickEvent.target.id;
    const listArray = this.state.list;

    const ArrayWithRemovedItem = listArray.filter((item) => {
      return item.task !== itemName;
    });
    this.setState(() => {
      return { list: ArrayWithRemovedItem };
    });
  };

  handleSave = (clickEvent) => {
    localStorage.setItem("list", JSON.stringify(this.state.list));
  };

  handleSavedList = () => {
    const list = JSON.parse(localStorage.getItem("list"));
    this.setState(() => {
      if (!list) {
        return { list: this.state.list };
      } else {
        return { list: list };
      }
    });
  };

  handleClear = () => {
    this.setState(() => {
      localStorage.clear();
      return {
        list: [
          {
            task: "Add your tasks in the input form above!",
            DateDue: "DateDue: 00/00/0000",
          },
        ],
      };
    });
  };

  handleDate = (changeEvent) => {
    const input = changeEvent.target.value;
    this.setState((currentState) => {
      return { dateDue: input };
    });
  };

  handlePriority = (changeEvent) => {
    const input = changeEvent.target.value;
    this.setState(() => {
      return { priority: input };
    });
  };

  render() {
    return (
      <div>
        <h2>CheckList</h2>
        <img
          src="https://cdn.windowsreport.com/wp-content/uploads/2019/07/notepad-modern-design-concept.jpg"
          alt=""
        />
        <div id="saveButton">
          <p>
            <button className="button" onClick={this.handleSave}>
              Save List
            </button>
            |
            <button className="button" onClick={this.handleClear}>
              Clear List
            </button>
          </p>
        </div>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            Add task to checklist with optional due date and priority mark:
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.task}
              className="input"
            />
          </label>
          <input
            type="date"
            onChange={this.handleDate}
            value={this.state.dateDue}
            className="input"
          />
          <select onChange={this.handlePriority}>
            <option value=""></option>
            <option value="!">!</option>
            <option value="!!">!!</option>
            <option value="!!!">!!!</option>
          </select>
          <button>Submit</button>
        </form>
        <ul id="list">
          {this.state.list.map((item, index) => {
            return (
              <li key={item.task}>
                <p>
                  {`
                  ${item.task} | ${item.DateDue} |  ${item.priority}`}
                  <button
                    id={item.task}
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
