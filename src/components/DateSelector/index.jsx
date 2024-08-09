import React, { useState, useMemo } from 'react';

export function DateSelector(props) {
    const [year, setYear] = useState(1900);
    
    const allYears = useMemo(() => new Array(3000).fill(0, 0, 3000).map((x, i) => i + 1900), []);
    const allDates = useMemo(() => {
        return new Array(365).fill(0, 0, 365).map((x, i) => {
            const date = new Date();
            date.setYear(year);
            date.setMonth(0);
            date.setDate(1);
            date.setDate(date.getDate() + i);
            return date;
        })
    }, [year]);
    return(
        <div>
            <select {...props} disabled={!allDates?.length || props.disabled}>
                {allDates && allDates.map(x => (
                    <option value={x.toDateString()}>{x.toDateString().replace(year.toString(), "")}</option>
                ))}
            </select>
            <select disabled={props.disabled} defaultValue={0} onChange={(e) => setYear(parseInt(e.target.value))}>
                {allYears.map(x => (
                    <option value={x}>{x}</option>
                ))}
            </select>
        </div>
    )
} 