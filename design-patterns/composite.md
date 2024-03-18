# Composite Pattern

Структурний патерн - це патерн проектування, який дозволяє згрупувати безліч обʼєктів в одну деревоподібну структуру і
працювати з нею як з одним обєктом.

Ключова структура цього патерну - дерево обʼєктів, яке складається з двох типів обʼєктів: листків та контейнерів.
Листки - це обʼєкти, які не мають дочірніх обʼєктів. Контейнери - це обʼєкти, які мають дочірні обєкти, які можуть бути
листками або контейнерами. Ця структура дозволяє працювати з листками та контейнерами однаковим чином, без необхідності
перевірки типу обʼєкта.

Сам обʼєкт мало що знає про вкладені в нього обʼєкти. Він просто викликає методи дочірніх обʼєктів, які в свою чергу
викликають методи своїх дочірніх обʼєктів, і так далі.

## Особливість патерну

- Єдиний інтерфейс виклику методів для всіх обʼєктів дерева
- Листки та контейнери реалізують цей інтерфейс по-різному

## Переваги

- Використовуючи поліморфізм та рекурсію, ви можете більш ефективно працювати з складними деревовидними структурами.
- The Open/Closed Principle. Ми можемо додавати нові типи елементів до дерева без ризику порушення роботи існуючого
  коду.

## Недоліки

- Керування ієрархією об’єктів, особливо великих, може призвести до накладних витрат на продуктивність через рекурсивний характер операцій над складеними об’єктами
- Може бути складно створити стандартний інтерфейс для класів, функціональність яких надто відрізняється. У конкретних
  сценаріях вам доведеться надмірно узагальнити інтерфейс компонента, що ускладнить його розуміння.
- Видалення листків та контейнерів зі складеної структури може бути непростим.

## Коли використовувати

- Ієрархічні структури. Використовуйте шаблон Composite, коли нам потрібно представити ієрархічні структури, такі як дерева, каталоги, меню, організаційні ієрархії або будь-які структури, де об’єкти можуть складатися з інших об’єктів.
- Рекурсивні операції: коли ми маємо виконувати операції над ієрархією об’єктів рекурсивним способом.
- Уніфікованість: якщо ми хочемо забезпечити узгоджений інтерфейс як для окремих об’єктів, так і для складених об’єктів. 
- Динамічна структура: коли нам треба щоб наша структура була динамічно.

## Приклади використання

```ts
interface Component {
  name: string
  parent?: Composite
  display(): void
  detach(): void
  add(component: Component): void
  delete(component: Component): void
}

class Composite implements Component {
  name: string
  children: Component[]
  parent?: Composite

  constructor(name: string) {
    this.name = name
    this.children = []
  }

  display(): void {
    const composite = `Composite Name:${this.name}`
    const parent = `Parent Name:${this.parent?.name ?? '(none)'}`
    const children = `Children Count:${this.children.length}`

    console.log(`${composite} ${parent} ${children}`)
    this.children.forEach((c) => c.display()) // recursive
  }

  add(component: Component): void {
    component.detach() // ✅
    component.parent = this
    this.children.push(component)
  }

  delete(component: Component): void {
    const index = this.children.indexOf(component)

    if (index === -1) return
    this.children.splice(index, 1)
  }

  detach(): void {
    if (!this.parent) return
    this.parent.delete(this)
    this.parent = undefined
  }
}


class Leaf implements Component {
  name: string
  parent?: Composite

  constructor(name: string) {
    this.name = name
  }

  display(): void {
    const leaf = `Leaf Name:${this.name}`
    const parent = `Parent Name:${this.parent?.name ?? '(none)'}`

    console.log(`${leaf} ${parent}`)
  }

  detach(): void {
    if (!this.parent) return
    this.parent.delete(this)
  }

  add(component: Component): void {
    throw new Error(`Cannot add ${component.name} to leaf ${this.name}.`)
  }

  delete(component: Component): void {
    throw new Error(`Cannot delete ${component.name} to leaf ${this.name}.`)
  }
}


// Client Code
const manager1 = new Composite('manager1')
const manager2 = new Composite('manager2')

const junior1 = new Leaf('junior1')
const junior2 = new Leaf('junior2')

manager1.add(junior1)
manager1.display()
// Composite Name:manager1   Parent Name:(none)      Children Count:1
// Leaf Name:junior1         Parent Name:manager1

manager2.add(manager1)
manager2.display()
// Composite Name:manager2   Parent Name:(none)      Children Count:1
// Composite Name:manager1   Parent Name:manager2    Children Count:1
// Leaf Name:junior1         Parent Name:manager1

junior1.display()
// Leaf Name:junior1         Parent Name:manager1
junior2.display()
// Leaf Name:junior2         Parent Name:(none)

```

