# Behavioral Design Patterns

## Command pattern

**Команда (action, command)** - це поведінковий патерн проектування, який перетворює запити на об’єкти, дозволяючи передавати їх як аргументи під час виклику методів, ставити запити в чергу, логувати їх, а також підтримувати скасування операцій.

**Переваги та недоліки**

* ✅ Прибирає пряму залежність між об’єктами, що викликають операції, та об’єктами, які їх безпосередньо виконують.
* ✅ Дозволяє реалізувати просте скасування і повтор операцій.
* ✅ Дозволяє реалізувати відкладений запуск операцій.
* ✅ Дозволяє збирати складні команди з простих.
* ✅ Реалізує принцип відкритості/закритості.

* ❌ Ускладнює код програми внаслідок введення великої кількості додаткових класів.

**Переваги методу команд у шаблонах проектування JavaScript**
* **Відокремлення**: метод Command допомагає відокремити відправника запиту (клієнта) і одержувача запиту (одержувачі) через Invoker. Клієнт знає лише те, як надіслати запит, а решта абстрагується. Це дає більш узагальнений спосіб розділення завдань.
* **Гнучкість і розширюваність**: метод Command спрощує додавання нових змін без змін базового коду, сприяючи гнучкому та розширюваному дизайну.
* **Функціональні можливості скасування/повторення**: метод Command зберігає стан команди в класі Concrete Command, що допомагає легко відновити попередні стани.
* **Спрощений код клієнта**: клієнт або відправник повинен знати, як надіслати запит, не турбуючись про базовий код. Це робить код клієнта спрощеним.
* **Параметризація та чергування**: команди в методі Command можуть зберігати певні параметри, що дозволяє виконувати параметризовані дії. Команди також можуть ставитися в чергу та виконуватися в певному порядку, забезпечуючи контроль над послідовністю операцій.

**Недоліки методу команд у шаблонах проектування JavaScript**
* **Підвищена складність**: для невеликих і простих випадків використання впровадження командного методу потенційно може зробити базу коду складнішою та важчою для керування.
* **Затрати пам’яті**: для реалізації функціональних можливостей скасування/повторення збереження попереднього стану може призвести до завантажень пам’яті, особливо у випадках використання, коли потрібно виконати більше команд.
* **Накладні витрати на створення об’єктів**: кожна команда вимагає створення нового об’єкта, що призводить до накладних витрат на об’єкти у випадку використання більшої кількості команд.
* **Крива навчання**: Розуміння та реалізація шаблону команди може вимагати від розробників ознайомлення з концепцією, що потенційно призведе до кривої навчання, особливо для тих, хто новачок у шаблонах проектування.

> Посилання на джерело "https://www.geeksforgeeks.org/command-method-javascript-design-patterns/"
### Приклади

```typescript
// Command - це інтерфейс, який реалізують усі конкретні класи команд. 
// Він має один метод виконання.
interface Command {
  execute(): void;
}

// LightOnCommand and LightOffCommand - це конкретні класи команд, які реалізують інтерфейс Command. 
// Вони охоплюють дії, які виконуються при натисканні відповідних кнопок на пульті дистанційного керування.
class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}
// Light is the receiver.
// Це об’єкт, який знає, як виконати дію, пов’язану з командою.
class Light {
  turnOn(): void {
    console.log("Light is on");
  }

  turnOff(): void {
    console.log("Light is off");
  }
}

// Invoker
// Він містить посилання на об’єкт команди, і коли натиснуто кнопку, він викликає метод виконання команди.
class RemoteControl {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  pressButton(): void {
    if (this.command) {
      this.command.execute();
    } else {
      console.log("No command set");
    }
  }
}

// Usage
const light = new Light();
const remoteControl = new RemoteControl();

const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

remoteControl.setCommand(lightOnCommand);
remoteControl.pressButton(); // Output: Light is on

remoteControl.setCommand(lightOffCommand);
remoteControl.pressButton(); // Output: Light is off
```

**React**
```typescript
import React, { useState } from 'react';

// Define the command interface
interface Command {
  execute(): void;
}

// Define some concrete commands
function createIncrementCommand(setCount: React.Dispatch<React.SetStateAction<number>>): Command {
  return {
    execute() {
      setCount((prevCount) => prevCount + 1);
    },
  };
}

function createDecrementCommand(setCount: React.Dispatch<React.SetStateAction<number>>): Command {
  return {
    execute() {
      setCount((prevCount) => prevCount - 1);
    },
  };
}

// Invoker
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [commands, setCommands] = useState<Command[]>([]);

  const addCommand = (command: Command) => {
    setCommands((prevCommands) => [...prevCommands, command]);
  };

  const executeCommand = (index: number) => {
    const command = commands[index];
    if (command) {
      command.execute();
    }
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => addCommand(createIncrementCommand(setCount))}>Increment</button>
      <button onClick={() => addCommand(createDecrementCommand(setCount))}>Decrement</button>
      <hr />
      <h3>Command History</h3>
      {commands.map((_, index) => (
        <button key={index} onClick={() => executeCommand(index)}>
          Command {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Counter;
//У цьому прикладі:
//  Ми визначаємо дві конкретні командні функції createIncrementCommand і createDecrementCommand, 
//  кожна з яких повертає командний об’єкт, який можна виконати для виконання відповідної дії.
//  У компоненті Counter ми підтримуємо стан для підрахунку та інший стан для збереження списку команд.
//  При натисканні кнопки «Збільшити» або «Зменшити» створюється відповідна команда та додається до списку команд.
//  Ми відображаємо список кнопок, що представляють історію команд, і коли натискається будь-яка з цих кнопок, 
//  виконується відповідна команда, яка відповідним чином оновлює кількість.
```

> Посилання на додатковий приклад комбінації команда та стан патернів "https://dev.to/jsmanifest/combining-the-command-pattern-with-state-pattern-in-javascript-2bja"