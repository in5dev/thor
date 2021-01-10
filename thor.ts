import Interpreter from './interpreter.ts';
import Lexer from './lexer.ts';
import Parser from './parser.ts';
import Scope from './scope.ts';
import Value, { BuiltInFunction, Number } from './values.ts';

const globalScope = new Scope('<program>');
globalScope.symbolTable.set('PI', new Number(Math.PI));
globalScope.symbolTable.set('TAU', new Number(Math.PI * 2));
globalScope.symbolTable.set('print', new BuiltInFunction('print'));

export default function run(
  text: string,
  { logTokens = false, logAST = false } = {}
): Value | undefined {
  try {
    const lexer = new Lexer(text);
    const tokens = lexer.lex();
    if (logTokens)
      console.log(
        'tokens:',
        `[
  ${tokens.join(',\n  ')}
]`,
        '\n'
      );

    const parser = new Parser(tokens);
    const ast = parser.parse();
    if (!ast) return;
    if (logAST) console.log('ast:', ast.toString(), '\n');

    const interpreter = new Interpreter();
    const value = interpreter.visit(ast, globalScope);
    return value;
  } catch (e) {
    console.error('Error:', e);
  }
}
