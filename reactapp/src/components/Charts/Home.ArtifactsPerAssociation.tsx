import * as React from "react";
import * as Echarts from "echarts";
import { EChartOption } from "echarts";
import {useEffect, useState} from "react";
import {CommunicationService} from "../../services/CommunicationService";
import {NumberOfArtifactsResponse} from "../../Domain/Model/Backend/ChartArtifactsPerAssociation/NumberOfArtifactsResponse";

export const ArtifactsPerAssociation : React.FC = () => {

    const [artifactsPerAssociation, setArtifactsPerAssociation] = useState<AssociationArtifactsModel[]>([]);

    useEffect(() => {
        CommunicationService.getInstance().getNumberOfArtifactsPerAssociation().then(
            (listOfNumberOfArtifactsPerAssociation: NumberOfArtifactsResponse) => {
                setArtifactsPerAssociation(
                    listOfNumberOfArtifactsPerAssociation.data
                );
            });
    }, []);

    const CHARTID = "artifactsperassociation";

    function setPieChartInHTML() {
        //Handling der Daten, damit diese in das entsprechende Format für die Charts passen...
        let dataValueForChart: any[] = [];
        let legendAssociationIDs : string[] = [];
        artifactsPerAssociation.forEach((numberOfArtifactsPerAssociation: AssociationArtifactsModel) => {
            dataValueForChart.push({
                value: numberOfArtifactsPerAssociation.numberOfArtifacts,
                name: numberOfArtifactsPerAssociation.associationID
            });
            legendAssociationIDs.push(numberOfArtifactsPerAssociation.associationID);
        });
        document.getElementById(CHARTID).style.height = "400px";

        let myPieChart = Echarts.init(document.getElementById(CHARTID) as HTMLDivElement);

        let options : EChartOption = {
            title: {
                text: 'Artifacts per Association',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legendAssociationIDs
            },
            series: [
                {
                    name: 'PieChart',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: dataValueForChart,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        myPieChart.setOption(options);
    }

    return (
        <button className={"btn btn-primary"} onClick={setPieChartInHTML}>
            show Piechart for Artifacts per Association
        </button>
    );
};