## Приклад використання для рендерингу графічних об’єктів
```ts
import "./styles.css";

let canvas = document.getElementById("c");
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext("2d");

class Layer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.childrens = [];
  }

  add(component) {
    this.childrens.push(component);
  }

  render() {
    ctx.save();
    ctx.translate(this.x, this.y);
    this.childrens.forEach((child) => {
      child.render();
    });
    ctx.restore();
  }
}

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {}
}

class Box extends Shape {
  constructor(x, y, w, h, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
  }

  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
class Circle extends Shape {
  constructor(x, y, r, color) {
    super(x, y);
    this.r = r;
    this.color = color;
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

let layer1 = new Layer(100, 100);
let layer2 = new Layer(50, 50);

layer1.add(new Box(100, 0, 100, 100, "red"));
layer1.add(new Circle(50, 50, 50, "green"));

layer2.add(new Circle(0, 100, 20, "blue"));
layer2.add(new Box(0, 100, 50, 50, "yellow"));
layer1.add(layer2);

layer1.render();

```

## Патерн в функціональному стилі

```js
function createComponent(name) {
  let parent = null;
  const children = [];

  return {
    name,
    add(child) {
      child.setParent(this);
      children.push(child);
    },
    remove(child) {
      const index = children.indexOf(child);
      if (index !== -1) {
        children.splice(index, 1);
        child.setParent(null);
      }
    },
    setParent(p) {
      parent = p;
    },
    getParent() {
      return parent;
    },
    isComposite: true,
    operation() {
      return `Component(${name})\n${children.map(child => child.operation()).join('')}`;
    }
  };
}

function createLeaf(name) {
  let parent = null;

  return {
    name,
    setParent(p) {
      parent = p;
    },
    getParent() {
      return parent;
    },
    isComposite: false,
    operation() {
      return `Leaf(${name})\n`;
    }
  };
}

// Client code
const tree = createComponent('root');
const branch1 = createComponent('branch1');
const branch2 = createComponent('branch2');

branch1.add(createLeaf('leaf1'));
branch1.add(createLeaf('leaf2'));

branch2.add(createLeaf('leaf3'));

tree.add(branch1);
tree.add(branch2);

console.log(tree.operation());
```


## React

```jsx
import React from 'react';

const Product = ({ name, price, quantity }) => {
  const calculateCost = () => {
    return price * quantity;
  }

  return (
          <li>
            {name} - {price} x {quantity} = {calculateCost()}
          </li>
  );
}

const Service = ({ name, price }) => {
  const calculateCost = () => {
    return price;
  }

  return (
          <li>
            {name} - {price} = {calculateCost()}
          </li>
  );
}

const Order = ({ name, children }) => {
  const calculateTotal = () => {
    return React.Children.toArray(children).reduce((total, product) => total + product.calculateCost(), 0);
  }

  return (
          <div>
            <h2>{name}</h2>
            <ul>
              {children}
            </ul>
            <p>Total: {calculateTotal()}</p>
          </div>
  );
}

// Client code
function App() {
  return (
      <div>
        <Order name="Order 1">
          <Product name="Product 1" price={10} quantity={2} />
          <Product name="Product 2" price={20} quantity={1} />
          <Service name="Service 1" price={5} />
        </Order>
        <Order name="Order 2">
          <Product name="Product 3" price={30} quantity={3} />
          <Service name="Service 2" price={15} />
        </Order>
      </div>
  );
}

```

