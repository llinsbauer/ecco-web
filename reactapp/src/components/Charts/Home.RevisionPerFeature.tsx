import * as React from "react";
import * as Echarts from "echarts";
import { EChartOption } from "echarts";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import { RevisionsPerFeatureResponse } from "../../Domain/Model/Backend/ChartRevisionsPerFeature/RevisionsPerFeatureResponse";
import {NumberRevisionsPerFeature} from "../../Domain/Model/Backend/ChartRevisionsPerFeature/NumberRevisionsPerFeature";

export const RevisionPerFeature : React.FC = () => {

    const [numberOfRevisionsPerFeature, setNumberOfRevisionsPerFeature] = useState<NumberRevisionsPerFeature[]>([]);

    useEffect(() => {
        CommunicationService.getInstance().getNumberOfRevisionsPerFeature().then((numberOfRevisionsPerFeature: RevisionsPerFeatureResponse) => {
            setNumberOfRevisionsPerFeature(numberOfRevisionsPerFeature.data);
        });
    }, [])

    const CHARTID = "revisionperfeature";

    function showPieChartForRevisionsPerFeature() {

        let dataValues : any[] = [];
        let legendData : string[] = [];
        numberOfRevisionsPerFeature.forEach((tmpNumberRevisionsPerFeature: NumberRevisionsPerFeature) => {
            dataValues.push({
                value: tmpNumberRevisionsPerFeature.numberRevisions,
                name: tmpNumberRevisionsPerFeature.featureName
            });
            legendData.push(tmpNumberRevisionsPerFeature.featureName);
        });

        document.getElementById(CHARTID).style.height = "400px";

        let myPieChart = Echarts.init(document.getElementById(CHARTID) as HTMLDivElement);

        let options : EChartOption = {
            title: {
                text: 'Number Revisions per Feature',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                    left: 'left',
                    data: legendData
            },
            series: [
                {
                    name: 'Number of Revisions',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: dataValues,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        myPieChart.setOption(options);
    }

    return (
        <button onClick={showPieChartForRevisionsPerFeature} className={"btn btn-primary"}>
            show PieChart For Revisions Per Feature
        </button>
    );
}