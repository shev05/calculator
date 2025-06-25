export const Mathematic = (expression: string): number => {
    const expr = expression.replace(/\s+/g, '');
  
    const getPriority = (op: string): number => {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        if (op === '%' || op==='√' || op === '^') return 3;
        if (op === 'u-') return 4;  
        return 0;
    };

    const applyOp = (op: string, a: number, b?: number): number => {
        switch (op) {
            case '+': return a + b!;
            case '-': return a - b!;
            case '*': return a * b!;
            case '/': return a / b!;
            case '%': return a / 100;
            case '!': return factorial(a);
            case '^': return a ** b!;
            case '√': return b! ** (1 / a);
            case 'u-': return -a; 
            default: return 0;
        }
    };

    const factorial = (n: number): number => {
        if (n < 0) return NaN; 
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    };

    const values: number[] = [];
    const ops: string[] = [];

    for (let i = 0; i < expr.length; i++) {
        const c = expr[i];
        
        if (/\d/.test(c)) {
            let numStr = '';
            while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
                numStr += expr[i++];
            }
            i--;
            values.push(parseFloat(numStr));
        }
        else if (c === '-' && (i === 0 || expr[i-1] === '(' || ['+','-','*','/','^'].includes(expr[i-1]))) {
            ops.push('u-');
        }
        else if (c === '(') {
            ops.push(c);
        }
        else if (c === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                applyOperation();
            }
            ops.pop(); 
        }
        else if (['+', '-', '*', '/', '%', '!', '^', '√'].includes(c)) {
            while (
                ops.length > 0 &&
                ops[ops.length - 1] !== '(' &&
                getPriority(ops[ops.length - 1]) >= getPriority(c)
            ) {
                applyOperation();
            }
            ops.push(c);
        }
    }
    while (ops.length > 0) {
        applyOperation();
    }

    function applyOperation() {
        const op = ops.pop()!;
        if (op === '%' || op === '!' || op === 'u-') {
            const a = values.pop()!;
            values.push(applyOp(op, a));
        } else {
            const b = values.pop()!;
            const a = values.pop()!;
            values.push(applyOp(op, a, b));
        }
    }

    return values.pop()!;
};