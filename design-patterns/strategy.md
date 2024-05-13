# Strategy (Стратегія)

**Стратегія** - це поведінковий патерн проектування, який визначає сімейство схожих алгоритмів і розміщує кожен з них у власному класі.
Після цього алгоритми можна заміняти один на інший прямо під час виконання програми.

Цей паттерн має широке застосування, являється варіантом dependency injection, дозволяє створити інтерфейс і програмувати на рівні абстракції.

### Застосування

1. Якщо у вас є безліч схожих класів, які відрізняються лише деякою поведінкою.

```ts
const PayPalPaymentProcessor: React.FC = () => {

  const processPayment = async (amount: number) => {
    // Implementation for processing payment using PayPal API
  };

  const refundPayment = async (transactionId: string) => {
    // Implementation for refunding payment using PayPal API
  };

  return (
    <div>
      <button onClick={() => processPayment(100)}>Process Payment</button>
      <button onClick={() => refundPayment("transaction123")}>
        Refund Payment
      </button>
    </div>
  );
};

const StripePaymentProcessor: React.FC = () => {
 // Implementation
};

const SquarePaymentProcessor: React.FC = () => {
 // Implementation
};

const App: React.FC = () => {
  return (
    <div>
      <h2>Payment with PayPal</h2>
      <PayPalPaymentProcessor />

      <h2>Payment with Stripe</h2>
      <StripePaymentProcessor />

      <h2>Payment with Square</h2>
      <SquarePaymentProcessor />
    </div>
  );
};
```

2. Якщо ви не хочете оголювати деталі реалізації алгоритмів для інших класів.
3. Якщо різні варіації алгоритмів реалізовано у вигляді розлогого умовного оператора. Кожна гілка такого оператора є варіацією алгоритму.
4. Якщо вам потрібно використовувати різні варіації якого небудь алгоритму всередині одного об’єкта.

```ts
const PaymentProcessor: React.FC<{name: string}> = ({ name }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handlePayment = async (amount: number) => {
    try {
        let success;
        if (name === 'PayPal') {
          success = // Implementation;
        } if (name === 'Stripe') else {
          success = // Implementation;
        } else {
          success = // Implementation;
        }
        setMessage(success ? "Payment successful!" : "Payment failed!");
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed!");
    }
  };

  const handleRefund = async (transactionId: string) => {
    try {
        let success;
        if (name === 'PayPal') {
          success = // Implementation;
        } if (name === 'Stripe') else {
          success = // Implementation;
        } else {
          success = // Implementation;
        }
    } catch {
    }
  };

  return (
    <div>
      <button onClick={() => handlePayment(100)}>Process Payment</button>
      <button onClick={() => handleRefund("transaction123")}>
        Refund Payment
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h2>Payment with PayPal</h2>
      <PaymentProcessor name='PayPal' />

      <h2>Payment with Stripe</h2>
      <PaymentProcessor name='Stripe' />

      <h2>Payment with Square</h2>
      <PaymentProcessor name='Square' />
    </div>
  );
};
```

### Основні компоненти

- Контекст: Об'єкт, який зберігає імплементацію стратегії і працює з нею через інтерфейс.
- Стратегія: Інтерфейс, спільний для всіх варіацій алгоритму.
- Конкретна Стратегія: Реалізація варіації алгоритму.

### Кроки реалізації

1. Визначте алгоритм, що схильний до частих змін.
   Також підійде алгоритм, який має декілька варіацій, які обираються під час виконання програми.

2. Створіть інтерфейс стратегій, що описує цей алгоритм. Він повинен бути спільним для всіх варіантів алгоритму.

```ts
type PaymentGatewayStrategy = {
  processPayment(amount: number): Promise<boolean>;
  refundPayment(transactionId: string): Promise<boolean>;
};
```

3. Помістіть варіації алгоритму до власних класів, які реалізують цей інтерфейс.

```ts
const PayPalStrategy: PaymentGatewayStrategy = {
  processPayment: async (amount: number) => {
    // Implementation for processing payment using PayPal API
    // ...
    return true;
  },
  refundPayment: async (transactionId: string) => {
    // Implementation for refunding payment using PayPal API
    // ...
    return true;
  },
};

const StripeStrategy: PaymentGatewayStrategy = {};

const SquareStrategy: PaymentGatewayStrategy = {};
```

4. У класі контексту створіть поле для зберігання посилання на поточний об’єкт-стратегію, а також метод для її зміни. Переконайтеся в тому, що контекст працює з цим об’єктом тільки через загальний інтерфейс стратегій.

