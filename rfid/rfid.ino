#include <deprecated.h>
#include <MFRC522.h>
#include <MFRC522Extended.h>
#include <require_cpp11.h>

#include <SPI.h>

RFID RFID(10,9);

int UID[5];

void setup()
{
  Serial.begin(9600);
  SPI.begin();
  RFID.init();  

}

void loop()
{
    Serial.print(RFID.readCardSerial());
}
