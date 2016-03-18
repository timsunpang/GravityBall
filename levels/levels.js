var dummy = {
  1: {
    startX: 80,
    startY: 80,
    goalX: 400,
    goalY: 400,
    obstacles: [],
    switches: []
  }
};

var levels = {
  1: {
    startX: 80,
    startY: 80,
    goalX: 400,
    goalY: 400,
    obstacles: [],
    switches: []
  },
 2: {
   startX: 80,
   startY: 80,
   goalX: 250,
   goalY: 250,
   obstacles: [],
   switches: []
 },
 3: {
   startX: 80,
   startY: 80,
   goalX: 500,
   goalY: 50,
   obstacles: [{x: 250, y: 0, width: 20, height: 300}],
   switches: []
 },
 4: {
   startX: 80,
   startY: 80,
   goalX: 500,
   goalY: 500,
   obstacles: [{x: 350, y: 300, width: 20, height: 300}, {x: 150, y: 0, width: 20, height: 300}],
   switches: []
 },
 5: {
   startX: 80,
   startY: 80,
   goalX: 530,
   goalY: 530,
   obstacles: [{x: 0, y: 180, width: 400, height: 20}, {x: 300, y: 380, width: 400, height: 20}],
   switches: []
 },
 6: {
   startX: 80,
   startY: 520,
   goalX: 650,
   goalY: 150,
   obstacles: [{x: 150, y: 0, width: 20, height: 350},
               {x: 150, y: 500, width: 20, height: 170},
               {x: 350, y: 0, width: 20, height: 100},
               {x: 350, y: 250, width: 20, height: 350},
               {x: 550, y: 0, width: 20, height: 450},
             ],
   switches: []
 },
 7: {
   startX: 80,
   startY: 520,
   goalX: 640,
   goalY: 550,
   obstacles: [{x: 550, y: 480, width: 20, height: 120}],
   switches: [{on: false, switchX: 250, switchY: 250, gateX: 570, gateY: 480, gateWidth: 130, gateHeight: 20}]
 },
 8: {
   startX: 600,
   startY: 500,
   goalX: 350,
   goalY: 250,
   obstacles: [{x: 285, y: 180, width: 20, height: 130},
               {x: 395, y: 180, width: 20, height: 130},
               {x: 285, y: 300, width: 130, height: 20},
               {x: 340, y: 300, width: 20, height: 300}
               ],
   switches: [{on: false, switchX: 200, switchY: 500, gateX: 285, gateY: 180, gateWidth: 130, gateHeight: 20}]
 }
};

module.exports = levels;