```ts
const PaymentProcessor: React.FC<{ strategy: PaymentGatewayStrategy }> = ({
  strategy,
}) => {
  const processPayment = async (amount: number) => {
    try {
      const success = await strategy.processPayment(amount);
      if (success) {
        console.log("Payment successful!");
      } else {
        console.error("Payment failed!");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const refundPayment = async (transactionId: string) => {
    try {
      const success = await strategy.refundPayment(transactionId);
      if (success) {
        console.log("Refund successful!");
      } else {
        console.error("Refund failed!");
      }
    } catch (error) {
      console.error("Error processing refund:", error);
    }
  };

  return (
    <div>
      <button onClick={() => processPayment(100)}>Process Payment</button>
      <button onClick={() => refundPayment("transaction123")}>
        Refund Payment
      </button>
    </div>
  );
};
```

5. Клієнти контексту мають подавати до нього відповідний об’єкт-стратегію, коли хочуть, щоб контекст поводився певним чином.

```ts
const App: React.FC = () => {
  return (
    <div>
      <h2>Payment with PayPal</h2>
      <PaymentProcessor strategy={PayPalStrategy} />

      <h2>Payment with Stripe</h2>
      <PaymentProcessor strategy={StripeStrategy} />

      <h2>Payment with Square</h2>
      <PaymentProcessor strategy={SquareStrategy} />
    </div>
  );
};
```

Паттерн Стратегія настільки популярний в програмуванні, що в сучасному реакті ми використовуємо його постійно навіть не помічаючи.

```ts
// Strategies
const payments: Record<string, PaymentProcessorStrategy> = {
  PayPal: {
    processPayment: async (amount: number) => {
      // Implementation for processing payment
      return true;
    },
    refundPayment: async (transactionId: string) => {
      // Implementation for refunding payment
      return true;
    },
  },
  Stripe: {
    processPayment: async (amount: number) => true,
    refundPayment: async (transactionId: string) => true,
  },
  Square: {
    processPayment: async (amount: number) => true,
    refundPayment: async (transactionId: string) => true,
  },
};

// Interface
type PaymentProcessorStrategy = {
  processPayment: (amount: number) => Promise<boolean>;
  refundPayment: (transactionId: string) => Promise<boolean>;
};

// Context
const PaymentProcessor: React.FC<PaymentProcessorStrategy> = ({
  processPayment,
  refundPayment,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  const handlePayment = async (amount: number) => {
    try {
      const success = await processPayment(amount);
      setMessage(success ? "Payment successful!" : "Payment failed!");
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed!");
    }
  };

  const handleRefund = async (transactionId: string) => {
    try {
      const success = await refundPayment(transactionId);
      setMessage(success ? "Refund successful!" : "Refund failed!");
    } catch (error) {
      console.error("Error processing refund:", error);
      setMessage("Refund failed!");
    }
  };

  return (
    <div>
      <button onClick={() => handlePayment(100)}>Process Payment</button>
      <button onClick={() => handleRefund("transaction123")}>
        Refund Payment
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

// Example usage in the app
const App: React.FC = () => {
  return (
    <div>
      <h2>Payment with PayPal</h2>
      <PaymentProcessor {...payments.PayPal} />

      <h2>Payment with Stripe</h2>
      <PaymentProcessor {...payments.Stripe} />

      <h2>Payment with Square</h2>
      <PaymentProcessor {...payments.Square} />
    </div>
  );
};
```

## Переваги

- Гнучкість: Паттерн "Стратегія" дозволяє динамічно змінювати алгоритми виконання під час виконання програми, що робить систему більш гнучкою та адаптивною до змін умов.

- Підтримка принципу "відкриття/закриття": Інтерфейс стратегії визначає стандартний спосіб взаємодії з алгоритмами, але конкретні реалізації можуть бути додані або замінені без модифікації контексту використання.

- Модульність і розширюваність: Кожна стратегія може бути розглянута як окремий модуль, що дозволяє розширювати та модифікувати систему без великих перетворень усього коду.

- Заміна спадкування делегуванням.

## Недоліки

- Збільшена складність: Паттерн "Стратегія" може призвести до збільшення кількості модулів у системі, що може ускладнити розуміння коду.

- Клієнт повинен знати, в чому полягає різниця між стратегіями, щоб вибрати потрібну.

## Відносини з іншими патернами

По своїй суті паттерн ідентичний до паттерна "Команда", різниця тільки в тому що стратегії описують різні способи того як зробити одну дію, а комманди описують різні дії.
