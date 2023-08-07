// eslint-disable-next-line max-classes-per-file
type FetchKey = string | readonly unknown[];

class FetchState<TData = unknown> {
  key: FetchKey;
  data: TData;
  error: unknown;

  constructor(config: { key: FetchKey; data: TData; error?: unknown }) {
    this.key = config.key;
    this.data = config.data;
    this.error = config.error;
  }

  setData(data: TData) {
    this.data = data;
  }

  setError(error: unknown) {
    this.error = error;
  }
}

type FetchFn<TData = unknown> = () => TData | Promise<TData>;

class FetchClient {
  states: FetchState[];
  listeners: Set<() => void>;

  constructor() {
    this.states = [];
    this.listeners = new Set();
  }

  getFetchData<TData = unknown>(key: FetchKey) {
    return this.find<TData>(key);
  }

  setFetchData<TData = unknown>(key: FetchKey, data: TData) {
    if (!this.isStateEmpty) {
      this.states = [
        ...this.states.map(state => {
          if (state.key === key) {
            state.setData(data);
          }

          return state;
        }),
        new FetchState({ key, data }),
      ];
    } else {
      this.states = [new FetchState({ key, data })];
    }
  }

  find<TData = unknown>(key: FetchKey): FetchState<TData> | undefined {
    return this.states.find(state => state.key === key) as FetchState<TData>;
  }

  async fetch<TData = unknown>(key: FetchKey, fetchFn: FetchFn<TData>) {
    if (this.find(key)) {
      return;
    }

    try {
      const result = await fetchFn();
      this.setFetchData(key, result);
    } catch (error) {
      if (!this.isStateEmpty) {
        this.states = this.states.map(state => {
          if (state.key === key) {
            state.setError(error);
          }
          return state;
        });
      } else {
        this.states = [new FetchState({ key, data: undefined, error })];
      }
    }

    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  get isStateEmpty() {
    return this.states.length === 0;
  }
}

export default FetchClient;
