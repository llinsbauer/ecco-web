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
                    this.graph = null;
                    this.artifactsGraphUrl = 'graph/artifacts';
                    this.maxChildren = 100;
                    this.repo = 'repo/';
                    this.refreshing = false;
                    this.http = http;
                    this.elementRef = elementRef;
                }
                ArtifactsGraphComponent.prototype.routerCanReuse = function (next, prev) {
                    alert("reused!");
                    return true;
                };
                Object.defineProperty(ArtifactsGraphComponent.prototype, "showLabels", {
                    get: function () {
                        return this._showLabels;
                    },
                    set: function (showLabels) {
                        this._showLabels = showLabels;
                        if (this.graph) {
                            if (this._showLabels) {
                                var node = d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node");
                                node.append("text")
                                    .attr("x", 12)
                                    .attr("dy", ".35em")
                                    .attr("text-anchor", "middle")
                                    .text(function (node) {
                                    if (node.numArtifacts > 1)
                                        return "[" + node.numArtifacts + "]";
                                    else
                                        return node.label;
                                });
                            }
                            else {
                                d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node").selectAll("text").remove();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArtifactsGraphComponent.prototype, "depthFade", {
                    get: function () {
                        return this._depthFade;
                    },
                    set: function (depthFade) {
                        this._depthFade = depthFade;
                        if (this.graph) {
                            if (this._depthFade) {
                                var maxDepth = this.graph.maxDepth;
                                var circle = d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node").selectAll("circle")
                                    .style("fill", function (node) {
                                    var color = node.depth * 200.0 / maxDepth;
                                    return "rgb(" + color + "," + color + "," + color + ")";
                                });
                            }
                            else {
                                var color = d3.scale.category20();
                                var circle = d3.select(this.artifactsgraphview.nativeElement).select("svg").selectAll(".node").selectAll("circle")
                                    .style("fill", function (node) { return color(node.associationId); });
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ArtifactsGraphComponent.prototype.toggleShowLabels = function () {
                    this.showLabels = !this.showLabels;
                };
                ArtifactsGraphComponent.prototype.toggleDepthFade = function () {
                    this.depthFade = !this.depthFade;
                };
                ArtifactsGraphComponent.prototype.refresh = function () {
                    var _this = this;
                    if (!this.refreshing) {
                        this.refreshing = true;
                        this.http.get(this.repo + this.artifactsGraphUrl + "?maxChildren=" + this.maxChildren)
                            .map(function (res) { return res.json(); })
                            .subscribe(function (graph) {
                            _this.graph = graph;
                            _this.refreshing = false;
                            _this.error = null;
                            _this.errorMessage = null;
                            _this.refreshGraph(graph);
                        }, function (error) {
                            _this.graph = null;
                            _this.refreshing = false;
                            _this.error = error;
                            _this.errorMessage = error.status + ' ' + error.url + ', ' + _this.repo + _this.artifactsGraphUrl + "?maxChildren=" + _this.maxChildren;
                            console.error('error: ' + _this.errorMessage);
                        }, function () { return console.log('done: get artifacts graph'); });
                    }
                };
                ArtifactsGraphComponent.prototype.nodeSize = function (numArtifacts, maxNumArtifacts) {
                    return 5 + numArtifacts / maxNumArtifacts * 50;
                };
                ArtifactsGraphComponent.prototype.refreshGraph = function (graph) {
                    var radius = d3.scale.sqrt().range([0, 6]);
                    var width = 500, height = 500;
                    var color = d3.scale.category20();
                    var force = d3.layout.force()
                        .charge(-400)
                        .linkDistance(function (link) {
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
                        .style("stroke-width", function (edge) { return 1; });
                    var node = svg.selectAll(".node")
                        .data(graph.nodes)
                        .enter()
                        .append("g")
                        .attr("class", "node")
                        .call(force.drag);
                    var circle = node.append("circle")
                        .attr("r", function (node) { return 5 + node.numArtifacts / graph.maxNumArtifacts * 50; });
                    circle.append("title")
                        .text(function (node) {
                        if (node.numArtifacts > 1)
                            return "[" + node.numArtifacts + "]";
                        else
                            return node.label;
                    });
                    // TODO: this is not a very nice solution
                    this.showLabels = this._showLabels;
                    this.depthFade = this._depthFade;
                    force.on("tick", function () {
                        link.attr("x1", function (d) { return d.source.x; })
                            .attr("y1", function (d) { return d.source.y; })
                            .attr("x2", function (d) { return d.target.x; })
                            .attr("y2", function (d) { return d.target.y; });
                        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
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
                        template: "\n    <nav class=\"navbar-fixed-bottom navbar navbar-default\" role=\"navigation\">\n        <div class=\"container-fluid\">\n            <form (ngSubmit)=\"refresh()\" class=\"navbar-form navbar-left\">\n                <!--<span class=\"label label-default\">{{repo}}</span>-->\n                <div class=\"input-group\">\n                    <span class=\"input-group-addon\">{{repo}}</span>\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"artifactsGraphUrl\" required>\n                    <span class=\"input-group-addon\">?maxChildren=</span>\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"maxChildren\" required>\n                    <div class=\"input-group-btn\">\n                        <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"refreshing\">&nbsp;<span class=\"glyphicon glyphicon-refresh\"></span>&nbsp;</button>\n                        <!--\n                        <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"maxChildren == savedMaxChildren && artifactsGraphUrl == savedArtifactsGraphUrl\">&nbsp;<span class=\"glyphicon glyphicon-ok\"></span>&nbsp;</button>\n                        <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"maxChildren == savedMaxChildren && artifactsGraphUrl == savedArtifactsGraphUrl\">&nbsp;<span class=\"glyphicon glyphicon-remove\"></span>&nbsp;</button>\n                        -->\n                    </div>\n                </div>\n                \n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"refresh()\" [disabled]=\"refreshing\" [ngClass]=\"{disabled: refreshing}\">Refresh</button>\n            \n                <button type=\"button\" class=\"btn btn-primary\" [ngClass]=\"{active: _showLabels}\" (click)=\"toggleShowLabels()\">Show Labels</button>\n                <button type=\"button\" class=\"btn btn-primary\" [ngClass]=\"{active: _depthFade}\" (click)=\"toggleDepthFade()\">Depth Fade</button>\n            \n                <!--\n                <toggle-button [label]=\"'Depth Fade'\" (onToggle)=\"depthFade($event)\"></toggle-button>\n                <toggle-button [label]=\"'Show Labels'\" (onToggle)=\"showLabels($event)\"></toggle-button>\n                -->\n            </form> \n      \n        </div>\n    </nav>\n    \n    <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"errorMessage\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\"></span>\n        <span class=\"sr-only\">Error:</span> <span >{{errorMessage}}</span>\n    </div>\n\n    <div class=\"progress\" *ngIf=\"refreshing\">\n        <div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" style=\"width: 100%\">\n            <span class=\"sr-only\"></span>\n        </div>\n    </div>\n\n    <div class=\"container\" [hidden]=\"svg!=null || refreshing\">\n        <div style=\"height:100%;display:flex;align-items:center;justify-content:center;\">\n            <span (click)=\"refresh()\" class=\"glyphicon glyphicon-refresh\" style=\"font-size:50vmin;color:gray;cursor:pointer;\"></span>\n        </div>\n    </div>\n    \n    <div #artifactsgraphview [hidden]=\"svg==null\" style=\"width:100%;height:100%;border:2px solid #000000;\"></div>\n    ",
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