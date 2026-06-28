import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

import { useWebSocket } from "@/context/SocketContext"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 

type ReadingProps = {
    title: string,
    unit: string,
    data_reading: string,
    sensor: string,
    conversions?: Map<string, (val: number) => number>
}

export const Reading = (props: ReadingProps) => {
    const {isConnected, subscribe} = useWebSocket()
    const [rawDataReading, setRawData] = useState<number | null>(null)
    const [displayedDataReading, setDisplayedData] = useState<number | null>(null)
    const [currentUnit, setUnit] = useState(props.conversions?.keys().next().value ?? props.unit)

    const textToShow = ((displayedDataReading !== null && isConnected) ? displayedDataReading.toFixed(2) : "---")


    useEffect(() => {
        const unsubReading = subscribe("probe_data", (payload) => {
            const value = payload?.[props.data_reading];
            if (value !== undefined) {
                const convfn = props.conversions?.get(currentUnit)
                if (convfn) {
                    setDisplayedData(convfn(value));
                } else {
                    setDisplayedData(value);
                }

                setRawData(value)
            }
        });

        return () => unsubReading();
    }, [subscribe, props.data_reading, currentUnit]);


    const updateUnit = (value:string) => {
        setUnit(value)
        const convfn = props.conversions?.get(value)
        if (rawDataReading !== null) {
            if (convfn) {
                setDisplayedData(convfn(rawDataReading))
            } else {
                setDisplayedData(rawDataReading)
            }
        }
    }

    console.log("isConnected:", isConnected)

    if (props.conversions) {
        return (    
            <Card className="w-full flex flex-col gap-0 overflow-hidden">
                <CardHeader className="pb-0 relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b shrink-0">
                    <div />
                    <CardTitle className="text-center truncate">
                        {props.title} ({currentUnit})
                    </CardTitle>

                    <div className="flex justify-end">
                        <Select value={currentUnit} onValueChange={updateUnit}>
                            <SelectTrigger className="w-auto h-7 rounded-lg" aria-label="Select a unit">
                                <SelectValue placeholder={props.conversions.keys().next().value ?? "Select a unit"} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {Array.from(props.conversions.keys()).map((unit) => (
                                    <SelectItem key={unit} value={unit} className="rounded-lg">
                                        {unit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col items-center justify-center px-6 py-4 min-h-0 w-full overflow-hidden">
                    <p className="text-[clamp(1.25rem,6vw,2.5rem)] text-center break-all whitespace-normal tracking-tight leading-tight w-full max-w-full">
                        {textToShow}
                    </p>
                    <p className="text-center text-sm text-muted-foreground mt-1 break-words w-full">{props.sensor}</p>
                </CardContent>
            </Card>
        )
    }

    return (    
        <Card className="w-full flex flex-col gap-0 overflow-hidden">
            <CardHeader className="flex items-center border-b min-h-0 shrink-0">
                <CardTitle className="text-center w-full break-words">{props.title} ({props.unit})</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col items-center justify-center px-6 py-4 min-h-0 w-full overflow-hidden">
                <p className="text-[clamp(1.25rem,6vw,2.5rem)] text-center break-all whitespace-normal tracking-tight leading-tight w-full max-w-full">
                    {textToShow}
                </p>
                <p className="text-center text-sm text-muted-foreground mt-1 break-words w-full">{props.sensor}</p>
            </CardContent>
        </Card>
    )
}