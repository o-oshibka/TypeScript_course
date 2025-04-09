enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

interface Todo {
  todo: string;
  priority: Priority;
}

class User {
  name: string;
  status: Status;
  todos: Todo[] = [];

  constructor(name: string, initialStatus: Status = Status.ACTIVE) {
    this.name = name;
    this.status = initialStatus;
  }

  changeStatus(newStatus: Status): void {
    this.status = newStatus;
    console.log(`User status changed to ${newStatus}`);
  }

  addTodo(todo: string, priority: Priority = Priority.MEDIUM): void {
    this.todos.push({ todo, priority });
    console.log(`Todo added: ${todo} (Priority: ${priority})`);
  }

  displayTodos(): void {
    console.log(`Todos for ${this.name}:`);
    this.todos.forEach((todo) =>
      console.log(`${todo.todo} (Priority: ${todo.priority})`)
    );
  }

  displayHighPriorityTodos(): void {
    console.log(`High Priority Todos for ${this.name}:`);
    this.todos
      .filter((todo) => todo.priority === Priority.HIGH)
      .forEach((todo) =>
        console.log(`${todo.todo} (Priority: ${todo.priority})`)
      );
  }
}

const john = new User("John");
john.changeStatus(Status.ACTIVE);
john.addTodo("take delivery", Priority.HIGH);
john.addTodo("stocktaking", Priority.HIGH);
john.addTodo("collect the order");
john.addTodo("throw out the trash", Priority.LOW);
john.displayTodos();
john.displayHighPriorityTodos();
john.changeStatus(Status.INACTIVE);
