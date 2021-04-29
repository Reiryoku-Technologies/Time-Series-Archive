const path = require("path");
const fs = require("fs");

class TimeSeriesArchive {
    static getTicksPath ({ symbol, year, month, }) {
        const sanitizedMonth = month < 10 ? `0${month}` : month;

        return path.resolve(__dirname, `../series/${symbol.toUpperCase()}/ticks/${year}/${sanitizedMonth}.csv`);
    }

    static async hasTicks ({ symbol, year, month, }) {
        return new Promise((resolve) => {
            fs.access(TimeSeriesArchive.getTicksPath({ symbol, year, month, }), fs.constants.F_OK, (error) => resolve(!error));
        });
    }

    static async getTicks ({ symbol, year, month, }) {
        return new Promise((resolve, reject) => {
            fs.readFile(TimeSeriesArchive.getTicksPath({ symbol, year, month, }), "utf8", (error, descriptor) => {
                if (error) {
                    reject(error);

                    return;
                }

                resolve(TimeSeriesArchive.parseTicks(descriptor));
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
}

module.exports = {
    TimeSeriesArchive,
};
