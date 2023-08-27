class Shape {
    info() {
        console.log("This is a Shape");
    }
}
console.log(new Shape);


// 1
class Rectangle extends Shape {
    whith: number;
    langth: number
    constructor(whith: number, langth: number) {
        super()
        this.whith = whith;
        this.langth = langth;
    }
    info(): string {
        return "This is a Recktangle"

    }
    area(): number {
        return this.langth * this.whith
    }
}
let rec = new Rectangle(5, 8);
console.log(rec.info());
console.log(rec.area());


// 2
class Square extends Rectangle {
    // whith: number
    constructor(whith: number) {
        super(whith, whith)
    }
    area(): number {
        return this.whith ** 2
    }
}
let squ = new Square(5);
console.log(squ.area());




class ColoredRectangle extends Rectangle {
    color: string;
    constructor(whith: number, langth: number, color: string) {
        super(whith, langth);
        this.color = color
    }
    info(): string {
        return `This is a rectangle in the color ${this.color}`
    }
}
let color = new ColoredRectangle(5, 5, 'red');
console.log(color);

class Shape1 {
    draw(): void {
        console.log('drawing a shape');
    }
}

class Triangle extends Shape1 {
    constructor() {
        super()
    }
    draw(): void {
        console.log('drawing a Triangle');
    }
}

class Circle extends Shape1 {
    constructor() {
        super()
    }
    draw(): void {
        console.log('drawing a circle');
    }
}

class Square1 extends Shape1 {
    constructor() {
        super()
    }
    draw(): void {
        console.log('drawing a square ');
    }
}

const arr: Shape1[] = [
    new Shape1,
    new Triangle,
    new Square1,
    new Circle
]
function renderShapes(arr: Shape1[]): void {
    for (const shape of arr) {
        shape.draw()
    }
}
renderShapes(arr)














