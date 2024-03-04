## Creational Design Patterns

### Factory method

**Фабричний метод** визначає інтерфейс для створення одного об'єкта, але дозволяє підкласам змінювати тип створюваних
об'єктів. Він фокусується на створенні одного продукту і використовується, коли є спільний інтерфейс або абстрактний
клас для продуктів, але потрібно генерувати різні їх імплементації.

> Життєвий приклад:: Уявімо, що ви власник ресторану, який спеціалізується на піці. Ви хочете, щоб кожен вид піци готувався особливим способом, але всі вони будуть піцами. Тут фабричний метод дозволить вашим кухарям створювати різні види піци, використовуючи один і той же процес.

```tsx
class Pizza {
  prepare() {
  }

  bake() {
  }

  cut() {
  }

  box() {
  }
}

class CheesePizza extends Pizza {
  prepare() {
    // Підготовка піци з сиром
  }
}

class PepperoniPizza extends Pizza {
  prepare() {
    // Підготовка піци з пепероні
  }
}

class PizzaFactory {
  createPizza(type) {
    switch (type) {
      case 'cheese':
        return new CheesePizza();
      case 'pepperoni':
        return new PepperoniPizza();
      default:
        throw new Error("Invalid pizza type");
    }
  }
}

```

### Abstract Factory

**Абстрактна фабрика** надає інтерфейс для створення сімейств пов'язаних або залежних об'єктів без специфікації їх
конкретних класів. Цей шаблон використовується, коли треба створити набір продуктів, які взаємодіють між собою або
залежать один від одного.

> Життєвий приклад: Тепер уявімо, що ваш ресторан вирішив розширити меню, додавши до піци салати та напої, які повинні відповідати певним видам піци. Абстрактна фабрика дозволить вам створювати набори їжі, де кожен набір міститиме піцу, салат та напій, які підходять один одному.

```tsx
class Pizza {
    // Імплементація спільна для всіх піц
}

class Drink {
    // Імплементація спільна для всіх напоїв
}

class Salad {
    // Імплементація спільна для всіх салатів
}

// Фабрики для створення конкретних продуктів
class ItalianMealFactory {
    createPizza() {
        return new ItalianPizza();
    }
    createDrink() {
        return new ItalianWine();
    }
    createSalad() {
        return new CaesarSalad();
    }
}

class AmericanMealFactory {
    createPizza() {
        return new PepperoniPizza();
    }
    createDrink() {
        return new Cola();
    }
    createSalad() {
        return new PotatoSalad();
    }
}
```

### Singleton (Одинак)

**Одинак** — це породжувальний патерн проектування, який гарантує, що клас має лише один екземпляр, та надає глобальну точку доступу до нього.

```tsx
class ConfigurationManager {
  private static instance: ConfigurationManager;
  private configurations: { [key: string]: any };

  private constructor() {
    this.configurations = {};
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  public setConfig(key: string, value: any) {
    this.configurations[key] = value;
  }

  public getConfig(key: string): any {
    return this.configurations[key];
  }
}

// Usage
const configManager1 = ConfigurationManager.getInstance();
configManager1.setConfig("apiKey", "abc123");

const configManager2 = ConfigurationManager.getInstance();
console.log(configManager2.getConfig("apiKey")); // Output: abc123

// Both instances refer to the same object
console.log(configManager1 === configManager2); // Output: true
```
