import * as React from "react";
import * as Echarts from "echarts";
import {EChartOption} from "echarts";
import {useEffect, useState} from "react";
import {CommunicationService} from "../../services/CommunicationService";
import {NumberOfModulesResponse} from "../../Domain/Model/Backend/ChartModulesPerOrder/NumberOfModulesResponse";
import {NumberModulesPerOrder} from "../../Domain/Model/Backend/ChartModulesPerOrder/NumberModulesPerOrder";

export const ModulesPerOrder : React.FC = () => {

    const [numberOfModules, setNumberOfModules] = useState<NumberModulesPerOrder[]>([]);

    useEffect(() => {
        CommunicationService.getInstance().getNumberOfModules().then((response: NumberOfModulesResponse) => {
            setNumberOfModules(response.data);
        });
    },  []);

    const CHARTID = "modulesperorder";

    function setModulesPerOrderChart() {
        document.getElementById(CHARTID).style.height = "400px";
        let xAxisData : number[] = [];
        let yAxisData : number[] = [];
        numberOfModules.forEach((numberOfModuleObject: NumberModulesPerOrder) => {
            xAxisData.push(numberOfModuleObject.moduleOrder);
            yAxisData.push(numberOfModuleObject.numberOfModules);
        });
        let myBarChart = Echarts.init(document.getElementById(CHARTID) as HTMLDivElement);
        let options : EChartOption = {
            title: {
                text: 'Modules per Order',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>Order {b} : {c} Modules'
            },
            legend: {
                left: 'left',
                data: [
                    'artifactsperdepth'
                ]
            },
            xAxis: {
                name: "Moduleorder",
                type: 'category',
                data: xAxisData
            },
            yAxis: {
                name: "Number of Modules",
                type: 'value'
            },
            series: [{
                name: "Modules per Order",
                data: yAxisData,
                type: 'bar'
            }]
        };

        myBarChart.setOption(options);
    }

    return (
        <button className={"btn btn-primary"} onClick={setModulesPerOrderChart} >
            Show Modules per Order Diagramm
        </button>
    );

}