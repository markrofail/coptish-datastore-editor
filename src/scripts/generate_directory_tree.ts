import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Command } from "commander";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "../../assets/coptish-datastore");

interface Directory {
    id: string;
    name: string;
    title?: { [key: string]: string };
    children?: Directory[];
    path: string;
}

function traverseDirectory(dirPath: string): Directory {
    const dirName = path.basename(dirPath); // Get the directory name
    const relativePath = path.relative(ROOT_DIR, dirPath);
    const directory: Directory = { id: uuidv4(), name: dirName, path: relativePath };

    try {
        const entries = fs.readdirSync(dirPath);

        const children: Directory[] = [];
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry);
            const fileRelativePath = path.relative(ROOT_DIR, fullPath);

            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                children.push(traverseDirectory(fullPath));
            } else if (path.basename(entry) === "index.yml") {
                const fileContent = parse(fs.readFileSync(fullPath, "utf-8"));
                directory.title = fileContent?.title;
            } else if (path.extname(entry) === ".yml") {
                const fileContent = parse(fs.readFileSync(fullPath, "utf-8"));
                children.push({ id: uuidv4(), name: entry, path: fileRelativePath, title: fileContent?.title });
            }
        }

        if (children.length > 0) directory.children = children;
    } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
        // Handle error as needed, e.g., return an empty directory or throw the error
        // For this example, we'll just log the error and continue
    }

    return directory;
}

function generateJsonFile(dirPath: string, outputPath: string) {
    const directoryStructure = traverseDirectory(dirPath);

    try {
        const jsonData = JSON.stringify(directoryStructure, null, 2);
        fs.writeFileSync(outputPath, jsonData, "utf-8");
        console.log(`JSON file generated successfully at ${outputPath}`);
    } catch (err) {
        console.error(`Error writing JSON file:`, err);
    }
}

const program = new Command();
program
    .argument("<input file or directory>", "either a file or directory to process")
    .requiredOption("-o, --output <output file>", "output file path")
    .parse(process.argv);

const [inputFile] = program.args;
const rootDirectory = path.resolve(inputFile);
if (!fs.existsSync(rootDirectory)) {
    program.error(`Input file does not exist "${inputFile}"`);
}

const { output } = program.opts();
const outputFilePath = path.resolve(output);

generateJsonFile(rootDirectory, outputFilePath);
