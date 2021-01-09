import { BinaryOp, UnaryOp } from './token.ts';

export default abstract class Node {
  abstract toString(): string;
}

export class NumberNode implements Node {
  constructor(public value: number) {}

  toString() {
    return this.value.toString();
  }
}

export class IdentifierNode implements Node {
  constructor(public name: string) {}

  toString() {
    return this.name;
  }
}

export class AssignmentNode implements Node {
  constructor(public identifier: string, public node: Node) {}

  toString() {
    return `(${this.identifier} = ${this.node})`;
  }
}

export class UnaryOpNode implements Node {
  constructor(public node: Node, public operator: UnaryOp) {}

  toString() {
    return `(${this.operator}${this.node})`;
  }
}

export class BinaryOpNode implements Node {
  constructor(
    public left: Node,
    public operator: BinaryOp,
    public right: Node
  ) {}

  toString() {
    return `(${this.left} ${this.operator} ${this.right})`;
  }
}

export class StatementsNode implements Node {
  constructor(public nodes: Node[]) {}

  toString() {
    return `${this.nodes.join(',\n')}`;
  }
}

export class FuncDefNode implements Node {
  constructor(
    public name: string,
    public argNames: string[],
    public body: StatementsNode
  ) {}

  toString() {
    return `(fn ${this.name}(${this.argNames.join(', ')}) {
  ${this.body}
})`;
  }
}

export class FuncCallNode implements Node {
  constructor(public name: string, public args: Node[]) {}

  toString() {
    return `(${this.name}(${this.args.join(', ')}))`;
  }
}

export class ReturnNode implements Node {
  constructor(public node: Node) {}

  toString() {
    return `(return ${this.node})`;
  }
}
