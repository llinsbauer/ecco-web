System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var ArtifactsGraphComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ArtifactsGraphComponent = (function () {
                function ArtifactsGraphComponent(http, elementRef) {
                    this._showLabels = true;
                    this._depthFade = false;
                    this.svg = null;
                    this.repo = 'repo/';
                    this.refresing = false;
                    this.http = http;
                    this.elementRef = elementRef;
                }
                ArtifactsGraphComponent.prototype.routerCanReuse = function (next, prev) {
                    alert("reused!");
                    return true;
                };
                ArtifactsGraphComponent.prototype.toggleShowLabels = function () {
                    this._showLabels = !this._showLabels;
                };
                ArtifactsGraphComponent.prototype.toggleDepthFade = function () {
                    this._depthFade = !this._depthFade;
                };
                ArtifactsGraphComponent.prototype.refresh = function () {
                    var _this = this;
                    this.refresing = true;
                    this.http.get(this.repo + "graphs/artifacts.json")
                        .map(function (res) { return res.json(); })
                        .subscribe(function (graph) {
                        _this.refreshGraph(graph);
                        _this.refresing = false;
                    }, function (err) { return alert(err); }, function () { return console.log('done: get artifacts graph'); });
                };
                ArtifactsGraphComponent.prototype.refreshGraph = function (graph) {
                    var width = 500, height = 500;
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
                        .style("stroke-width", function (edge) { return 1; });
                    var node = svg.selectAll(".vertex")
                        .data(graph.nodes)
                        .enter().append("circle")
                        .attr("class", "vertex")
                        .attr("r", 5)
                        .style("fill", function (node) { return color(node.association); }) // TODO: get color for association
                        .call(force.drag);
                    node.append("title")
                        .text(function (node) {
                        if (node.artifacts > 1)
                            return "[" + node.artifacts + "]";
                        else
                            return node.label;
                    });
                    force.on("tick", function () {
                        link.attr("x1", function (d) { return d.source.x; })
                            .attr("y1", function (d) { return d.source.y; })
                            .attr("x2", function (d) { return d.target.x; })
                            .attr("y2", function (d) { return d.target.y; });
                        node.attr("cx", function (d) { return d.x; })
                            .attr("cy", function (d) { return d.y; });
                    });
                };
                __decorate([
                    core_1.ViewChild('artifactsgraphview'), 
                    __metadata('design:type', Object)
                ], ArtifactsGraphComponent.prototype, "artifactsgraphview", void 0);
                ArtifactsGraphComponent = __decorate([
                    core_1.Component({
                        selector: 'artifacts-graph-comp',
                        inputs: ['repo'],
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        providers: [core_1.ElementRef],
                        template: "\n    <nav class=\"navbar-fixed-bottom navbar navbar-default\" role=\"navigation\">\n        <div class=\"container-fluid\">\n            <form class=\"navbar-form navbar-left\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"refresh()\">Refresh</button>\n            \n                <button type=\"button\" class=\"btn btn-primary\" [ngClass]=\"{active: _showLabels}\" (click)=\"toggleShowLabels()\">Show Labels</button>\n                <button type=\"button\" class=\"btn btn-primary\" [ngClass]=\"{active: _depthFade}\" (click)=\"toggleDepthFade()\">Depth Fade</button>\n            \n                <!--\n                <toggle-button [label]=\"'Depth Fade'\" (onToggle)=\"depthFade($event)\"></toggle-button>\n                <toggle-button [label]=\"'Show Labels'\" (onToggle)=\"showLabels($event)\"></toggle-button>\n                -->\n                \n                <span class=\"label label-default\">{{repo}}</span>\n            </form> \n      \n        </div>\n    </nav>\n    \n    <div class=\"container\" [hidden]=\"svg!=null\">\n        <div style=\"height:100%;display:flex;align-items:center;justify-content:center;\">\n            <span (click)=\"refresh()\" class=\"glyphicon glyphicon-refresh\" style=\"font-size:50vmin;color:gray;cursor:pointer;\"></span>\n        </div>\n    </div>\n    \n    <div #artifactsgraphview [hidden]=\"svg==null\" style=\"width:100%;height:100%;\"></div>\n    ",
                        styles: ["\n  "]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, core_1.ElementRef])
                ], ArtifactsGraphComponent);
                return ArtifactsGraphComponent;
            }());
            exports_1("ArtifactsGraphComponent", ArtifactsGraphComponent);
        }
    }
});
//# sourceMappingURL=artifacts.graph.component.js.map