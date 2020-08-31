import * as React from "react";
import * as Echarts from "echarts";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import {EChartOption} from "echarts";
import {ArtefactgraphResponse} from "../../Domain/Model/Backend/ChartArtefactgraph/ArtefactgraphResponse";
import {ArtefactgraphFilter} from "../../Domain/Model/Backend/ChartArtefactgraph/ArtefactgraphFilter";


export const ArtifactGraphChart : React.FC = () => {

    const CHARTID = "artifactGraph";

    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);

    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

    let [maxChildNodeCount, setMaxChildNodeCount] = useState<number>(10);
    let [tmpMaxChildNodeCount, setTmpMaxChildNodeCount] = useState<number>( 10);

    const [myGraphChart, setMyGraphChart] = useState<Echarts.ECharts>(null);
    const options : EChartOption = {
        title: {
            text: "Artefact Graph",
            subtext: "Complete Content Of the Repository",
            top: 'bottom',
            left: 'right'
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                name: "Artefact Graph",
                type: "graph",
                layout: "force",
                data: nodeList,
                links: edgeList,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                },
                label: {
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                }
            }
        ]
    }

    const artefactGraphfilter = new ArtefactgraphFilter();
    artefactGraphfilter.maxChildCount = maxChildNodeCount;

    useEffect(() => {
        CommunicationService.getInstance().getArtifactgraph(artefactGraphfilter).then((value: ArtefactgraphResponse) => {
            setNodeList(value.data.artefactgraphNodeList);
            setEdgeList(value.data.artefactgraphEdgeList);
        });
    }, [maxChildNodeCount]);

    const updateDataInChart = () => {
        if (myGraphChart) {
            nodeList.forEach((node) => {
                node.label = {
                    show: true,
                    position: "inside",
                    distance: 20,
                    fontSize: 14
                }
            });
            myGraphChart.on("click", callbackForECharts)
            myGraphChart.setOption(options);
        }
    }

    const callbackForECharts = (params : any) => {
        if (params.componentType === 'series') {
            if (params.seriesType === 'graph') {
                if (params.dataType === 'node') {
                    console.log("Knoten angeklickt...", params);
                    CommunicationService.getInstance().updateArtifactgraphOnNodeID(params.data.id, maxChildNodeCount).then((value: ArtefactgraphResponse) => {
                        setNodeList(value.data.artefactgraphNodeList);
                        setEdgeList(value.data.artefactgraphEdgeList);
                    });
                }
            }
        }
    }

    const showArtefactGraph = () => {
        setIsButtonClicked(true);
    }

    useEffect(() => {
        initializeECharts();
    }, [isButtonClicked]);

    function initializeECharts() {
        if (isButtonClicked) {
            document.getElementById(CHARTID).style.height = "800px";
            setMyGraphChart(Echarts.init(document.getElementById(CHARTID) as HTMLDivElement));
        }
    }

    useEffect(() => {
        updateDataInChart();
        return () => {
            if (myGraphChart) {
                myGraphChart.off("click");
            }
        }
    }, [myGraphChart, edgeList])

    const saveNewMaxChildNodeCountInState = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newChildCountLimit = (event.target.validity.valid) ? (parseInt(event.target.value) | 0) : maxChildNodeCount;
        setTmpMaxChildNodeCount(newChildCountLimit);
    }

    const renderArtifactGraphWithNewFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setMaxChildNodeCount(tmpMaxChildNodeCount);
        }
    }

    return (
        <div className={"row"}>
            <div className="col-12">
                {
                    !isButtonClicked ?
                        <button onClick={showArtefactGraph} className={"btn btn-primary"}>
                            Show Artefact Graph
                        </button> :
                        <div className={"row"}>
                            <div id={CHARTID} className="col-10" />
                            <div className="col-2">
                                <label>
                                    Child Count Limit:
                                    <input type="text" pattern="[0-9]*" value={tmpMaxChildNodeCount} onChange={saveNewMaxChildNodeCountInState} onKeyDown={renderArtifactGraphWithNewFilter} />
                                </label>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}
