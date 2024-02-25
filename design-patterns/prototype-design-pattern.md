## Creational Design Patterns

### Prototype pattern

**Прототип** - це породжувальний патерн проектування, що
дає змогу копіювати об’єкти, не вдаючись у подробиці їхньої реалізації.

Він використовується для:
* уникнення успадкування класу, що створює ці об'єкти в клієнтському застосуванні, як це відбувається при використанні фабричного методу.
* уникнення витрат, що виникають при створенні нових об'єктів стандартним способом (тобто при використанні ключового слова 'new'), коли це може бути занадто марнотратно для даного застосування.

> Життєвий приклад:: У біології клітинний ріст і розмноження часто відбуваються за допомогою поділу клітин. Коли клітина ділиться, вона створює точну копію себе, яка має той же генетичний матеріал і функції. Цей процес подібний до використання патерну Прототип, де новий об'єкт створюється на основі існуючого об'єкта, використовуючи його як прототип.

**Переваги та недоліки**

* ✅Дозволяє клонувати об’єкти без прив’язки до їхніх конкре-
тних класів.

* ✅Менша кількість повторювань коду ініціалізації об’єктів.

* ✅Прискорює створення об’єктів.

* ✅Альтернатива створенню підкласів під час конструювання
складних об’єктів.

* ❌Складно клонувати складові об’єкти, що мають посилання на
інші об’єкти. Cкладно клонувати при глибокому копіюванні


**Object example**
```tsx
// Define a prototype object
const carPrototype = {
	brand: "Toyota",
	model: "Corolla",
	year: 2020,
	drive: function() {
		console.log("The " + this.brand + " " + this.model + " is driving.");
	},
	clone: function() {
		// Creating a new object and copying properties
		const clonedCar = Object.create(carPrototype);
		clonedCar.brand = this.brand;
		clonedCar.model = this.model;
		clonedCar.year = this.year;
		return clonedCar;
	}
};

// Create new objects using the prototype and clone method
const car1 = carPrototype.clone();
const car2 = carPrototype.clone();

// Modify properties of car2
car2.model = "Camry";

// Test drive
car1.drive(); // Output: The Toyota Corolla is driving.
car2.drive(); // Output: The Toyota Camry is driving.
```

**❌React example (для прикладу, не застосовується в функціональному підході)**
```tsx
import React, { cloneElement } from 'react';

// Define a prototype card component as a functional component
const Card = ({ title = 'Default Title', content = 'Default Content' }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

// Create instances using the prototype object
const App = () => {
  const card1 = cloneElement(<Card />);
  const card2 = cloneElement(<Card />, {
    title: 'Custom Title',
    content: 'Custom Content'
  });

  return (
    <div>
      <h1>Card Instances</h1>
      {card1}
      {card2}
    </div>
  );
};

export default App;
```

**Classes & TS example**
```tsx
// Interface for the prototype
interface Shape {
    clone(): Shape;
    getInfo(): string;
}

// Concrete Circle class
class Circle implements Shape {
    constructor(private radius: number) {}

    // Method to clone the object
    clone(): Shape {
        return new Circle(this.radius);
    }

    // Method to get information about the circle
    getInfo(): string {
        return `Circle with radius ${this.radius}`;
    }
}

// Concrete Square class
class Square implements Shape {
    constructor(private side: number) {}

    // Method to clone the object
    clone(): Shape {
        return new Square(this.side);
    }

    // Method to get information about the square
    getInfo(): string {
        return `Square with side ${this.side}`;
    }
}

// Client code
const circlePrototype = new Circle(5);
const squarePrototype = new Square(10);

const clonedCircle = circlePrototype.clone();
const clonedSquare = squarePrototype.clone();

// Output information about the cloned shapes
console.log(clonedCircle.getInfo()); // Output: Circle with radius 5
console.log(clonedSquare.getInfo()); // Output: Square with side 10
```
