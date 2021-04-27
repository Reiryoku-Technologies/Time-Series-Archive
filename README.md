# Time Series Archive
A set of time series for various asset classes such as
crypto, forex or commodities.

This project is also a NPM module: it can be used to read and parse the time series through Node.js.
If you are interested only in the time series, or if you want to use another language (for example Python),
then just download the `series` folder.

## Structure
Time series are stored in the `series` folder, follows the archive structure.
```
series
    {symbol}
        ticks
            {year}
                {month}.csv
        periods
            {timeframe}.csv
```

## Format
All ticks and periods are stored in CSV files.

### Ticks
The ticks format.
```
DATE, BID, ASK
```

### Periods
The periods format.
```
DATE, OPEN, HIGH, LOW, CLOSE, VOLUME
```

## NPM Installation
The easiest way to install the Time Series Archive is using the following command in your NPM project directory.
```console
npm install @reiryoku/time-series-archive
```