## З якими патренами часто використовується

- **Decorator** - шаблон Composite часто використовується з шаблоном Decorator. Коли ви використовуєте шаблон Composite для створення деревоподібної структури об’єктів, ви можете використовувати шаблон Decorator для додавання нової функціональності об’єктам в дереві.
- **Visitor** - Ви можете використовувати шаблон Visitor для застосування операції до дерева об’єктів. Шаблон Visitor дозволяє визначити нову операцію без зміни класів елементів, на яких вона працює.
- **Chain of Responsibility** - шаблон Composite часто використовується з шаблоном Chain of Responsibility. Коли ви використовуєте шаблон Composite для створення деревоподібної структури об’єктів, ви можете використовувати шаблон Chain of Responsibility для обробки об’єктів в дереві.
- **Iterator** - Ви можете використовувати шаблон Iterator для обходу дерева об’єктів. Шаблон Iterator дозволяє обходити елементи дерева, не розкриваючи його внутрішньої структури.


## Compound Components VS Composite Pattern

- **Composite Pattern**: Це структурний патерн проектування, який дозволяє групувати об'єкти в деревоподібні структури для представлення ієрархій частини та цілого. Композитний патерн дозволяє клієнтам однаково сприймати окремі об'єкти та композиції об'єктів. У контексті React, наприклад, це спосіб збирання компонентів для формування більш складних інтерфейсів користувача. Композитний патерн пов'язаний з створенням деревоподібної структури об'єктів, де група об'єктів може бути сприйнята так само, як і окремий екземпляр об'єкта.  

- **Compound Components**, де батьківський компонент та його діти діляться неявним станом, який дозволяє їм спілкуватися між собою. Це спосіб неявної передачі стану через дерево компонентів. 

Взагалі кажучи, Composite Pattern - це загальний патерн проектування для організації об'єктів у деревоподібні структури, тоді як Compound Components - це техніка, специфічна для React, для спільного використання стану та поведінки між батьківським компонентом та його дітьми.


```tsx
interface CtaRootProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
}

export const CtaRoot: React.FC<CtaRootProps> = ({
                                                  variant = 'primary',
                                                  size = 'medium',
                                                  className,
                                                  children,
                                                  ...props
                                                }) => {
  const classes = `btn ${variant} ${size} ${className}`;

  return (
          <button className={classes} {...props}>
            {children}
          </button>
  );
};

export const CtaIcon: React.FC<React.ComponentProps<typeof Icon>> = (props) => {
  return <Icon {...props} />;
};

export const CtaText: React.FC<React.ComponentProps<'span'>> = ({
                                                                  children,
                                                                  ...props
                                                                }) => {
  return <span {...props}>{children}</span>;
};

export const Cta = {
  Root: CtaRoot,
  Icon: CtaIcon,
  Text: CtaText,
};
```

```tsx
{/* Icon Left */}
<Cta.Root>
  <Cta.Icon name="+" color="red" size={20} />
  <Cta.Text>Add more</Cta.Text>
</Cta.Root>

{/* Icon Right */}
<Cta.Root>
  <Cta.Text>Add more</Cta.Text>
  <Cta.Icon name="+" color="green" size={20} />
</Cta.Root>

{/* Icon Both sides with different colors and sizes */}
<Cta.Root>
  <Cta.Icon name="+" color="red" size={20} />
  <Cta.Text>Add more</Cta.Text>
  <Cta.Icon name="+" color="green" size={30} />
</Cta.Root> 
```

Цікаві посилання:
- [Pixi Shooter](https://github.com/leoflood/pixi-shooter?tab=readme-ov-file)
  This is a 2D demo shooter developed with Typescript, Pixi JS and React that uses the composite design pattern. You will try to survive from the enemies that will appear and use your skills against them.

