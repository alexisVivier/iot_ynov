#include <OneWire.h> 
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 2 
OneWire oneWire(ONE_WIRE_BUS); 
DallasTemperature sensors(&oneWire);
int note = 330;
 
void setup(void){
  Serial.begin(9600);
  pinMode(8,OUTPUT);
  pinMode(4,OUTPUT);
   sensors.begin(); 
}

void loop(void){
 sensors.requestTemperatures();
 Serial.print("Il fait : "); 
 float temperature = sensors.getTempCByIndex(0);
 Serial.print(temperature);
 Serial.println(" degrés"); 
 delay(1000); 
  
  if( temperature > 30)
  {
    digitalWrite(8,LOW);
    digitalWrite(4,HIGH);
    tone(3, note);
    delay(1000);
  }
  
  else{
    digitalWrite(8,HIGH);
    digitalWrite(4,LOW);
    noTone(3);
    delay(1000);
  }
}
