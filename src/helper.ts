/**
 * setTimeout async wrapper
 * @param ms sleep timeout
 */
import axios from "axios";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * random method
 * @param min
 * @param max
 * @param pon random positive or negative
 */
function _rd(min: number, max: number, pon = false): number {
    const c = max - min + 1;
    return Math.floor(Math.random() * c + min) * (pon ? _pon() : 1)
}

function _arrRd(arr: Array<any>) {
    if (!arr || !arr.length) {
        return null
    }

    return arr[_rd(0, arr.length - 1)]
}

/**
 * positive or negative
 */
function _pon(): number {
    return _rd(0, 10) >= 5 ? 1 : -1
}

function inMac() {
    return process.platform == 'darwin';
}

function inLinux() {
    return process.platform == 'linux';
}

function inWindow() {
    return process.platform == 'win32';
}

async function waitFor<T>(func: () => T, timeout: number): Promise<T | null> {
    let startTime = new Date().getTime()
    for (; ;) {
        const result: T = await func()
        if (result) {
            return result
        }

        if (new Date().getTime() - startTime > timeout) {
            return null
        }

        await sleep(100)
    }
}

function myRealExportIP(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        axios.get('https://httpbin.org/ip').then(response => {
            resolve(response.data.origin)
        }).catch(ex => {
            reject(ex)
        })
    })
}

export const helper = {
    sleep,
    rd: _rd,
    arrRd: _arrRd,
    pon: _pon,
    inMac,
    inLinux,
    inWindow,
    waitFor,
    myRealExportIP,
}
