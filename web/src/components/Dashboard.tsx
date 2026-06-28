import { Reading } from "./Reading"
import { Header } from "./Header"
import { AdminBar } from "./AdminBar"

const DashboardMode = import.meta.env.VITE_DASHBOARD_MODE ?? "display";

export const Dashboard = () => {

    if (DashboardMode === "admin") {
        return (
            <div className="h-dvh grid grid-rows-[auto_auto_minmax(0,1fr)]">
                <div className="flex flex-row w-full p-[1vh] border">
                    <Header/>
                </div>
                <div className="flex flex-row w-full p-[1vh] justify-center items-center pt-[4vh] gap-4">                
                    <div className="w-1/2 flex flex-row justify-between items-center">
                        <AdminBar/>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-[1vh] p-[2vh] min-h-0">
                    <Reading title="Temperature"    data_reading="temperature"      sensor="BME280"      unit="°C"      conversions={new Map([
                        ["°C", (val) => {return val}],
                        ["°F", (val) => {return ((val)*(9/5) + 32)}]
                    ])}/>
                    <Reading title="Humidity"       data_reading="humidity"         sensor="BME280"      unit="%"/>
                    <Reading title="Pressure"       data_reading="pressure"         sensor="BME280"      unit="hPa"/>   
                    <Reading title="Wind Speed"     data_reading="wind_speed"       sensor="SEN15901"    unit="MPH"/>
                    <Reading title="Wind Direction" data_reading="wind_direction"   sensor="SEN15901"    unit="°"/>
                    <Reading title="Precipitation"  data_reading="precipitation"    sensor="SEN15901"    unit="mm/h"    conversions={new Map([
                        ["in/h", (val) => {return (val/25.4)}],
                        ["mm/h", (val) => {return val}]
                    ])}/>
                    <Reading title="eCO2"            data_reading="eco2"              sensor="SGP30"     unit="ppm"/>
                    <Reading title="tVOC"            data_reading="tvoc"              sensor="SGP30"     unit="ppb"/>
                </div>
            </div>
        )
    }

    return (
        <div className="h-dvh grid grid-rows-[auto_minmax(0,1fr)]">
            <div className="flex flex-row w-full p-[1vh] border">
                <Header/>
            </div>
            <div className="grid grid-cols-4 gap-[1vh] p-[2vh] min-h-0">
                <Reading title="Temperature"    data_reading="temperature"      sensor="BME280"      unit="°C"      conversions={new Map([
                    ["°C", (val) => {return val}],
                    ["°F", (val) => {return ((val)*(9/5) + 32)}]
                ])}/>
                <Reading title="Humidity"       data_reading="humidity"         sensor="BME280"      unit="%"/>
                <Reading title="Pressure"       data_reading="pressure"         sensor="BME280"      unit="hPa"/>   
                <Reading title="Wind Speed"     data_reading="wind_speed"       sensor="SEN15901"    unit="MPH"/>
                <Reading title="Wind Direction" data_reading="wind_direction"   sensor="SEN15901"    unit="°"/>
                <Reading title="Precipitation"  data_reading="precipitation"    sensor="SEN15901"    unit="mm/h"    conversions={new Map([
                    ["in/h", (val) => {return (val/25.4)}],
                    ["mm/h", (val) => {return val}]
                ])}/>
                <Reading title="eCO2"            data_reading="eco2"              sensor="SGP30"     unit="ppm"/>
                <Reading title="tVOC"            data_reading="tvoc"              sensor="SGP30"     unit="ppb"/>
            </div>
        </div>      
    ) 

}