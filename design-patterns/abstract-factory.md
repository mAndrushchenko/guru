# Abstract Factory Design Pattern

- Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.

## Problem

You need a way to create individual products so that they match other products of the same family. Clients get quite mad when they receive non-matching products. Also, you don’t want to change existing code when adding new products or families of products to the program, because you add them very often, and you wouldn’t want to change the core code each time it happens.

## Usage

The Abstract Factory pattern is pretty common in TypeScript code. Many frameworks and libraries use it to provide a way to extend and customize their standard
components.

## Identification

The pattern is easy to recognize by methods, which return a factory object. Then, the factory is used for creating specific sub-components.

## Example

```typescript
/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface AbstractFactory {
  createChair(): AbstractChair;

  createSofa(): AbstractSofa;
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class VictorianFurnitureFactory implements AbstractFactory {
  public createChair(): AbstractChair {
    return new VictorianChair();
  }

  public createSofa(): AbstractSofa {
    return new VictorianSofa();
  }
}

/**
 * Each Concrete Factory has a corresponding product variant.
 */
class ModernFurnitureFactory implements AbstractFactory {
  public createChair(): AbstractChair {
    return new ModernChair();
  }

  public createSofa(): AbstractSofa {
    return new ModernSofa();
  }
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface AbstractChair {
  sitOn(): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class VictorianChair implements AbstractChair {
  public sitOn(): string {
    return 'Sit on the Victorian Chair.';
  }
}

class ModernChair implements AbstractChair {
  public sitOn(): string {
    return 'Sit on the Modern Chair.';
  }
}

/**
 * Here's the the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
interface AbstractSofa {
  /**
   * Sofa is able to do its own thing...
   */
  layOn(): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class VictorianSofa implements AbstractSofa {
  public layOn(): string {
    return 'Lay on the Victorian Sofa.';
  }
}

class ModernSofa implements AbstractSofa {
  public layOn(): string {
    return 'Lay on the Modern Sofa.';
  }
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: AbstractFactory) {
  const chair = factory.createChair();
  const sofa = factory.createSofa();

  console.log(sofa.layOn());
}

/**
 * The client code can work with any concrete factory class.
 */
console.log('Client: Testing client code with the first factory type...');
clientCode(new VictorianFurnitureFactory());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ModernFurnitureFactory());
```
