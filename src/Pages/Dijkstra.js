import { 
createCanvas,
background,
textSize,
textAlign,
CENTER,
stroke,
strokeWeight,
line,
dist,
fill,
ellipse,
text,
str,
} from "react-p5";
import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';



/* 	Dijekstra's algorithm implemented
*		on an undirected graph.
*		Play with the variables!
*/

// define coords of some nodes (or vertices)
var v0 = [200, 50];
var v1 = [50, 100];
var v2 = [200, 100];
var v3 = [250, 100];
var v4 = [350, 200];
var v5 = [100, 300];
var v6 = [50, 250];
var v7 = [300, 350];

// create list of nodes
var V = [v0, v1, v2, v3, v4, v5, v6, v7];

// create list of edges
var E = [	[0, 1],
            [0, 2],
         	[1, 7],
  			[0, 3],
         	[1, 5],
  			[2, 4],
  			[7, 3],
            [2, 6],
         	[7, 5],
            [3, 5],
  			[4, 5],
         	[4, 7]   ];

// create another list to store reference to 
// best 'landing' edge for each node
// this can be used to plot best route later
var bestRoutes = new Array(V.length);

// generate an adjacency list
var A = [];
for (var i=0;i<V.length;i++) {
  A.push(findNeighbours(V[i]));
}

// initialise some edge coordinates variables
var x1, x2, y1, y2 = 0;

export default class Dijkstra extends React.Component {

    render() {
        return (
          <main>
            <div className="btn-toggle">
            </div>
            <header>
              <h1> Dijkstra’s Shortest Path</h1>
              <p>
              <button onClick={() => handleClick()}>Run</button>
              </p>
            </header>
          </main>
        );
      }
    };

function handleClick () {
    return (
        setup
    )
}

function setup () {
  createCanvas(400, 400);
  background(220);
  // Set text characteristics
  textSize(16);
  textAlign(CENTER, CENTER);
  // calc weightings of edges
	var W = calcWeights();
  // initialise source node at 0
	var source = 0;
  // initialise goal node
	var goal = 7;
  // initalise distances array
  var D = initDistances(source);
  // for each node update distance array
  for (var i=0;i<5;i++) {
    D = updateDistances(V[i], A, W, D);
  }  
  stroke(0);
  strokeWeight(1);
  // plot edges first
  for (var i=0; i<E.length; i++) {
    x1 = V[ E[i][0] ][0];
    y1 = V[ E[i][0] ][1];
    x2 = V[ E[i][1] ][0];
    y2 = V[ E[i][1] ][1];
    line(x1, y1, x2, y2);
  }
  // plot best route
  plotBestRoute(goal);
  // plot nodes second
  plotNodes(source, goal);  
}


/* ------ Helper functions ------ */

function initDistances(source) {
	/* 	initialises an array for storing distances
  *		corresponds to Step 1 in Dijekstra's SPA
  *		param: the integer index of the source node
  *		rtype: returns an array
  */
	var D = new Array(V.length);
	for (var i=0; i<V.length; i++) {
  	// set source node initial distance = 0
  	if (i==source) {
    	D[i] = 0;
  	// all other nodes are Infinity
  	} else {
    	D[i] = Infinity;
  	}
  }
  return D;
}

function calcWeights() {
  /*	calculate the weightings of the edges.
  *		these will be the geometrical distances 
  *		between connected nodes.
  *		rtype: array
  */
  var W = new Array(E.length);
  for (var i=0;i<W.length;i++) {
    W[i] = dist(V[E[i][0]][0], V[E[i][0]][1], V[E[i][1]][0], V[E[i][1]][1]);
  }
  return W;
}

function distNeighbours(node, neighbours) {
  /*	find distances to specified neighbours
  *		of a specified node
  */
  var dn = [];
  for (var i=0;i<neighbours.length;i++) {
    dn.push(dist(node[0], node[1], V[neighbours[i]][0], V[neighbours[i]][1]));  
  }
  return dn;
}

function findNeighbours(node) {
  /*	get indices of neighbours as array
  *		rtype: array of indices
  */
  var neighbours = [];
  var x = 0; // initialise an index at 0
  for (var i=0;i<E.length;i++) {
    // if node index is in the array
    if( E[i].includes( V.indexOf(node) ) ) {
      x = E[i].indexOf( V.indexOf(node) );
      x = 1 - x; // switches index to that of other vertex
    	// add the index to the list of neighbours
      neighbours.push(E[i][x]);
    }
  }
  return neighbours;
}

function getEdgeIndex(i1, i2) {
  /*	get the edge index for 2
  *		neighbouring nodes
  *		param i1: first node
  *		param i2: neighbouring node
  */
  for (var i=0;i<E.length;i++) {
    if (E[i].includes(i1) && E[i].includes(i2)) {
      return i;
    }
  }
}

function updateDistances(node, A, W, D) {
  /*	update the values in the distance matrix
  *		for the specified node.
  *		param node: node being visited
  *		param W: weightings array
  *		param A: adjacency list as nested array
  *		param D: distance array
  */
  for (var i=0;i<D.length;i++) {
    // check if we're on a neighbour
    if (A[V.indexOf(node)].includes(i)) {
      // and which edge index is it?
      var Ei = getEdgeIndex(V.indexOf(node),i);
      // if it's never been visited, use its edge 
      // weight to update distance
      if (D[i] == Infinity) {        
        D[i] = D[V.indexOf(node)] + W[Ei];
        bestRoutes[i] = Ei;
      } else if ( (D[V.indexOf(node)] + W[Ei]) < D[i] ) {
        // it has been visited before, so...
        // if distance on this node + edge weight to neighbour
        // is less than distance currently on neighbour, update it
        D[i] = D[V.indexOf(node)] + W[Ei];
        bestRoutes[i] = Ei;
      }
    }
  }
  return D;
}

function plotBestRoute(goal) {
  /*	plots the best route to
  *		the goal node from the source
  */
  var reached = false;
  var count = goal;  
  stroke(0,255,0);
  strokeWeight(2);
  while (!reached) {
    if (count !== 0) {
      x1 = V[ E[bestRoutes[count]][0] ][0];
    	y1 = V[ E[bestRoutes[count]][0] ][1];
    	x2 = V[ E[bestRoutes[count]][1] ][0];
    	y2 = V[ E[bestRoutes[count]][1] ][1];
      line(x1,y1,x2,y2);
      count = Math.min.apply(null, E[bestRoutes[count]]);
    } else {
      reached = true;
    }
  }
}

function plotNodes(source, goal) {
  /*	plots the nodes of the graph
  *		at the x,y coordinates specified
  *		in the list of vertices, V
  *		param V: array of vertices
  *		param source: index of start node
  *		param goal: index of goal node
  */
  stroke(0);
  for (var i=0; i<V.length; i++) {
    // make the source node red
    if (i === source) {
      fill(255,0,0);
    // make goal node green
    } else if (i === goal) {
      fill(0,255,0);
    } else {
      fill(0);
    }
    ellipse(V[i][0], V[i][1], 30, 30);
    fill(255);
    text("v"+str(i), V[i][0]-15, V[i][1]-24);
  }  
}
