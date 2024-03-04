# Singleton (a.k.a. Одинак 😎)

## Introduction

**What is Singleton?**

The Singleton pattern is a creational design pattern that ensures a class has only one instance while providing a global access point to this instance.

---

Одинак — це породжувальний патерн проектування, який гарантує, що клас має лише один екземпляр, та надає глобальну точку доступу до нього.

## Problem

The Singleton pattern addresses two issues at once:

1. Ensuring that a class has just a single instance.
2. Providing a global access point to that instance.

---

Патерн Singleton вирішує одразу дві проблеми:

1. Гарантує наявність єдиного екземпляра класу.
2. Надає глобальну точку доступу.

## Solution

To implement the Singleton pattern:

- Make the default constructor private to prevent other objects from using the `new` operator with the Singleton class.
- Create a static creation method that acts as a constructor.

---

Для реалізації патерну Singleton:

- Зробіть конструктор приватним, щоб заборонити іншим об'єктам використовувати оператор `new` з класом Singleton.
- Створіть статичний метод створення, який діє як конструктор.

## Examples

### OOP

```typescript
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

### JS Functional style

The Singleton in FP style can be implemented as a closure.

A closure is a function bundled together with all the variables that were in scope at the time the closure was created. Even if the closure is called outside of its original scope, it retains access to these variables. This feature enables functions to "remember" and operate with data from their surrounding context.

---

Singleton у стилі функціонального програмування можна реалізувати у вигляді замикання.

Замикання - це функція, що зберігається разом з усіма змінними, які були в області видимості на момент створення замикання. Навіть якщо замикання викликається за межами свого початкового контексту, воно все ще має доступ до цих змінних. Ця функція дозволяє "запам'ятовувати" та працювати з даними з оточуючого контексту.

Implementing using a function:

```typescript
const ConfigManager = (() => {
  let configurations: { [key: string]: any } = {};

  const setConfig = (key: string, value: any) => {
    configurations[key] = value;
  };

  const getConfig = (key: string) => {
    return configurations[key];
  };

  const instance = {
    setConfig,
    getConfig,
  };

  return () => instance;
})();

// Usage
const configManager1 = ConfigManager();
configManager1.setConfig("apiKey", "abc123");

const configManager2 = ConfigManager();
console.log(configManager2.getConfig("apiKey")); // Output: abc123

// Both instances refer to the same object
console.log(configManager1 === configManager2); // Output: true
```

Implementing using modules:

```typescript
// ConfigManager.ts

let configurations: { [key: string]: any } = {};

export const setConfig = (key: string, value: any) => {
  configurations[key] = value;
};

export const getConfig = (key: string) => {
  return configurations[key];
};

// App.ts

// Usage
import * as ConfigManager from "ConfigManager";

const configManager1 = ConfigManager;
configManager1.setConfig("apiKey", "abc123");

const configManager2 = ConfigManager;
console.log(configManager2.getConfig("apiKey")); // Output: abc123

// Both instances refer to the same object
console.log(configManager1 === configManager2); // Output: true
```

### Functional

Module implementation is a viable solution for problems that Singleton solves in FP-flavored JS (though not strictly FP). However, it's worth noting that the Singleton pattern is often considered an anti-pattern in functional programming for several reasons:

- Immutability: FP values immutability, where data remains unchanged after creation. However, Singleton often relies on mutable state, contradicting this principle.

- Referential Transparency: FP promotes referential transparency, meaning a function's output depends solely on its inputs, not external state. Singleton introduces global state, which can lead to functions behaving differently depending on the state of the Singleton, violating referential transparency.

- Encapsulation: Singleton exposes a global access point, breaking encapsulation by tightly coupling components. FP encourages modular design and encapsulation to isolate behavior and state.

Overall, while Singleton offers global access to a single instance, it introduces complexities and undermines key principles of FP. In FP, alternatives like dependency injection and pure functions are preferred for managing state and dependencies, promoting cleaner and more maintainable code.

---

Попередні приклади є прийнятним рішенням для проблем, які вирішує Singleton у JS в функціональному стилі (хоча це не суворо функціональне програмування). Однак варто зауважити, що паттерн Singleton часто вважається анти-паттерном у функціональному програмуванні з кількох причин:

- Незмінність: FP цінує незмінність, коли дані залишаються незмінними після створення. Однак Singleton часто покладається на змінний стан, що суперечить цьому принципу.

- Референтна прозорість: FP сприяє референтній прозорості, що означає, що вихід функції залежить виключно від її входів, а не від зовнішнього стану. Singleton вводить глобальний стан, що може призвести до різних результатів функцій в залежності від стану Singleton, порушуючи референтну прозорість.

- Інкапсуляція: Singleton надає глобальний доступ, порушуючи інкапсуляцію та тісно зв'язуючи компоненти. FP підтримує модульний дизайн та інкапсуляцію для ізоляції поведінки та стану.

Загалом, хоча Singleton надає глобальний доступ до єдиного екземпляру, він вводить складнощі та порушує ключові принципи FP. У функціональному програмуванні альтернативи, такі як впровадження залежностей (DI) та чисті функції, переважають у керуванні станом та залежностями, що сприяє більш чистому та ремонтопридатному (maintainable) коду.

Here is an example which provides similar functionality to previous examples but doesn't undermine the principles of FP:

```typescript
type ConfigManager = {
  setConfig: (key: string, value: any) => ConfigManager;
  getConfig: (key: string) => any;
};

