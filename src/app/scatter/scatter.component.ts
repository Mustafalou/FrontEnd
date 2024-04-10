import {Component, OnInit, OnDestroy, Input, input} from '@angular/core';
import * as d3 from 'd3';
import { WebSocketService } from '../web-socket.service';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrl: './scatter.component.scss'
})
export class ScatterComponent {
  private data:any;
  private isReady: boolean = false;
  private svg:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawPlot(): void {
    // Add X axis
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
    const dates: Date[] = this.data.map((d:any)=> parseTime(d.sendTime))
    console.log(dates)
    console.log(d3.extent(dates))
    const x = d3.scaleTime()
    .domain(d3.extent(dates) as [Date, Date])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([-0.1, 1.1])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d:any, i:number) =>x(dates[i]))
    .attr("cy",  (d:any)=> y(d.ledState))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text( (d: any) => d.Framework)
    .attr("x", (d: any, i:number) => x(dates[i]))
    .attr("y", (d: any)  => y(d.ledState))
  }
  constructor(private ws: WebSocketService){}
  ngOnInit(): void {
    this.createSvg();
    this.ws.getMessage().subscribe((message)=>{
      this.data = JSON.parse(message);
      this.drawPlot();
    })
  }
  public Load():void{
    this.ws.sendMessage('{"topic":"askData"}');
  }
}
