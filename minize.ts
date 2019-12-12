import { writeFileSync } from "fs";

export const minize = (data: any, path: string) => writeFileSync(path, JSON.stringify(data));

export default minize;