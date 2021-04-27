# Time Series Archive
A set of time series for various asset classes such as
crypto, forex or commodities.

## Structure
Time series are stored in the `series` folder, follows the archive structure,

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
