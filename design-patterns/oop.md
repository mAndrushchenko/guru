## ООП

### Абстракція

Абстракція - це модель деякого об’єкта або явища реального світу, яка відкидає незначні деталі, що не грають істотної
ролі в даному контексті.

Абстракція - це те від чого ми не можемо зробити інстанс, викорситати напряму (Modal в React)

#### Classes

```javascript
class Car {
  startEngine() {
    console.log("Starting the car's engine.");
  }

  drive() {
    console.log("Driving the car.");
  }
}

const myCar = new Car();
myCar.startEngine(); // Output: Starting the car's engine.
myCar.drive(); // Output: Driving the car.
```

#### React components

```jsx
// змінити приклад на модалку
const UserProfile = ({ name, phoneNumber, onEdit }) => {
  return (
    <div>
      <input name="name" value={name} onChange={onEdit} />
      <input name="phoneNumber" value={phoneNumber} onChange={onEdit} />
    </div>
  );
};
```

Компонент `UserProfile` абстрагує деталі відображення профілю користувача, приймаючи name, phoneNumber і функцію `onEdit` як
пропси. Це дозволяє використовувати компонент у різних частинах додатку без потреби знати, як він реалізований
внутрішньо, забезпечуючи гнучкість та спрощення перевикористання коду.

### Інкапсуляція

Інкапсуляція — це здатність об’єктів приховувати частину свого стану й поведінки від інших об’єктів, надаючи зовнішньому
світові тільки визначений інтерфейс взаємодії з собою.

#### Classes

```javascript
class Superhero {
  constructor(name, superpower) {
    this.name = name;
    this.superpower = superpower;
  }

  fightCrime() {
    console.log(`${this.name} is fighting crime with ${this.superpower}!`);
  }

  useGadgets() {
    console.log(`${this.name} is using gadgets to save the day!`);
  }
}

const batman = new Superhero("Batman", "intelligence");
batman.fightCrime(); // Output: Batman is fighting crime with intelligence!
batman.useGadgets(); // Output: Batman is using gadgets to save the day!
```

#### React components

```tsx
import { useState } from 'react';

const ButtonQty = ({ qty: defaultQty }) => {
  const [qty, setQty] = useState<number>(defaultQty)

  return (
    <div>
      <button onClick={() => setQty(prev => prev - 1)}>-</button>
      <span>{qty}</span>
      <button onClick={() => setQty(prev => prev + 1)}>+</button>
    </div>
  )
}
```

Компонент `ButtonQty` інкапсулює логіку та стан кількості (`qty`), дозволяючи змінювати її лише через передбачені
інтерфейси (кнопки "+" та "-"). Стан `qty` і метод `setQty` для його оновлення заховані від зовнішнього використання,
забезпечуючи контроль над тим, як кількість може бути змінена.

### Успадкування

Спадкування — це можливість створення нових класів на основі існуючих. Головна користь від спадкування — повторне
використання існуючого коду. Розплата за спадкування виражається в тому, що підкласи завжди дотримуються інтерфейсу
батьківського класу. Ви не можете виключити з підкласу метод, оголошений його предком.

#### Classes

```javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  makeSound() {
    console.log(`${this.name} says ${this.sound}!`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, "Meow");
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");
  }
}

const fluffy = new Cat("Fluffy");
fluffy.makeSound(); // Output: Fluffy says Meow!

const rover = new Dog("Rover");
rover.makeSound(); // Output: Rover says Woof!
```

#### React components

```tsx
import styled from "styled-components";

const ButtonBase = styled.button`
  ${/* base styles */}
`

const ButtonLogin = styled(ButtonBase)`
  ${/* button login styles */}
`

const ButtonSubmit = styled(ButtonBase)`
  ${/* button submit styles */}
`
```

`ButtonBase` створює базовий стильовий компонент кнопки, а `ButtonLogin` та `ButtonSubmit` розширюють `ButtonBase`,
додаючи або
перевизначаючи стилі.

### Поліморфізм

Поліморфізм — це здатність програми вибирати різні реалізації під час виклику операцій з однією і тією ж назвою.

#### Classes

```javascript
class Shape {
  draw() {
    console.log("Drawing a shape.");
  }
}

class Circle extends Shape {
  draw() {
    console.log("Drawing a circle.");
  }
}

class Square extends Shape {
  draw() {
    console.log("Drawing a square.");
  }
}

const shape = new Shape();
shape.draw(); // Output: Drawing a shape.

const circle = new Circle();
circle.draw(); // Output: Drawing a circle.

const square = new Square();
square.draw(); // Output: Drawing a square.
```

#### React components

> У React, коли ми говоримо про передачу різних параметрів (пропсів) одному і тому ж компоненту для зміни його поведінки
> або вигляду, це є проявом поліморфізму. Це тому, що компонент може адаптуватися до різних ситуацій залежно від
> отриманих
> даних, не змінюючи своєї внутрішньої реалізації. Він "поліморфний", бо може виконувати різні ролі або мати різний
> вигляд, заснований на зовнішньому вводі.

