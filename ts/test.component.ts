import {Component, ElementRef} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';




interface Feature {
    name: String;
    description: String;
}





declare var d3: any;


@Component({
    selector: 'test-app',
    viewProviders: [HTTP_PROVIDERS],
    //template: '<span>{{raw}}</span>'
    providers: [ElementRef],
    template: `
    <ul>
        <li *ngFor="#item of features; #i = index">
            {{i}} {{item != null ? item.name : 'null'}} {{item != null ? item.description : 'null'}}
        </li>
    </ul>
    <div class="list-group">
        <a href="#" class="list-group-item" *ngFor="#item of features; #i = index">
            <h4 class="list-group-item-heading">{{item != null ? item.name : 'null'}}</h4>
            <p class="list-group-item-text">{{item != null ? item.description : 'null'}}</p>
        </a>
    </div>
    
        
    <span class="glyphicon glyphicon-grain" aria-hidden="true"></span>

    <span class="label label-default">Default</span><span class="label label-primary">Primary</span>

    <div class="input-group">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">
        <span class="input-group-addon" id="basic-addon2">@example.com</span>
    </div>
    

    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">ECCO</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#status" aria-controls="status" data-toggle="tab">Status</a></li>
                    <li><a href="#features" aria-controls="features" data-toggle="tab">Features</a></li>
                    <li><a href="#commits" aria-controls="commits" data-toggle="tab">Commits</a></li>
                    <li><a href="#associations" aria-controls="associations" data-toggle="tab">Associations</a></li>
                    <li><a href="#artifactsgraph" aria-controls="artifactsgraph" data-toggle="tab">Artifacts Graph</a></li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
            
        </div><!-- /.container-fluid -->
    </nav>
    
    
    
    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading">Features</div>
        
        
        
        
    <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">ECCO</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#status" aria-controls="status" data-toggle="tab">Status</a></li>
                    <li><a href="#features" aria-controls="features" data-toggle="tab">Features</a></li>
                    <li><a href="#commits" aria-controls="commits" data-toggle="tab">Commits</a></li>
                    <li><a href="#associations" aria-controls="associations" data-toggle="tab">Associations</a></li>
                    <li><a href="#artifactsgraph" aria-controls="artifactsgraph" data-toggle="tab">Artifacts Graph</a></li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
            
        </div><!-- /.container-fluid -->
    </nav>

        
        
        
        <div class="panel-body">
            <p>List of all features.</p>
        </div>

          <!-- Table -->
        <table class="table">
            <tr><th>#</th><th>Name</th><th>Description</th></tr>
            <tr *ngFor="#item of features; #i = index"><td>{{i}}</td><td>{{item != null ? item.name : 'null'}}</td><td>{{item != null ? item.description : 'null'}}</td></tr>
        </table>
    </div>
    
    <div class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
            <span class="sr-only">45% Complete</span>
        </div>
    </div>
    
    
    
    <div id="testgraph"></div>
    
    
    `
})
export class TestComponent {
    public features: Feature[];
    public raw: String;
    constructor(http: Http, elementRef: ElementRef) {
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
            var width = 500,
                height = 500;

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

            d3.json("miserables.json", function(error, graph) {
                if (error) throw error;

                force
                    .nodes(graph.nodes)
                    .links(graph.links)
                    .start();

                var link = svg.selectAll(".link")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

                var node = svg.selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .style("fill", function(d) { return color(d.group); })
                    .call(force.drag);

                node.append("title")
                    .text(function(d) { return d.name; });

                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });
                });
            });
        }



    }
}
