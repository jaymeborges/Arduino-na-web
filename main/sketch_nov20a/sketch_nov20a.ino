const int pot = 0;
const int led = 8;
int valor = 0;


void setup() {
  // put your setup code here, to run once:
  //POTENCIOMETRO
Serial.begin (9600);
pinMode (led, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
valor = analogRead(pot);
Serial.println (valor);

//LED
if (Serial.available ()){

  switch(Serial.read()){

    case 'a': // Ligar o Led
    digitalWrite(led,HIGH);
    break;

    case 'b': // Desliga o led
    digitalWrite(led,LOW);
    break;
    
    }

    delay (2000);
  }
}