```tsx
import {FC} from "react";

interface IButton {
  color: 'primery' | 'secondary' | 'danger'
}

const Button: FC<IButton> = ({ color, children, onClick }) => {
  return (
    <button onClick={onClick} className={`button ${color}`}>
      {children}
    </button>
  );
}

const App = () => {
  return (
    <div>
      <Button onClick={() => console.log('Primary clicked')} color="primary">
        Primary Button
      </Button>
      <Button onClick={() => console.log('Secondary clicked')} color="secondary">
        Secondary Button
      </Button>
    </div>
  );
}

```

### Залежність

Залежність - це відносини між класами, де зміни в одному класі можуть вплинути на функціональність іншого класу

#### Classes

Приклад: архітеткор і будівельник. При зміні будівельника змінюється його діяльність

```javascript
// Builder.js
export class Builder {
  putBricks() {
    console.log("Putting bricks");
  }
}

// Architector.js
import { Builder } from './Builder.js';

class Architector {
  constructor() {
    this.builder = new Builder();
  }

  build() {
    this.builder.putBricks(); // Залежність від Builder
    console.log("House is building");
  }
}

const architector = new Architector();
architector.build();
```

#### React Components

```tsx
// Card.tsx
const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}

// Product.tsx
const ProductCard = ({ name, onAction }) => {
  return (
    <Card className="card">
      <p>{name}</p>
      <button onClick={onAction}>Add to cart</button>
    </Card>
  )
}
```

### Асоціація

Асоціація - це відношення між двома або більше класами, яке встановлюється через їх об'єкти.

#### Classes

Приклад: лікар і пацієнт, де лікар призначає ліки конкретному пацієнтові

```javascript
class Doctor {
  prescribe(patient) {
    console.log(`Doctor prescribes medicine to ${patient.name}`);
  }
}

class Patient {
  constructor(name) {
    this.name = name;
  }
}

const doctor = new Doctor();
const patient = new Patient("John");
doctor.prescribe(patient); // Асоціація між Doctor і Patient через взаємодію
```

#### React Components

> Уявімо, що в React проекті є два компоненти: Author та Book. Компонент Author відображає інформацію про автора, а
> компонент Book - про книгу. Асоціація між ними реалізується через передачу даних про книги від Author до Book як
> пропси.

```tsx
const Author = ({ name, books }) => (
  <div>
    <h2>{name}</h2>
    {books.map(book => <Book key={book.id} title={book.title} />)}
  </div>
);

const Book = ({ title }) => <div>{title}</div>;
```

### Агрегація

Агрегація - це відносини між двома об'єктами, де один об'єкт є контейнером або складається з одного чи декількох інших
об'єктів, але при цьому існує без них.

#### Classes

Приклад: машина і двигун.

```javascript
class Engine {
  constructor(model) {
    this.model = model;
  }
}

class Car {
  constructor(engine) {
    this.engineModel = engine.model; // Агрегація: Car використовує Engine, але Engine може існувати окремо
  }
}

const engine = new Engine('V8');
const car = new Car(engine);

```

#### React Components

```tsx
const Gallery = ({ images }) => (
  <div>
    {images.map(image => <ImageComponent key={image.id} src={image.src} />)}
  </div>
);

const ImageComponent = ({ src }) => <img src={src} alt="" />;
```

У цьому випадку, `Gallery` агрегує `ImageComponent` шляхом передачі масиву images, але кожен `ImageComponent` може
існувати і використовуватись окремо від `Gallery`.

### Композиція

Композиція - це строгіша форма агрегації, де об'єкти, які входять до складу іншого об'єкта, не можуть існувати незалежно
від цього об'єкта.

#### Classes

Приклад: будинок і кімнати.

```javascript
class Room {
  constructor(name) {
    this.name = name;
  }
}

class House {
  constructor(room1, room2, room3) {
    this.roomName1 = room1.name;
    this.roomName2 = room2.name;
    this.roomName3 = room3.name;
  }
}

const house = new House(
  new Room('Kitchen'),
  new Room('Bathroom'),
  new Room('Living room')
);
```

#### React Components

```tsx
const UserAvatar = ({ avatar }) => <img src={avatar} alt="Avatar" />;

const UserInfo = ({ name, email }) => (
  <div>
    <h2>{name}</h2>
    <p>{email}</p>
  </div>
);

const UserProfile = ({ user }) => (
  <div>
    <UserAvatar avatar={user.avatar} />
    <UserInfo name={user.name} email={user.email} />
  </div>
);
```

`UserProfile` тут виступає як композитний компонент, що інкапсулює `UserAvatar` та `UserInfo`. Ці компоненти тісно
пов'язані з
`UserProfile` і не призначені для використання поза цим контекстом, що і є характерною ознакою композиції.
