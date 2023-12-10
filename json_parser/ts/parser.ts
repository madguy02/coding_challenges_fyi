import { ASTNode, Token } from "./types";

export function parser(token: Token[]) {

    let current = 0;
    
    function jumpOne() {
        return token[++current];
    }

    function parseValue(): ASTNode {
        const t = token[current];

        switch(t.type) {
            case "String":
                return {type: "String", value: t.value};
            case "Number":
                return {type: "Number", value: Number(t.value)};
            case "True":
                return {type: "Boolean", value: true};
            case "False":
                return {type: "Boolean", value: false};
            case "BraceOpen":
                return parseObject();
            default:
                throw new Error(`Unexpected token type: ${t.type}`);

        }
    }

    function parseObject() {
        const node: ASTNode = { type: "Object", value: {}};
        let token = jumpOne();

        while (token.type !== "BraceClose") {
            if (token.type === "String") {
                const key = token.value;
                token = jumpOne();

                if (token.type !== "Colon") {
                    throw new Error(`Expected : in key-value pair`);
                }
                
                token = jumpOne();
                const value = parseValue();
                node.value[key] = value;

            } else {
                throw new Error(`Expected string key in object. Token type: ${token.type}`);
            }

            token = jumpOne();

            if (token.type === "Comma") {
                token = jumpOne();
            }
        }

        return node;
    }

    const AST = parseValue();
    console.log(AST);

    return AST;

}