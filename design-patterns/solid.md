## SOLID

### Single Responsibility

Кожен модуль або клас має бути відповідальний за єдину частину функціональності програми.

```javascript
const Button = ({ children, onClick }) => {
  return (
    <button className={'button'} onClick={onClick}>
      {children}
    </button>
  );
};
```

### Open/Close Principle

Класи та функції мають бути відкриті для розширення та закриті для редагування.

#### Classes

Приклад: логіка розрахунку для замовлення, де було додано знижку

Початковий вигляд

```typescript
class Order {
  constructor(private items: CartItem[]) {
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

class CartItem {
  constructor(public name: string, public price: number) {
  }
}
```

❌ Модифікація класу із додаванням знижки

```typescript
class Order {
  constructor(private items: CartItem[], private discount: number = 0) {
  }

  calculateTotal() {
    const subtotal = this.items.reduce((total, item) => total + item.price, 0);
    return subtotal - subtotal * (this.discount / 100);
  }
}
```

✅ Розширення класу

```typescript
class DiscountedOrder extends Order {
  constructor(items: CartItem[], discount: number) {
    super(items);
  }

  applyDiscount() {
    return this.calculateTotal() * (1 - this.discount / 100);
  }
}
```

#### React Components

```tsx
const List = ({ items, renderItem }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{renderItem(item)}</li>
    ))}
  </ul>
);

const ItemComponent = ({ name }) => <span>{name}</span>;

// Використання
<List
  items={[{ name: 'Item 1' }, { name: 'Item 2' }]}
  renderItem={item => <ItemComponent name={item.name} />}
/>
```

Таким чином, `List` залишається відкритим для розширення (можемо змінювати спосіб відображення елементів), але закритим
для модифікації, оскільки нам не потрібно змінювати його внутрішню реалізацію для додавання нових видів відображення.

### Liskov Substitution principle

Обʼєкти суперкласу мають мати можливість бути заміненими обʼєктами дочірніх класів.
> 1. Те що передавалось, те і має передаватись
>2. Те що поверталось, те і має повертатись
>3. Метод не повинен викидати виключення, які не властиві базовому методу
>4. Метод не повинен посилювати перед-умови.
>5. Метод не повинен послаблювати пост-умови.
>6. Інваріанти класу повинні залишитися без змін. Що таке інваріант на прикладі кота?
>7. Підклас не повинен змінювати значення приватних полів базового класу

#### Classes

1. Створюємо суперклас

```javascript
// vehicle.ts
export class Vehicle {
  startEngine(): string {
    return 'Engine started';
  }
}
```

2. Створюємо сабкласи

```javascript
// car.ts
import { Vehicle } from './vehicle';

export class Car extends Vehicle {
  startEngine(): string {
    return 'Car engine started';
  }
}

// electricCar.ts
import { Vehicle } from './vehicle';

export class ElectricCar extends Vehicle {
  startEngine(): string {
    return 'Electric Car engine started quietly';
  }

  chargeBattery(): string {
    return 'Battery charging';
  }
}
```

3. Тестуємо

```javascript
// app.ts
import { Vehicle } from './vehicle';
import { Car } from './car';
import { ElectricCar } from './electricCar';

function startVehicleEngine(vehicle: Vehicle) {
  console.log(vehicle.startEngine());
}

const myCar = new Car();
const myElectricCar = new ElectricCar();

startVehicleEngine(myCar); // 'Car engine started'
startVehicleEngine(myElectricCar); // 'Electric Car engine started quietly'
```

#### React Components

Так як в React Function Components немає наслідування, розглянемо принцип на базі HOC (High Order Components):

```tsx
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const PrimaryButton = ({ onClick, children }) => (
  <Button onClick={onClick} style={{ backgroundColor: 'blue', color: 'white' }}>
    {children}
  </Button>
);

```

У цьому прикладі, `PrimaryButton` компонує Button, додаючи до нього специфічні стилі. Це дозволяє використовувати
`PrimaryButton` всюди, де може використовуватися Button, не порушуючи очікувану поведінку, що відповідає принципу
підстановки Лісков.

### Interface Segregation Principle

Клієнти не повинні залежати від методів, які вони не використовують.

#### Classes

❌ Один інтерфейс на все

```typescript
interface MediaPlayer {
  playAudio(): void;

  recordAudio(): void;
}

class AudioPlayer implements MediaPlayer {
  playAudio() {
    // Implementation for playing audio
  }

  recordAudio() {
    // Implementation for recording audio
  }
}

class VideoPlayer implements MediaPlayer {
  playAudio() {
    // Implementation for playing audio of the video
  }

  recordAudio() {
    // This method is irrelevant for video playback
  }
}
```

✅ Розділення відповідальності інтерфейсів

```typescript
interface AudioPlayer {
  playAudio(): void;

  recordAudio(): void;
}

interface VideoPlayer {
  playVideo(): void;
}

class AudioPlayer implements AudioPlayer {
  playAudio() {
    // Implementation for playing audio
  }

  recordAudio() {
    // Implementation for recording audio
  }
}

class VideoPlayer implements VideoPlayer {
  playVideo() {
    // Implementation for playing video
  }
}
```

#### React Components

У контексті React, це може означати створення дрібнозернистих компонентів, які виконують конкретні функції, замість
великих монолітних компонентів з багатьма пропсами, не всі з яких завжди потрібні. Наприклад, замість одного компонента
`UserProfile` з багатьма пропсами, можна створити окремі компоненти `UserAvatar`, `UserName`, `UserEmail` тощо, що дозволяє їх
перевикористовувати та комбінувати без зайвих залежностей.

```tsx
// UserAvatar.js
const UserAvatar = ({ src }) => <img src={src} alt="User Avatar" />;

// UserName.js
const UserName = ({ name }) => <h1>{name}</h1>;

// UserEmail.js
const UserEmail = ({ email }) => <p>{email}</p>;

// UserProfile.js
const UserProfile = ({ user }) => (
  <div>
    <UserAvatar src={user.avatar} />
    <UserName name={user.name} />
    <UserEmail email={user.email} />
  </div>
);
```

### Dependency Inversion Principle

#### Classes

Класи верхніх рівнів не повинні залежати від класів нижніх рівнів. Обидва повинні залежати від абстракцій. Абстракції не
повинні залежати від деталей. Деталі повинні залежати від абстракцій.

❌ Пряма залежнсіть від методів класу

```typescript
class LightBulb {
  isOn = false

  turnOn() {
    // Implementation for turning on the light bulb
  }

  turnOff() {
    // Implementation for turning off the light bulb
  }
}

class Switch {
  private bulb: LightBulb;

  constructor() {
    this.bulb = new LightBulb();
  }

  operate() {
    // Operate the switch to turn the light on or off
    this.bulb.turnOn();
  }
}
```

✅ Залежність від абстракції

```typescript
interface Switchable {
  isOn: boolean;

  turnOn(): void;

  turnOff(): void;
}

class LightBulb implements Switchable {
  isOn = false

  turnOn() {
    // Implementation for turning on the light bulb
  }

  turnOff() {
    // Implementation for turning off the light bulb
  }
}

class Switch {
  private device: Switchable;

  constructor(device: Switchable) {
    this.device = device;
  }

  operate() {
    // Operate the switch to turn the device on or off
    this.device.turnOn();
  }
}
```

#### React Components

