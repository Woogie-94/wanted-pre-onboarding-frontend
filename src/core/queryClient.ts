// eslint-disable-next-line max-classes-per-file
type QueryKey = string | readonly unknown[];

class QueryState<TData = unknown> {
  key: QueryKey;
  data: TData;
  error: unknown;

  constructor(config: { key: QueryKey; data: TData; error?: unknown }) {
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

type QueryFn<TData = unknown> = () => TData | Promise<TData>;

class QueryClient {
  states: QueryState[];
  listeners: Set<() => void>;

  constructor() {
    this.states = [];
    this.listeners = new Set();
  }

  getQueryData<TData = unknown>(key: QueryKey) {
    return this.find<TData>(key);
  }

  setQueryData<TData = unknown>(key: QueryKey, data: TData) {
    if (!this.isStateEmpty) {
      this.states = [
        ...this.states.map(state => {
          if (state.key === key) {
            state.setData(data);
          }

          return state;
        }),
        new QueryState({ key, data }),
      ];
    } else {
      this.states = [new QueryState({ key, data })];
    }
  }

  find<TData = unknown>(key: QueryKey): QueryState<TData> | undefined {
    if (typeof key === "object") {
      return this.states.find(state => {
        if (typeof state.key === "object") {
          return state.key.every(item => key.find(k => item === k));
        }
        return false;
      }) as QueryState<TData>;
    } else {
      return this.states.find(state => state.key === key) as QueryState<TData>;
    }
  }

  async fetch<TData = unknown>(key: QueryKey, QueryFn: QueryFn<TData>) {
    if (this.find(key)) {
      return;
    }

    try {
      const result = await QueryFn();
      this.setQueryData(key, result);
    } catch (error) {
      if (!this.isStateEmpty) {
        this.states = this.states.map(state => {
          if (state.key === key) {
            state.setError(error);
          }
          return state;
        });
      } else {
        this.states = [new QueryState({ key, data: undefined, error })];
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

export default QueryClient;
