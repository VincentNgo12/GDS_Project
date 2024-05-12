function DFT(points) {
    if (!Array.isArray(points)) {
      throw new TypeError("Argument 'points' must be an array");
    }
  
    const N = points.length;
    const m = Math.floor(N / 2);
    const coefficients = [];
  
    // Convert points to Complex numbers
    const values = points.map(point => new Complex(point.x, point.y));
  
    for (let k = -m; k < m; k++) {
      let sum = new Complex(0, 0);
      for (let n = 0; n < N; n++) {
        const angle = k * n * ((2 * Math.PI) / N);
        const exponentialTerm = new Complex(Math.cos(angle), -Math.sin(angle));
        sum = sum.add(values[n].multiply(exponentialTerm));
      }
      coefficients.push(new FourierCoefficient(sum, k, N));
    }
  
    return coefficients;
}


class FourierCoefficient {
    constructor(complex, frequency, N) {
      if (!(complex instanceof Complex)) {
        throw new TypeError("Argument 'complex' must be a Complex number");
      }
  
      const real = complex.real / N;
      const imag = complex.imag / N;
      this.freq = frequency;
      this.phase = Math.atan2(imag, real);
      this.mag = Math.sqrt(real * real + imag * imag);
    }
}
  


class Complex {
    constructor(real, imag) {
      this.re = real;
      this.im = imag;
    }
  
    add(other) {
      if (other instanceof Complex) {
        this.re += other.real;
        this.im += other.imag;
      } else {
        throw new TypeError("Argument must be a Complex number");
      }
    }
  
    multiply(other) {
      if (other instanceof Complex) {
        const newReal = this.re * other.re - this.im * other.im;
        const newImag = this.re * other.im + this.im * other.re;
        return new Complex(newReal, newImag);
      } else {
        throw new TypeError("Argument must be a Complex number");
      }
    }
  
    toString() {
      const imagStr = this.imag >= 0 ? `+ ${this.imag}i` : `- ${Math.abs(this.imag)}i`;
      return `${this.real}${imagStr}`;
    }
  }