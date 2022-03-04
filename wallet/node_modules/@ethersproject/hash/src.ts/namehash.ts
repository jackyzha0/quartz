import { concat, hexlify } from "@ethersproject/bytes";
import { nameprep, toUtf8Bytes } from "@ethersproject/strings";
import { keccak256 } from "@ethersproject/keccak256";

import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

const Zeros = new Uint8Array(32);
Zeros.fill(0);

const Partition = new RegExp("^((.*)\\.)?([^.]+)$");

export function isValidName(name: string): boolean {
    try {
        const comps = name.split(".");
        for (let i = 0; i < comps.length; i++) {
            if (nameprep(comps[i]).length === 0) {
                throw new Error("empty")
            }
        }
        return true;
    } catch (error) { }
    return false;
}

export function namehash(name: string): string {
    /* istanbul ignore if */
    if (typeof(name) !== "string") {
        logger.throwArgumentError("invalid ENS name; not a string", "name", name);
    }

    let current = name;
    let result: string | Uint8Array = Zeros;
    while (current.length) {
        const partition = current.match(Partition);
        if (partition == null || partition[2] === "") {
            logger.throwArgumentError("invalid ENS address; missing component", "name", name);
        }
        const label = toUtf8Bytes(nameprep(partition[3]));
        result = keccak256(concat([result, keccak256(label)]));

        current = partition[2] || "";
    }

    return hexlify(result);
}

