## Structural Design Patterns

### Adapter pattern

Дозволяє двом несумісним інтерфейсам працювати разом.

> Життєвий приклад: У ситуації коли дві людини розмовляють різними мовами, вони можуть скористатися послугами перекладача

**⚛️ React Example**

```tsx
interface ResponseUserData {
  id: number
  firstname: string
  lastname: string
  age: number
}

interface UserData {
  key: number
  fullname: string
  age: number
}

const Users: React.FC<ResponseUserData[]> = ({ data }) => {
  const [users, setUsers] = useState<UserData[]>([])

  const adaptData = (data: ResponseUserData[]): UserData[] => {
    return data.map((user) => ({
      key: user.id,
      fullname: `${user.firstname} ${user.lastname}`,
      age: user.age,
    }))
  }

  const adaptedData = adaptData(data)
  setUsers(adaptedData)

  return <Table data={users} />
}
```

**Applicability**

- ✅ Third-party libraries
- ✅ Legacy code

**Pitfalls**

- Performance
- Complexity
