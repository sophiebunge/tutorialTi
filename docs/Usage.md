# The Code

## Arduino IDE

- Open Arduino IDE on your computer.
- Select under "Board & Port" your arduino (Arduino Uno).
- Paste the code.

<img src="./img/ide-2-overview.png" alt="Layout IDE" width="800">

---------
<pre>int TRIG = 4;
int ECHO = 2;
int DURATION;
int DISTANCE;
 
void setup() {  
 
  // ULTRASONIC SENSOR
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
 
  // SERIAL LOG "PRINT"
  Serial.begin(9600);
  
}
 
void loop() {

  // DEFINE INPUT AND  OUTPUT BEHAVIOUR
  digitalWrite(TRIG,HIGH);
  delay(1);
  digitalWrite(TRIG,LOW);
  DURATION = pulseIn(ECHO,HIGH);
  DISTANCE = DURATION / 58.2;

  // DEFINE DISTANCE RANGE
  if(DISTANCE > 0 && DISTANCE < 50 ){
    Serial.println(DISTANCE);
    delay(100);
  }
 
}</pre>

---------

- After coping the code click the checkmark to verify the code. 
- The click the arrow to compile and run the code. 

### Troubleshooting

You can test if the sensor work by opening the Serial Monitor under Tools. Make sure the baud is set at 9600. Move your hand back and forth and see if the numbers change. If you want to have a higher range (max. 3m is recommeded) change it in the code with `distance`. 

## TouchDesigner

- Open TouchDesigner.
