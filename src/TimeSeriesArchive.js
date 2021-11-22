const path = require("path");
const fs = require("fs");

class TimeSeriesArchive {
    static #sourcePath;

    static setSourcePath (path) {
        TimeSeriesArchive.#sourcePath = path;
    }

    static getTicksPath ({ symbol, year, month, }) {
        const sanitizedMonth = month < 10 ? `0${month}` : month;

        return path.resolve(__dirname, `../series/${symbol.toUpperCase()}/ticks/${year}/${sanitizedMonth}.csv`);
    }

    static getPeriodsPath ({ symbol, year, timeframe, }) {
        return path.resolve(__dirname, `../series/${symbol.toUpperCase()}/periods/${year}/${timeframe}.csv`);
    }

    static async hasTicks ({ symbol, year, month, }) {
        return new Promise((resolve) => {
            fs.access(TimeSeriesArchive.getTicksPath({ symbol, year, month, }), fs.constants.F_OK, (error) => resolve(!error));
        });
    }

    static async hasPeriods ({ symbol, year, timeframe, }) {
        return new Promise((resolve) => {
            fs.access(TimeSeriesArchive.getPeriodsPath({ symbol, year, timeframe, }), fs.constants.F_OK, (error) => resolve(!error));
        });
    }

    static async getTicks ({ symbol, year, month, }) {
        return new Promise((resolve) => {
            fs.readFile(TimeSeriesArchive.getTicksPath({ symbol, year, month, }), "utf8", (error, descriptor) => {
                if (error) {
                    resolve(undefined);

                    return;
                }

                resolve(TimeSeriesArchive.parseTicks(descriptor));
            });
        });
    }

    static async getPeriods ({ symbol, year, timeframe, }) {
        return new Promise((resolve) => {
            fs.readFile(TimeSeriesArchive.getPeriodsPath({ symbol, year, timeframe, }), "utf8", (error, descriptor) => {
                if (error) {
                    resolve(undefined);

                    return;
                }

                resolve(TimeSeriesArchive.parsePeriods(descriptor));
            });
        });
    }

    static parseTicks (plainTicks) {
        const ticks = [];

        for (const plainTick of plainTicks.split("\n")) {
            const parts = plainTick.split(",");

            ticks.push({
                date: new Date(Number.parseInt(parts[0])),
                bid: Number.parseFloat(parts[1]),
                ask: Number.parseFloat(parts[2]),
            });
        }

        return ticks;
    }

    static parsePeriods (plainPeriods) {
        const periods = [];

        for (const plainPeriod of plainPeriods.split("\n")) {
            const parts = plainPeriod.split(",");

            periods.push({
                date: new Date(Number.parseInt(parts[0])),
                open: Number.parseFloat(parts[1]),
                high: Number.parseFloat(parts[2]),
                low: Number.parseFloat(parts[3]),
                close: Number.parseFloat(parts[4]),
                volume: Number.parseFloat(parts[5]),
            });
        }

        return periods;
    }
}

module.exports = {
    TimeSeriesArchive,
};
