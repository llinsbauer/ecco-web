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
    var AppComponent;
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
            AppComponent = (function () {
                function AppComponent(http, elementRef) {
                    ////this.raw = http.get('localhost:8080/myapp/features/all');
                    //http.get('http://localhost:8080/myapp/features/all')
                    //.map(res => res.json())
                    //.subscribe(features => { this.features = features; this.raw = this.features[0].name; } , err => alert(err), () => console.log('done'));
                    /*
                            {
                                // From http://mkweb.bcgsc.ca/circos/guide/tables/
                                var matrix = [
                                    [11975, 5871, 8916, 2868],
                                    [1951, 10048, 2060, 6171],
                                    [8010, 16145, 8090, 8045],
                                    [1013, 990, 940, 6907]
                                ];
                    
                                var chord = d3.layout.chord()
                                    .padding(.05)
                                    .sortSubgroups(d3.descending)
                                    .matrix(matrix);
                    
                                var width = 960,
                                    height = 500,
                                    innerRadius = Math.min(width, height) * .41,
                                    outerRadius = innerRadius * 1.1;
                    
                                var fill = d3.scale.ordinal()
                                    .domain(d3.range(4))
                                    .range(["#000000", "#FFDD89", "#957244", "#F26223"]);
                    
                                var svg = d3.select(elementRef.nativeElement).append("svg")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .append("g")
                                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                    
                                svg.append("g").selectAll("path")
                                    .data(chord.groups)
                                    .enter().append("path")
                                    .style("fill", function(d) { return fill(d.index); })
                                    .style("stroke", function(d) { return fill(d.index); })
                                    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
                                    .on("mouseover", fade(.1))
                                    .on("mouseout", fade(1));
                    
                                var ticks = svg.append("g").selectAll("g")
                                    .data(chord.groups)
                                    .enter().append("g").selectAll("g")
                                    .data(groupTicks)
                                    .enter().append("g")
                                    .attr("transform", function(d) {
                                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                                            + "translate(" + outerRadius + ",0)";
                                    });
                    
                                ticks.append("line")
                                    .attr("x1", 1)
                                    .attr("y1", 0)
                                    .attr("x2", 5)
                                    .attr("y2", 0)
                                    .style("stroke", "#000");
                    
                                ticks.append("text")
                                    .attr("x", 8)
                                    .attr("dy", ".35em")
                                    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
                                    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
                                    .text(function(d) { return d.label; });
                    
                                svg.append("g")
                                    .attr("class", "chord")
                                    .selectAll("path")
                                    .data(chord.chords)
                                    .enter().append("path")
                                    .attr("d", d3.svg.chord().radius(innerRadius))
                                    .style("fill", function(d) { return fill(d.target.index); })
                                    .style("opacity", 1);
                    
                                // Returns an array of tick angles and labels, given a group.
                                function groupTicks(d) {
                                    var k = (d.endAngle - d.startAngle) / d.value;
                                    return d3.range(0, d.value, 1000).map(function(v, i) {
                                        return {
                                            angle: v * k + d.startAngle,
                                            label: i % 5 ? null : v / 1000 + "k"
                                        };
                                    });
                                }
                    
                                // Returns an event handler for fading a given chord group.
                                function fade(opacity) {
                                    return function(g, i) {
                                        svg.selectAll(".chord path")
                                            .filter(function(d) { return d.source.index != i && d.target.index != i; })
                                            .transition()
                                            .style("opacity", opacity);
                                    };
                                }
                    
                            }
                    */
                    {
                        var width = 500, height = 500;
                        var color = d3.scale.category20();
                        var force = d3.layout.force()
                            .charge(-120)
                            .linkDistance(30)
                            .size([width, height]);
                        var svg = d3.select(elementRef.nativeElement).append("svg")
                            .attr("width", '100%')
                            .attr("height", '100%')
                            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                            .attr('preserveAspectRatio', 'xMinYMin');
                        d3.json("miserables.json", function (error, graph) {
                            if (error)
                                throw error;
                            force
                                .nodes(graph.nodes)
                                .links(graph.links)
                                .start();
                            var link = svg.selectAll(".link")
                                .data(graph.links)
                                .enter().append("line")
                                .attr("class", "link")
                                .style("stroke-width", function (d) { return Math.sqrt(d.value); });
                            var node = svg.selectAll(".node")
                                .data(graph.nodes)
                                .enter().append("circle")
                                .attr("class", "node")
                                .attr("r", 5)
                                .style("fill", function (d) { return color(d.group); })
                                .call(force.drag);
                            node.append("title")
                                .text(function (d) { return d.name; });
                            force.on("tick", function () {
                                link.attr("x1", function (d) { return d.source.x; })
                                    .attr("y1", function (d) { return d.source.y; })
                                    .attr("x2", function (d) { return d.target.x; })
                                    .attr("y2", function (d) { return d.target.y; });
                                node.attr("cx", function (d) { return d.x; })
                                    .attr("cy", function (d) { return d.y; });
                            });
                        });
                    }
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        //template: '<span>{{raw}}</span>'
                        providers: [core_1.ElementRef],
                        template: "\n    <ul>\n        <li *ngFor=\"#item of features; #i = index\">\n            {{i}} {{item != null ? item.name : 'null'}} {{item != null ? item.description : 'null'}}\n        </li>\n    </ul>\n    <div class=\"list-group\">\n        <a href=\"#\" class=\"list-group-item\" *ngFor=\"#item of features; #i = index\">\n            <h4 class=\"list-group-item-heading\">{{item != null ? item.name : 'null'}}</h4>\n            <p class=\"list-group-item-text\">{{item != null ? item.description : 'null'}}</p>\n        </a>\n    </div>\n    \n        \n    <span class=\"glyphicon glyphicon-grain\" aria-hidden=\"true\"></span>\n\n    <span class=\"label label-default\">Default</span><span class=\"label label-primary\">Primary</span>\n\n    <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Recipient's username\" aria-describedby=\"basic-addon2\">\n        <span class=\"input-group-addon\" id=\"basic-addon2\">@example.com</span>\n    </div>\n    \n\n    <nav class=\"navbar navbar-inverse\">\n        <div class=\"container-fluid\">\n            <!-- Brand and toggle get grouped for better mobile display -->\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"#\">ECCO</a>\n            </div>\n\n            <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li class=\"active\"><a href=\"#status\" aria-controls=\"status\" data-toggle=\"tab\">Status</a></li>\n                    <li><a href=\"#features\" aria-controls=\"features\" data-toggle=\"tab\">Features</a></li>\n                    <li><a href=\"#commits\" aria-controls=\"commits\" data-toggle=\"tab\">Commits</a></li>\n                    <li><a href=\"#associations\" aria-controls=\"associations\" data-toggle=\"tab\">Associations</a></li>\n                    <li><a href=\"#artifactsgraph\" aria-controls=\"artifactsgraph\" data-toggle=\"tab\">Artifacts Graph</a></li>\n                    \n                    <li class=\"dropdown\">\n                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n                        <ul class=\"dropdown-menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a href=\"#\">One more separated link</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            </div><!-- /.navbar-collapse -->\n            \n        </div><!-- /.container-fluid -->\n    </nav>\n    \n    \n    \n    <div class=\"panel panel-default\">\n        <!-- Default panel contents -->\n        <div class=\"panel-heading\">Features</div>\n        \n        \n        \n        \n    <nav class=\"navbar navbar-inverse navbar-static-top\">\n        <div class=\"container-fluid\">\n            <!-- Brand and toggle get grouped for better mobile display -->\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"#\">ECCO</a>\n            </div>\n\n            <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li class=\"active\"><a href=\"#status\" aria-controls=\"status\" data-toggle=\"tab\">Status</a></li>\n                    <li><a href=\"#features\" aria-controls=\"features\" data-toggle=\"tab\">Features</a></li>\n                    <li><a href=\"#commits\" aria-controls=\"commits\" data-toggle=\"tab\">Commits</a></li>\n                    <li><a href=\"#associations\" aria-controls=\"associations\" data-toggle=\"tab\">Associations</a></li>\n                    <li><a href=\"#artifactsgraph\" aria-controls=\"artifactsgraph\" data-toggle=\"tab\">Artifacts Graph</a></li>\n                    \n                    <li class=\"dropdown\">\n                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n                        <ul class=\"dropdown-menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a href=\"#\">One more separated link</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            </div><!-- /.navbar-collapse -->\n            \n        </div><!-- /.container-fluid -->\n    </nav>\n\n        \n        \n        \n        <div class=\"panel-body\">\n            <p>List of all features.</p>\n        </div>\n\n          <!-- Table -->\n        <table class=\"table\">\n            <tr><th>#</th><th>Name</th><th>Description</th></tr>\n            <tr *ngFor=\"#item of features; #i = index\"><td>{{i}}</td><td>{{item != null ? item.name : 'null'}}</td><td>{{item != null ? item.description : 'null'}}</td></tr>\n        </table>\n    </div>\n    \n    <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"45\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 45%\">\n            <span class=\"sr-only\">45% Complete</span>\n        </div>\n    </div>\n    \n    \n    \n    <div id=\"testgraph\"></div>\n    \n    \n    "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, core_1.ElementRef])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map