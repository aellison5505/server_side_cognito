
export class MyStorage {
    // set item with the key
    public mem:any;

    constructor () {
    this.mem = {}

    }
    setItem(key: string, value: string): string {
    this.mem[key] = value;
    console.log('store: '+ key+' : '+value+'\n\n')
    return key
    }
    // get item with the key
    getItem(key: string): string {
    let value = this.mem[key]
    console.log('pull: '+ key+' : '+value+'\n\n')
    return value
    }
    // remove item with the key
    removeItem(key: string): void {
    delete this.mem[key]
    }

    // clear out the storage
    clear(): void {
    this.mem = {}
    }
  }
