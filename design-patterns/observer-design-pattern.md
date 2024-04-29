# Observer Pattern

Спостерігач — це поведінковий патерн проектування, який створює механізм підписки, що дає змогу одним об’єктам
стежити й реагувати на події, які відбуваються в інших об’єктах.

Патерн Спостерігач пропонує зберігати всередині об’єкта видавця список посилань на об’єкти підписників. 
Причому видавець не повинен вести список підписки самостійно. Він повинен надати методи, за допомогою
яких підписники могли б додавати або прибирати себе зі списку.

Коли у видавця відбуватиметься важлива подія, він буде проходитися за списком передплатників та сповіщувати 
їх про подію, викликаючи певний метод об’єктів-передплатників.

## Переваги

- Видавці не залежать від конкретних класів підписників і навпаки.
- Ви можете підписувати і відписувати одержувачів «на льоту».
- Реалізує принцип відкритості/закритості.

## Недоліки

- Підписники сповіщуються у випадковій послідовності.

## Коли використовувати

Паттерн Observer варто використовувати, коли один об'єкт має автоматично 
повідомляти про зміни інші об'єкти, які можуть реагувати на ці зміни. Це 
особливо корисно в програмах з графічним інтерфейсом, де дії користувача можуть викликати зміни 
в кількох частинах програми одночасно. Також цей паттерн ефективний у розробці систем, де потрібно 
забезпечити високий рівень модульності та незалежності компонентів.

## Приклади використання

### OOP:
```ts
interface Observer {
  update: (data: any) => void;
}

interface Subject {
  registerObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: () => void;
}

class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number;

  registerObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    for (let observer of this.observers) {
      observer.update(this.temperature);
    }
  }

  setTemperature(temp: number) {
    console.log(`WeatherStation: New temperature measurement: ${temp}`);
    this.temperature = temp;
    this.notifyObservers();
  }
}

class TemperatureDisplay implements Observer {
  private subject: Subject;

  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }

  update(temperature: number) {
    console.log(`TemperatureDisplay: I need to update my display to: ${temperature}`);
  }
}

const weatherStation = new WeatherStation();
const display = new TemperatureDisplay(weatherStation);

weatherStation.setTemperature(35);
weatherStation.setTemperature(28);
```

### React:
```tsx
// Create the Context

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Context Provider
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
  );
}

// Consume the Context
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

const CurrentThemeDisplay: React.FC = () => {
  const { theme } = useTheme();

  return <div>Current Theme: {theme}</div>;
};
```

## З якими патренами часто використовується

Ланцюжок обов’язків, Команда Посередник та Спостерігач показують різні способи роботи тих, хто надсилає запити, та тих, хто їх отримує:

- **Ланцюжок обов’язків** - передає запит послідовно через ланцюжок потенційних отримувачів, очікуючи, що один з них обробить запит.
- **Команда** - встановлює непрямий односторонній зв’язок від відправників до одержувачів.
- **Посередник** - прибирає прямий зв’язок між відправниками та одержувачами, змушуючи їх спілкуватися опосередковано, через себе.
- **Спостерігач** - передає запит одночасно всім зацікавленим одержувачам, але дозволяє їм динамічно підписуватися або відписуватися від таких повідомлень.