const createConfigManager = (
  configurations: { [key: string]: any } = {},
): ConfigManager => {
  return {
    setConfig: (key: string, value: any) => {
      const updatedConfigurations = { ...configurations, [key]: value };
      // Return a new instance of the configuration manager with the updated configurations
      return createConfigManager(updatedConfigurations);
    },
    getConfig: (key: string) => configurations[key],
  };
};

// Usage
const configManager1 = createConfigManager();
const configManager1_2 = configManager1.setConfig("apiKey", "abc123");

const configManager2 = createConfigManager();
console.log(configManager2.getConfig("apiKey")); // Output: undefined

// New instance with updated configuration
console.log(configManager1_2.getConfig("apiKey")); // Output: abc123

// Instances are not equal because of immutability
console.log(configManager1 === configManager2); // Output: false
```

Pros:

- Immutable data ensures predictability, simplifies reasoning about code behavior, and helps prevent unintended side effects by guaranteeing that data cannot be changed after creation.
- Referential Transparency guarantees that given the same inputs, a function will always produce the same output, making it easier to reason about and test.
- Dependency injection:
  - FP promotes dependency injection, where dependencies are explicitly passed to functions rather than being accessed globally.
  - Dependency injection facilitates modularity, testability, and code reuse, which are core principles of FP, whereas Singleton tends to lead to tighter coupling and less flexible code.

Cons:

- Dependency Management: Managing dependencies and ensuring they are correctly passed down the component tree can be challenging, especially in larger applications with complex component structures. Although it can be mitigated by using Context in React, reducing the need for explicit prop drilling

---

Переваги:

- Незмінні дані гарантують передбачуваність, спрощують мислення про поведінку коду та допомагають уникнути непередбачених побічних ефектів, забезпечуючи незмінність даних після їх створення.
- Референтна прозорість гарантує, що при тих самих вхідних даних функція завжди буде повертати один й той же результат, що полегшує мислення та тестування коду.
- Dependency injection:
  - FP сприяє впровадженню залежностей, де залежності явно передаються до функцій, а не звертаються до них глобально.
  - Впровадження залежностей сприяє модульності, тестовості та повторному використанню коду, які є основними принципами FP, у той час як Singleton тенденційно призводить до більш тісного зв'язування та менш гнучкого коду.

Недоліки:

- Управління залежностями: Управління залежностями та переконання в тому, що вони правильно передаються вниз по структурі компонентів, може бути складним завданням, особливо у великих програмах зі складною структурою компонентів. Однак це можна пом'якшити, використовуючи контекст у React, що зменшує потребу у явному прокиданні пропсів.

## Real-world Use Cases

The Singleton pattern is commonly used in client-side JavaScript for the following purposes:

- Managing Global State: Singleton pattern can be used to manage global state in your application. For instance, you might have a global state manager that holds application-wide data such as user authentication status, theme preferences, or language settings.

- Configuration Management: As shown in the previous example, Singleton can be used to manage configuration data that needs to be accessed from different parts of your application. This could include API keys, server URLs, or other settings.

- Logging: Singleton pattern can be utilized for logging purposes where you want to have a single logger instance throughout your application to centralize logging logic and manage log levels, destinations, etc.

- Caching: Singleton can be employed as a cache manager to store frequently accessed data or to implement a caching strategy for API responses, thus improving the performance of your application.

- Managing Third-party Libraries: If you have a client-side application that interacts with multiple third-party libraries or APIs, Singleton pattern can be used to manage the initialization and configuration of these libraries in a centralized manner.
