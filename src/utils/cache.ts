interface StorageItem {
  expirationDate: string;
  payload: any;
}

export class Cache<T = any> {
  constructor(private name: string) {}

  getItem() {
    const data: StorageItem = JSON.parse(localStorage.getItem(this.name)); //  console.log({ data: !data, ex: this.IsExpired(data) });
    if (!data || this.IsExpired(data)) return [];
    return data.payload as T;
  }

  private IsExpired(item: StorageItem) {
    const now = new Date();
    const expirationDate = new Date(item.expirationDate);
    return now > expirationDate;
  }

  setItem(payload: T, expiresIn: number = 12) {
    const expirationDate = this.getExpirationDate(expiresIn);
    const data = { expirationDate, payload };
    localStorage.setItem(this.name, JSON.stringify(data));
  }

  private getExpirationDate(expiresIn: number) {
    const date = new Date();
    date.setHours(date.getHours() + expiresIn);
    return date;
  }
}
