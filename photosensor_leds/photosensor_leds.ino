int lightPin = 0;
int pinR = 12;
int pinG = 11;

void setup() 
{
  Serial.begin(9600);
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
}

void loop() {
  Serial.print(analogRead(lightPin));
  if(analogRead(lightPin)<700){
    digitalWrite(pinR, HIGH);
    digitalWrite(pinG, LOW);
  }else{
    digitalWrite(pinG, HIGH);
    digitalWrite(pinR, LOW);
  }
  delay(10);
}
