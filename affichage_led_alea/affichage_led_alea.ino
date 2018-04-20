/*
 * Initialisation des pins
 */

const byte PIN_J = 2;
const byte PIN_B = 3;
const byte PIN_V = 4;
const byte PIN_R = 5;
const byte tableau[] = {PIN_J, PIN_B, PIN_V, PIN_R};

void setup() {
  // put your setup code here, to run once:
  pinMode(PIN_J, OUTPUT);
  pinMode(PIN_B, OUTPUT);
  pinMode(PIN_V, OUTPUT);
  pinMode(PIN_R, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int i;
  long rdm;
  for (i=0; i<=5; i++) {
    rdm = random(0, 4);
    digitalWrite(tableau[rdm], HIGH);
    delay(2000);
    digitalWrite(tableau[rdm], LOW);
    delay(500);
  }
}
