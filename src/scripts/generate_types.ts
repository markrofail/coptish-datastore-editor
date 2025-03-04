// generate-types.ts (TypeScript Code)
import { compile } from "json-schema-to-typescript";
import * as fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateTypes({
    schemaPath,
    outputPath,
    rootTypeName,
}: {
    schemaPath: string;
    outputPath: string;
    rootTypeName: string;
}) {
    try {
        const schema = JSON.parse(await fs.readFile(join(__dirname, schemaPath), "utf-8"));
        const ts = await compile(schema, rootTypeName);

        // 1. Write the generated TypeScript interfaces to a file:
        await fs.writeFile(join(__dirname, outputPath), ts);

        // 2. Extract and generate enums (post-processing):
        const enums = extractEnums(schema);
        const enumDeclarations = enums.map(createEnumDeclaration).join("\n\n");
        await fs.appendFile(join(__dirname, outputPath), `\n\n${enumDeclarations}`);

        console.log("Types and enums generated successfully!");
    } catch (error) {
        console.error("Error generating types:", error);
    }
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function extractEnums(schema: any, key: string = "", enums: any[] = []): any[] {
    if (schema.enum) {
        enums.push({ ...schema, propertyName: key }); // Store the entire schema fragment with the enum
    }

    if (typeof schema === "object") {
        for (const key in schema) {
            extractEnums(schema[key], key, enums);
        }
    }
    return enums;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function createEnumDeclaration(enumSchema: any): string {
    const enumName = `${enumSchema.propertyName}Enum`; //Better naming strategy
    if (!enumName) {
        throw new Error("Enum needs a title or to be a property to have a name");
    }
    const values = enumSchema.enum;

    //Handle mixed types more carefully
    const members = values
        .map((value: string) => {
            return `${JSON.stringify(pascalCase(value))} = ${JSON.stringify(value)},`;
        })
        .join("\n  ");

    return `export enum ${enumName} {\n  ${members}\n}`;
}

function pascalCase(str: string): string {
    return str
        .replace(/[^a-zA-Z0-9_$]/g, " ") // Replace invalid chars with spaces
        .split(" ") // Split into words
        .filter((word) => word.length > 0) // Remove empty words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and lowercase the rest
        .join(" "); // Join the words
}

generateTypes({
    schemaPath: "../../assets/coptish-datastore/schemas/raw_schema.json",
    outputPath: "../types.ts",
    rootTypeName: "Root",
});
