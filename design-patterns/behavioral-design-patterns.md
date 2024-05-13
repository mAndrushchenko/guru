## Behavioral Design Patterns

### State

Дозволяє об'єкту змінювати свою поведінку, коли змінюється його внутрішній стан.

> In a document editing application, the State Pattern can manage different editing states efficiently. For example:  
> When the document is in "Editing" state, users can freely modify the content.  
> In "Read-only" state, users can only view the content without editing it.

**JS example**

```ts
class PlayingState {
  constructor(player) {
    this.player = player
  }

  play() {
    console.log("Already playing.")
  }

  pause() {
    console.log("Pausing playback...")
    this.player.setState(new PausedState(this.player))
  }

  stop() {
    console.log("Stopping playback...")
    this.player.setState(new StoppedState(this.player))
  }
}

class PausedState {
  constructor(player) {
    this.player = player
  }

  play() {
    console.log("Resuming playback...")
    this.player.setState(new PlayingState(this.player))
  }

  pause() {
    console.log("Already paused.")
  }

  stop() {
    console.log("Stopping playback...")
    this.player.setState(new StoppedState(this.player))
  }
}

class StoppedState {
  constructor(player) {
    this.player = player
  }

  play() {
    console.log("Starting playback...")
    this.player.setState(new PlayingState(this.player))
  }

  pause() {
    console.log("Playback is stopped. Cannot pause.")
  }

  stop() {
    console.log("Playback is already stopped.")
  }
}

class MediaPlayer {
  constructor() {
    this.state = new StoppedState(this)
  }

  setState(state) {
    this.state = state
  }

  play() {
    this.state.play()
  }

  pause() {
    this.state.pause()
  }

  stop() {
    this.state.stop()
  }
}

const player = new MediaPlayer()
player.play() // Output: Starting playback...
player.pause() // Output: Pausing playback...
player.play() // Output: Resuming playback...
player.stop() // Output: Stopping playback...
player.stop() // Output: Playback is already stopped.
player.pause() // Output: Playback is stopped. Cannot pause.
```

**⚛️ React example**

```tsx
// w/o state pattern
<Input
  initialValue={initialValue}
  value={value}
  onChange={onChange}
  onBlur={onBlur}
/>

// with state pattern
<Input state={state} />
```

```tsx
function createThrottledState(immediateState) {
  const [ throttledValue, setThrottledValue ] = useState()

  const throttleFunc = throttle((newValue) => {
    setThrottledValue(newValue)
  }, 1000)

  const setValue = (newValue) => {
    immediateState.setValue(newValue)
    throttleFunc(newValue)
  }

  return {
    getValue: immediateState.getValue,
    getThrottledValue: () => throttledValue,
    setValue: useCallback(setValue, [immediateState]),
  }
}

const immediateState = createSimpleState()
const throttledState = createThrottledState(immediateState)

<Input state={throttledState} />

<span>{throttledState.getThrottledValue()}</span>
```

```tsx
const Input = ({ state }) => {
  const { getInitialValue, getValue, setValue } = state

  return (
    <input
      defaultValue={getInitialValue ? getInitialValue() : undefined}
      value={getValue ? getValue() : undefined}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}
```

**Pros**

- SRP, OCP
- simplifies the logic (readability, maintenance, reduces the amount of conditions)

**Cons**

- Could be an overkill for simple problems
