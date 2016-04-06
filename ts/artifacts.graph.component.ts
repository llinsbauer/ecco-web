import {Component, ElementRef, ViewChild} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {RouteParams, CanReuse, ComponentInstruction} from 'angular2/router';

declare var d3: any;

interface Node {
    id: number;
    associationId: number;
    numArtifacts: number;
    depth: number;
    label: string;
}

interface Edge {
    source: number;
    target: number;
}

interface Graph {
    numNodes: number;
    maxNumArtifacts: number;
    maxDepth: number;
    nodes: Node[];
    edges: Edge[];
}

@Component({
    selector: 'artifacts-graph-comp',
    inputs: ['repo'],
    viewProviders: [HTTP_PROVIDERS],
    providers: [ElementRef],
    template: `
    <nav class="navbar-fixed-bottom navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <form class="navbar-form navbar-left">
                <button type="button" class="btn btn-primary" (click)="refresh()" [disabled]="refreshing" [ngClass]="{disabled: refreshing}">Refresh</button>
            
                <button type="button" class="btn btn-primary" [ngClass]="{active: _showLabels}" (click)="toggleShowLabels()">Show Labels</button>
                <button type="button" class="btn btn-primary" [ngClass]="{active: _depthFade}" (click)="toggleDepthFade()">Depth Fade</button>
            
                <!--
                <toggle-button [label]="'Depth Fade'" (onToggle)="depthFade($event)"></toggle-button>
                <toggle-button [label]="'Show Labels'" (onToggle)="showLabels($event)"></toggle-button>
                -->
                
                <span class="label label-default">{{repo}}</span>
            </form> 
      
        </div>
    </nav>
    
    <div class="alert alert-danger" role="alert" *ngIf="errorMessage">
        <span class="glyphicon glyphicon-exclamation-sign"></span>
        <span class="sr-only">Error:</span> <span >{{errorMessage}}</span>
    </div>

    <div class="progress" *ngIf="refreshing">
        <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%">
            <span class="sr-only"></span>
        </div>
    </div>

    <div class="container" [hidden]="svg!=null || refreshing">
        <div style="height:100%;display:flex;align-items:center;justify-content:center;">
            <span (click)="refresh()" class="glyphicon glyphicon-refresh" style="font-size:50vmin;color:gray;cursor:pointer;"></span>
        </div>
    </div>
    
    <div #artifactsgraphview [hidden]="svg==null" style="width:100%;height:100%;border:2px solid #000000;"></div>
    `,
    styles: [`
  `]
})
export class ArtifactsGraphComponent implements CanReuse {
    _showLabels: boolean = true;
    _depthFade: boolean = false;

    svg: any = null;
    @ViewChild('artifactsgraphview') artifactsgraphview;
    graph: Graph = null;

    elementRef: ElementRef;
    http: Http;

    repo: string = 'repo/';
    refreshing: boolean = false;
    error: any;
    errorMessage: string;

    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        alert("reused!");
        return true;
    }

    constructor(http: Http, elementRef: ElementRef) {
        this.http = http;
        this.elementRef = elementRef;
    }

    set showLabels(showLabels: boolean) {
        this._showLabels = showLabels;

        if (this.graph) {
            if (this._showLabels) {
                var node = d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node");
                node.append("text")
                    .attr("x", 12)
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .text(function(node: Node) {
                        if (node.numArtifacts > 1)
                            return "[" + node.numArtifacts + "]";
                        else
                            return node.label;
                    });
            } else {
                d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node").selectAll("text").remove();
            }
        }
    }

    get showLabels(): boolean {
        return this._showLabels;
    }

    set depthFade(depthFade: boolean) {
        this._depthFade = depthFade;

        if (this.graph) {
            if (this._depthFade) {
                var maxDepth = this.graph.maxDepth;
                var circle = d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node").selectAll("circle")
                    .style("fill", function(node: Node) {
                        var color = node.depth * 200.0 / maxDepth;
                        return "rgb(" + color + "," + color + "," + color + ")";
                    });
            } else {
                var color = d3.scale.category20();
                var circle = d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node").selectAll("circle")
                    .style("fill", function(node: Node) { return color(node.associationId); })
            }
        }
    }

    get depthFade(): boolean {
        return this._depthFade;
    }

    toggleShowLabels() {
        this.showLabels = !this.showLabels;
    }

    toggleDepthFade() {
        this.depthFade = !this.depthFade;
    }

    refresh() {
        if (!this.refreshing) {
            this.refreshing = true;
            this.http.get(this.repo + "graph/artifacts")
                .map(res => res.json())
                .subscribe(graph => {
                    this.graph = graph;
                    this.refreshGraph(graph);

                    this.refreshing = false;
                },
                error => {
                    this.graph = null;

                    this.refreshing = false;
                    this.error = <any>error;
                    this.errorMessage = error.status + ' ' + error.url + ', ' + this.repo + 'feature';
                    console.error('error: ' + this.errorMessage);
                },
                () => console.log('done: get artifacts graph'));
        }
    }

    nodeSize(numArtifacts: number, maxNumArtifacts: number): number {
        return 5 + numArtifacts / maxNumArtifacts * 50;
    }

    refreshGraph(graph: Graph) {
        var radius = d3.scale.sqrt().range([0, 6]);

        var width = 500,
            height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-400)
            //.linkDistance(30)
            .linkDistance(function(link) {
                return (5 + link.source.numArtifacts / graph.maxNumArtifacts * 50) + (5 + link.target.numArtifacts / graph.maxNumArtifacts * 50) + 5;
            })
            .size([width, height]);

        /*
                if (this.svg == null)
                    this.svg = d3.select(this.elementRef.nativeElement).append("svg");
                else
                    this.svg.selectAll("*").remove();
                var svg = this.svg;
        */

        //d3.select(this.elementRef.nativeElement).select("svg").remove();
        d3.select(this.artifactsgraphview.nativeElement).select("svg").remove();
        //var svg = d3.select(this.elementRef.nativeElement).append("svg");
        var svg = d3.select(this.artifactsgraphview.nativeElement).append("svg");
        this.svg = svg;

        svg.attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin');

        force
            .nodes(graph.nodes)
            .links(graph.edges)
            .start();

        var link = svg.selectAll(".edge")
            .data(graph.edges)
            .enter().append("line")
            .attr("class", "edge")
            .style("stroke-width", function(edge: Edge) { return 1; });

        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(force.drag);

        var circle = node.append("circle")
            .attr("r", function(node: Node) { return 5 + node.numArtifacts / graph.maxNumArtifacts * 50; });

        circle.append("title")
            .text(function(node: Node) {
                if (node.numArtifacts > 1)
                    return "[" + node.numArtifacts + "]";
                else
                    return node.label;
            });

        // TODO: this is not a very nice solution
        this.showLabels = this._showLabels;
        this.depthFade = this._depthFade;

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

    }

}
