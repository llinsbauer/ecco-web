import {Component, ElementRef, ViewChild} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {RouteParams} from 'angular2/router';

declare var d3: any;

interface Node {
    association: string;
    artifacts: number;
    depth: number;
    label: string;
}

interface Edge {
    source: number;
    target: number;
}

interface Graph {
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
                <button type="button" class="btn btn-primary" (click)="refresh()">Refresh</button>
            
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
    
    <div class="container" [hidden]="svg!=null">
        <div style="height:100%;display:flex;align-items:center;justify-content:center;">
            <span (click)="refresh()" class="glyphicon glyphicon-refresh" style="font-size:50vmin;color:gray;cursor:pointer;"></span>
        </div>
    </div>
    
    <div #artifactsgraphview></div>
    `,
    styles: [`
  `]
})
export class ArtifactsGraphComponent {
    _showLabels: boolean = true;
    _depthFade: boolean = false;

    svg: any = null;
    @ViewChild('artifactsgraphview') artifactsgraphview;

    http: Http;
    elementRef: ElementRef;

    repo: string = 'repo/';

    refresing: boolean = false;

    constructor(http: Http, elementRef: ElementRef, params: RouteParams) {
        this.http = http;
        this.elementRef = elementRef;

        if (params.get('repo')) {
            this.repo = params.get('repo');
        }
    }

    toggleShowLabels() {
        this._showLabels = !this._showLabels;
    }

    toggleDepthFade() {
        this._depthFade = !this._depthFade;
    }

    refresh() {
        this.refresing = true;
        this.http.get(this.repo + "graphs/artifacts.json")
            .map(res => res.json())
            .subscribe(graph => {
                this.refreshGraph(graph);

                this.refresing = false;
            }, err => alert(err), () => console.log('done: get artifacts graph'));
    }

    refreshGraph(graph: Graph) {
        var width = 500,
            height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
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

        var node = svg.selectAll(".vertex")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "vertex")
            .attr("r", 5)
            .style("fill", function(node) { return color(node.association); }) // TODO: get color for association
            .call(force.drag);

        node.append("title")
            .text(function(node: Node) {
                if (node.artifacts > 1)
                    return "[" + node.artifacts + "]";
                else
                    return node.label;
            });

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });

    }

}
