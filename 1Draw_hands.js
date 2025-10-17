// ----=  HANDS  =----
function prepareInteraction() {
  bgImage = loadImage('/images/nightSky.png'); // load once at start
}
let bgImage;
let trail = []; // Step 5: Array to store trail positions
const maxTrailLength = 15; // How many trail points to keep
function drawInteraction(faces, hands) {
   image(bgImage, 0, 0, width, height); 
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    //console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }

    // This is how to load in the x and y of a point on the hand.
    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;
    //  Add thumb tracking
    let thumbTipX = hand.thumb_tip.x;
    let thumbTipY = hand.thumb_tip.y;
    /*
    Start drawing on the hands here
    */let gesture = detectHandGesture(hand);

    // Brighter glow effect
// Yellow light on index finger - size changes with gesture
noStroke();

let lightSize = 1.0; // default size multiplier

// Change size based on gesture
if (gesture == "Open Palm") {
  lightSize = 1.5; // bigger light
} else if (gesture == "Fist") {
  lightSize = 0.5; // smaller light
} else if (gesture == "Peace") {
  lightSize = 1.2; // medium light
}

// Outer glow
fill(255, 255, 100, 50);
ellipse(indexFingerTipX, indexFingerTipY, 120 * lightSize, 120 * lightSize);

// Middle glow
fill(255, 255, 150, 100);
ellipse(indexFingerTipX, indexFingerTipY, 80 * lightSize, 80 * lightSize);

// Inner glow
fill(255, 255, 200, 180);
ellipse(indexFingerTipX, indexFingerTipY, 50 * lightSize, 50 * lightSize);

// Bright center
fill(255, 255, 255, 255);
ellipse(indexFingerTipX, indexFingerTipY, 25 * lightSize, 25 * lightSize);

//  Second light on thumb (blue/purple)
noStroke();

// Outer glow
fill(150, 150, 255, 50);
ellipse(thumbTipX, thumbTipY, 100, 100);

// Middle glow
fill(180, 180, 255, 100);
ellipse(thumbTipX, thumbTipY, 65, 65);

// Inner glow
fill(200, 200, 255, 180);
ellipse(thumbTipX, thumbTipY, 40, 40);

// Bright center
fill(220, 220, 255, 255);
ellipse(thumbTipX, thumbTipY, 20, 20);
// Step 5: Add current position to trail
trail.push({x: indexFingerTipX, y: indexFingerTipY});

// Keep trail length limited
if (trail.length > maxTrailLength) {
  trail.shift(); // remove oldest point
}

    // drawPoints(hand)

    //fingerPuppet(indexFingerTipX, indexFingerTipY);

    //chameleonHandPuppet(hand)

    /*
    Stop drawing on the hands here
    */
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------
}






function fingerPuppet(x, y) {
  fill(255, 38, 219) // pink
  ellipse(x, y, 100, 20)
  ellipse(x, y, 20, 100)

  fill(255, 252, 48) // yellow
  ellipse(x, y, 20) // draw center 

}


function pinchCircle(hand) { // adapted from https://editor.p5js.org/ml5/sketches/DNbSiIYKB
  // Find the index finger tip and thumb tip
  let finger = hand.index_finger_tip;
  //let finger = hand.pinky_finger_tip;
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}

function chameleonHandPuppet(hand) {
  // Find the index finger tip and thumb tip
  // let finger = hand.index_finger_tip;

  let finger = hand.middle_finger_tip; // this finger now contains the x and y infomation! you can access it by using finger.x 
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

  let indexFingerTipX = hand.index_finger_tip.x;
  let indexFingerTipY = hand.index_finger_tip.y;
  fill(0)
  circle(indexFingerTipX, indexFingerTipY, 20);

}

function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 10);
  }
  pop()

}