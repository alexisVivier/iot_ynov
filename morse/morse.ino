int pin = 11;
int pin_space = 10;

void setup()
{
  pinMode(pin, OUTPUT);
}

void loop()
{
  dot(); dot(); dot();
  dash(); dash(); dash();
  dot(); dot(); dot();
  delay(3000);
}

void dot()
{
  digitalWrite(pin, HIGH);
  delay(250);
  digitalWrite(pin, LOW);
  delay(250);
}

void dash()
{
  digitalWrite(pin, HIGH);
  delay(1000);
  digitalWrite(pin, LOW);
  delay(250);
}


void translate(String toTranslate){
  int i;
  for(i=0; i <= sizeof(toTranslate); i++){
    char cCourt = toTranslate[i];
    if(cCourt == "A"){
      int tableauF
    }
  }
}

