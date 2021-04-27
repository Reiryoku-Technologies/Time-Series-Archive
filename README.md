# Time Series Archive
A set of time series for various asset classes such as
crypto, forex or commodities.

Furthermore, this project is also a NPM module that can be used to read and parse the time series through Node.js,
if you are interested only in the time series, or if you want to use them through another language (for example Python),
then just download the `series` folder and follow the indicated format when parsing.

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
The format used for ticks and periods.

### Ticks
The ticks CSV format.

```
DATE, BID, ASK
```

### Periods
The periods CSV format.

```
DATE, OPEN, HIGH, LOW, CLOSE, VOLUME
```
