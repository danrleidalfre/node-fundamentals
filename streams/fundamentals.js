import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const b = Buffer.from(String(i))
        this.push(b)
      }
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chuck, encoding, callback) {
    console.log(Number(chuck.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chuck, encoding, callback) {
    const transformed = Number(chuck.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

// new OneToHundredStream().pipe(process.stdout)
//new OneToHundredStream().pipe(new MultiplyByTenStream())
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
