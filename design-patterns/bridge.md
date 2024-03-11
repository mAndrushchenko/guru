## Structural Design Patterns

### Bridge pattern

**Міст (bridge)** - розділяє один або кілька класів на дві окремі ієрархії — абстракцію та реалізацію, дозволяючи змінювати код в одній гілці класів, незалежно від іншої.

Абстракція і Реалізація

Ці терміни було введено в книзі GoF при описі Мосту. Aбстракція (або інтерфейс) — це уявний рівень керування чим-небудь, що не виконує роботу самостійно, а делегує її рівню реалізації (який зветься платформою).

> Тільки не плутайте ці терміни з інтерфейсами або абстрактними класами вашої мови програмування — це не одне і те ж саме.

**В реальних програмах** - абстракцією може виступати графічний інтерфейс програми (GUI), а реалізацією — низькорівневий код операційної системи (API), до якого графічний інтерфейс звертається, реагуючи на дії користувача.

**Переваги та недоліки**

* ✅ Дозволяє будувати платформо-незалежні програми.
* ✅ Приховує зайві або небезпечні деталі реалізації від клієнтського коду.
* ✅ Реалізує принцип відкритості/закритості.

* ❌ Ускладнює код програми внаслідок введення додаткових класів.

**Коли слід використовувати патерн Міст?**

**Незалежність від абстракції та реалізації:** коли ми хочемо спроектувати системи таким чином, щоб зміни в абстракції (інтерфейс або основна функціональність) не впливали на реалізацію (як ця функціональність досягається) і навпаки.

**Кілька ієрархій:** коли у нас є система з кількома ієрархіями, які перетинаються, і ми хочемо уникнути комбінаторного вибуху класів, який може виникнути, якщо ми використовуємо традиційне успадкування.

**Варіативність абстракцій і реалізацій:** коли ми очікуємо різних варіацій або відтінків як абстракції, так і реалізації. Візерунок "Міст" дозволяє нам легко комбінувати ці варіації.

**Залежний від платформи код:** коли мова йде про специфічний для платформи код, наприклад код, який взаємодіє з різними операційними системами чи обладнанням. Шаблон "Міст" може допомогти керувати цими відмінностями шляхом інкапсуляції специфічного для платформи коду в реалізації.

**Ремонтопридатність і гнучкість:** коли ми хочемо створити дизайн, який легше підтримувати та розширювати. Зміни в абстракціях або реалізаціях не поширюватимуться на всю кодову базу, зменшуючи ризик появи помилок або небажаних побічних ефектів.

**Інтеграція сторонніх розробників:** під час інтеграції зі сторонніми бібліотеками або фреймворками, які можуть розвиватися або змінюватися. Шаблон "Міст" може забезпечити спосіб ізоляції нашого коду від таких змін.

**Тестування та налагодження:** коли ми хочемо покращити тестування та налагодження, ізолюючи компоненти, які ми тестуємо, від їхніх реалізацій. Це може полегшити виявлення проблем.

**Паралельна розробка:** коли ми працюємо з командами, які можуть самостійно працювати над абстракцією та реалізацією. Патерн "Міст" дозволяє паралельно розвиватися без жорсткого зв’язку.

**Масштабованість:** коли ми створюємо систему, яка потребує масштабування та розвитку з часом. Розділення проблем у шаблоні "Міст" може полегшити роботу зі змінами та зростанням.
> Посилання на джерело "https://www.pentalog.com/blog/design-patterns/bridge-design-patterns/"

**Classes & TS example**
```tsx
// Implementing the Shape abstraction
abstract class Shape {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  abstract draw(): void;
}

// Implementing the Implementor interface
interface Renderer {
  renderCircle(x: number, y: number, radius: number): void;
  renderSquare(x: number, y: number, side: number): void;
}

// Implementing ConcreteImplementorA
class SVGRenderer implements Renderer {
  renderCircle(x: number, y: number, radius: number): void {
    console.log(`<circle cx="${x}" cy="${y}" r="${radius}" fill="red" />`);
  }

  renderSquare(x: number, y: number, side: number): void {
    console.log(`<rect x="${x}" y="${y}" width="${side}" height="${side}" fill="blue" />`);
  }
}

// Implementing ConcreteImplementorB
class CanvasRenderer implements Renderer {
  renderCircle(x: number, y: number, radius: number): void {
    console.log(`Rendered circle at (${x}, ${y}) with radius ${radius} on canvas.`);
  }

  renderSquare(x: number, y: number, side: number): void {
    console.log(`Rendered square at (${x}, ${y}) with side ${side} on canvas.`);
  }
}

// Implementing RefinedAbstraction
class Circle extends Shape {
  constructor(private x: number, private y: number, private radius: number, renderer: Renderer) {
    super(renderer);
  }

  draw(): void {
    this.renderer.renderCircle(this.x, this.y, this.radius);
  }
}

// Implementing RefinedAbstraction
class Square extends Shape {
  constructor(private x: number, private y: number, private side: number, renderer: Renderer) {
    super(renderer);
  }

  draw(): void {
    this.renderer.renderSquare(this.x, this.y, this.side);
  }
}

// Client code
function App() {
  const svgRenderer = new SVGRenderer();
  const circle = new Circle(50, 50, 30, svgRenderer);
  const square = new Square(100, 100, 50, svgRenderer);

  const canvasRenderer = new CanvasRenderer();
  const anotherCircle = new Circle(200, 200, 20, canvasRenderer);
  const anotherSquare = new Square(300, 300, 80, canvasRenderer);

  return (
    <div>
      <svg width="400" height="400">
        {circle.draw()}
        {square.draw()}
      </svg>
    </div>
  );
}

export default App;
```
**Function**
```tsx
// Implementing the Abstraction
type Theme = {
  applyTheme: () => void;
}

// Implementing the Implementor interface
type OS = {
  applyTheme: () => void;
}

// Implementing ConcreteImplementorA
const applyWindowsTheme: OS['applyTheme'] = () => {
  console.log("Applying Light Theme for Windows.");
  // Apply light theme for Windows
};

// Implementing ConcreteImplementorB
const applyMacOSTheme: OS['applyTheme'] = () => {
  console.log("Applying Dark Theme for macOS.");
  // Apply dark theme for macOS
};

// Implementing RefinedAbstraction
const createAppTheme = (applyTheme: OS['applyTheme']): Theme => {
  return {
    applyTheme: () => applyTheme(),
  };
}

// Client code
const appThemeForWindows = createAppTheme(applyWindowsTheme);
const appThemeForMac = createAppTheme(applyMacOSTheme);

appThemeForWindows.applyTheme(); // Applying Light Theme for Windows.
appThemeForMac.applyTheme(); // Applying Dark Theme for macOS.
```
**React**
```jsx
import { useState, useEffect } from 'react';

//useData  is a custom hook that acts as the bridge between your application and the data fetching implementation
export const useData = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();

  }, [url, method]);

  return { data, isLoading, error };
};


export const ExampleComponent = () => {
  const { data, isLoading, error } = useData('https://api.example.com/data', 'GET');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data.map((item) => <li> { item.name } </li>)}
    </ul>
  );
};
```